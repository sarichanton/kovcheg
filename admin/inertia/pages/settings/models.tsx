import { Head, router, usePage } from '@inertiajs/react'
import { useRef, useState } from 'react'
import StyledTable from '~/components/StyledTable'
import SettingsLayout from '~/layouts/SettingsLayout'
import { NomadOllamaModel } from '../../../types/ollama'
import StyledButton from '~/components/StyledButton'
import useServiceInstalledStatus from '~/hooks/useServiceInstalledStatus'
import Alert from '~/components/Alert'
import { useNotifications } from '~/context/NotificationContext'
import api from '~/lib/api'
import { useModals } from '~/context/ModalContext'
import StyledModal from '~/components/StyledModal'
import type { NomadInstalledModel } from '../../../types/ollama'
import { SERVICE_NAMES } from '../../../constants/service_names'
import { RAG_MIN_RELEVANCE_PRESETS, RESPONSE_STYLE_PRESETS } from '../../../constants/ollama'
import Switch from '~/components/inputs/Switch'
import Select from '~/components/inputs/Select'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Input from '~/components/inputs/Input'
import { IconSearch } from '@tabler/icons-react'
import { formatBytes } from '~/lib/util'
import useDebounce from '~/hooks/useDebounce'
import ActiveModelDownloads from '~/components/ActiveModelDownloads'
import { useSystemInfo } from '~/hooks/useSystemInfo'
import GpuPassthroughAlert from '~/components/GpuPassthroughAlert'
import { localizeServerMessage } from '~/lib/serverMessages'
import { useT } from '~/i18n/I18nProvider'
import type { TranslateKey } from '~/i18n'

export default function ModelsPage(props: {
  models: {
    availableModels: NomadOllamaModel[]
    installedModels: NomadInstalledModel[]
    settings: { chatSuggestionsEnabled: boolean; aiAssistantCustomName: string; remoteOllamaUrl: string; ollamaFlashAttention: boolean; autoThinking: boolean; tasksModel: string; ragEnabled: boolean; contextWindow: string; minRelevance: number; relevanceCheck: boolean; responseStyle: string }
    /** Effective window per installed model, as resolved by ContextWindowService. */
    resolvedContextWindows?: Record<string, number>
  }
}) {
  const { t } = useT()
  const { aiAssistantName } = usePage<{ aiAssistantName: string }>().props
  const { isInstalled } = useServiceInstalledStatus(SERVICE_NAMES.OLLAMA)
  const { addNotification } = useNotifications()
  const { openModal, closeAllModals } = useModals()
  const { debounce } = useDebounce()
  const { data: systemInfo } = useSystemInfo({})
  const queryClient = useQueryClient()

  const [chatSuggestionsEnabled, setChatSuggestionsEnabled] = useState(
    props.models.settings.chatSuggestionsEnabled
  )
  const [ollamaFlashAttention, setOllamaFlashAttention] = useState(
    props.models.settings.ollamaFlashAttention
  )
  const [autoThinking, setAutoThinking] = useState(props.models.settings.autoThinking)
  const [ragEnabled, setRagEnabled] = useState(props.models.settings.ragEnabled)
  const [tasksModel, setTasksModel] = useState(props.models.settings.tasksModel)
  const [contextWindow, setContextWindow] = useState(props.models.settings.contextWindow)
  const [minRelevance, setMinRelevance] = useState(String(props.models.settings.minRelevance))
  const [relevanceCheck, setRelevanceCheck] = useState(props.models.settings.relevanceCheck)
  const [responseStyle, setResponseStyle] = useState(props.models.settings.responseStyle)
  const [aiAssistantCustomName, setAiAssistantCustomName] = useState(
    props.models.settings.aiAssistantCustomName
  )
  const [remoteOllamaUrl, setRemoteOllamaUrl] = useState(props.models.settings.remoteOllamaUrl)
  const [remoteOllamaError, setRemoteOllamaError] = useState<string | null>(null)
  const [remoteOllamaSaving, setRemoteOllamaSaving] = useState(false)

  async function handleSaveRemoteOllama() {
    setRemoteOllamaError(null)
    setRemoteOllamaSaving(true)
    try {
      const res = await api.configureRemoteOllama(remoteOllamaUrl || null)
      if (res?.success) {
        addNotification({ message: res.message, type: 'success' })
        router.reload()
      }
    } catch (error: any) {
      const msg =
        localizeServerMessage(
          error?.response?.data?.message || error?.message,
          t
        ) || t('models.remoteOllamaConfigureFailed')
      setRemoteOllamaError(msg)
    } finally {
      setRemoteOllamaSaving(false)
    }
  }

  async function handleClearRemoteOllama() {
    setRemoteOllamaError(null)
    setRemoteOllamaSaving(true)
    try {
      const res = await api.configureRemoteOllama(null)
      if (res?.success) {
        setRemoteOllamaUrl('')
        addNotification({ message: t('models.remoteOllamaCleared'), type: 'success' })
        router.reload()
      }
    } catch (error: any) {
      setRemoteOllamaError(
        localizeServerMessage(error?.message, t) || t('models.remoteOllamaClearFailed')
      )
    } finally {
      setRemoteOllamaSaving(false)
    }
  }

  const [query, setQuery] = useState('')
  const [queryUI, setQueryUI] = useState('')
  const [limit, setLimit] = useState(15)

  const debouncedSetQuery = debounce((val: string) => {
    setQuery(val)
  }, 300)

  const forceRefreshRef = useRef(false)
  const [isForceRefreshing, setIsForceRefreshing] = useState(false)

  const { data: availableModelData, isFetching, refetch } = useQuery({
    queryKey: ['ollama', 'availableModels', query, limit],
    queryFn: async () => {
      const force = forceRefreshRef.current
      forceRefreshRef.current = false
      const res = await api.getAvailableModels({
        query,
        recommendedOnly: false,
        limit,
        force: force || undefined,
      })
      if (!res) {
        return {
          models: [],
          hasMore: false,
        }
      }
      return res
    },
    initialData: { models: props.models.availableModels, hasMore: false },
  })

  async function handleForceRefresh() {
    forceRefreshRef.current = true
    setIsForceRefreshing(true)
    await refetch()
    setIsForceRefreshing(false)
    addNotification({ message: t('models.listRefreshed'), type: 'success' })
  }

  async function handleInstallModel(modelName: string) {
    try {
      const res = await api.downloadModel(modelName)
      if (res.success) {
        addNotification({
          message: t('models.downloadStarted', { name: modelName }),
          type: 'success',
        })
      }
    } catch (error) {
      console.error('Error installing model:', error)
      addNotification({
        message: t('models.installFailed', { name: modelName }),
        type: 'error',
      })
    }
  }

  async function handleDeleteModel(modelName: string) {
    try {
      const res = await api.deleteModel(modelName)
      if (res.success) {
        addNotification({
          message: t('models.deleted', { name: modelName }),
          type: 'success',
        })
      }
      closeAllModals()
      router.reload()
    } catch (error) {
      console.error('Error deleting model:', error)
      addNotification({
        message: t('models.deleteFailed', { name: modelName }),
        type: 'error',
      })
    }
  }

  async function confirmDeleteModel(model: string) {
    openModal(
      <StyledModal
        title={t('models.confirmDeleteTitle')}
        onConfirm={() => {
          handleDeleteModel(model)
        }}
        onCancel={closeAllModals}
        open={true}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        confirmVariant="primary"
      >
        <p className="text-text-primary">{t('models.confirmDeleteMessage')}</p>
      </StyledModal>,
      'confirm-delete-model-modal'
    )
  }

  // A model can be deleted after being picked here. Surface the stale name as a
  // disabled option instead of letting the select silently render empty — the
  // backend already falls back to the chat model at call time.
  // "Auto" sizes each model's window from its own trained context and what the
  // hardware can afford. An explicit choice is a cap, never a boost — asking for
  // more than a model or a GPU can support just degrades or fails to load.
  const contextWindowOptions = [
    { value: 'auto', label: t('models.autoRecommended') },
    { value: '4096', label: t('models.contextTokens', { value: '4K' }) },
    { value: '8192', label: t('models.contextTokens', { value: '8K' }) },
    { value: '16384', label: t('models.contextTokens', { value: '16K' }) },
    { value: '32768', label: t('models.contextTokens', { value: '32K' }) },
    { value: '65536', label: t('models.contextTokens', { value: '64K' }) },
    { value: '131072', label: t('models.contextTokens', { value: '128K' }) },
  ]

  const relevanceLabelKey = (value: number): TranslateKey => {
    switch (value) {
      case 0:
        return 'models.relevanceOff'
      case 0.55:
        return 'models.relevanceLenient'
      case 0.62:
        return 'models.relevanceBalanced'
      case 0.66:
        return 'models.relevanceStrict'
      default:
        return 'models.relevanceBalanced'
    }
  }

  const responseStyleLabelKeys: Record<string, TranslateKey> = {
    auto: 'models.responseStyleAuto',
    focused: 'models.responseStyleFocused',
    creative: 'models.responseStyleCreative',
    off: 'models.responseStyleOff',
  }

  // Presets rather than a raw 0-1 number: the value is a cosine-similarity
  // floor, which is not a thing anyone can reason about directly. The stored
  // setting is still the number, so retuning these labels later cannot orphan a
  // saved value.
  const minRelevanceOptions = [
    ...RAG_MIN_RELEVANCE_PRESETS.map((preset) => ({
      value: String(preset.value),
      label: t(relevanceLabelKey(preset.value)),
    })),
    // The setting is API-writable to any value in [0,1], so a value off the
    // preset ladder is reachable. Surface it as a disabled option rather than
    // letting the select render empty — same treatment the tasks model gets when
    // the chosen model has since been deleted.
    ...(RAG_MIN_RELEVANCE_PRESETS.some((p) => String(p.value) === minRelevance)
      ? []
      : [
          {
            value: minRelevance,
            label: t('models.customValue', { value: minRelevance }),
            disabled: true,
          },
        ]),
  ]

  const responseStyleOptions = RESPONSE_STYLE_PRESETS.map((preset) => ({
    value: preset.value,
    label: t(responseStyleLabelKeys[preset.value] ?? 'models.responseStyleAuto'),
  }))

  const resolvedWindows = props.models.resolvedContextWindows ?? {}
  const formatWindow = (tokens: number) =>
    tokens >= 1024 ? `${Math.round(tokens / 1024)}K` : String(tokens)

  const tasksModelOptions = [
    { value: '', label: t('models.useChatModel') },
    ...props.models.installedModels.map((model) => ({ value: model.name, label: model.name })),
    ...(tasksModel && !props.models.installedModels.some((m) => m.name === tasksModel)
      ? [
          {
            value: tasksModel,
            label: t('models.notInstalled', { name: tasksModel }),
            disabled: true,
          },
        ]
      : []),
  ]

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: boolean | string }) => {
      return await api.updateSetting(key, value)
    },
    onSuccess: (_data, { key }) => {
      // Anything reading this key through useSystemSetting (e.g. the chat
      // window's own copy of the retrieval toggle) should pick the change up
      // without a reload.
      queryClient.invalidateQueries({ queryKey: ['system-setting', key] })
      addNotification({
        message: t('models.settingUpdated'),
        type: 'success',
      })
    },
    onError: (error) => {
      console.error('Error updating setting:', error)
      addNotification({
        message: t('models.settingUpdateFailed'),
        type: 'error',
      })
    },
  })

  return (
    <SettingsLayout>
      <Head title={t('models.headTitle', { name: aiAssistantName })} />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6">
          <h1 className="text-4xl font-semibold mb-4">{aiAssistantName}</h1>
          <p className="text-text-muted mb-4">
            {t('models.pageDescription', { name: aiAssistantName })}
          </p>
          {!isInstalled && (
            <Alert
              title={t('models.dependenciesMissing', { name: aiAssistantName })}
              type="warning"
              variant="solid"
              className="!mt-6"
            />
          )}
          {isInstalled && (
            <GpuPassthroughAlert
              gpuHealth={systemInfo?.gpuHealth}
              assistantName={aiAssistantName}
              className="!mt-6"
            />
          )}

          <StyledSectionHeader title={t('common.settings')} className="mt-8 mb-4" />
          <div className="bg-surface-primary rounded-lg border-2 border-border-subtle p-6">
            <div className="space-y-4">
              <Switch
                checked={chatSuggestionsEnabled}
                onChange={(newVal) => {
                  setChatSuggestionsEnabled(newVal)
                  updateSettingMutation.mutate({ key: 'chat.suggestionsEnabled', value: newVal })
                }}
                label={t('models.chatSuggestions')}
                description={t('models.chatSuggestionsDescription')}
              />
              <Switch
                checked={ollamaFlashAttention}
                onChange={(newVal) => {
                  setOllamaFlashAttention(newVal)
                  updateSettingMutation.mutate({ key: 'ai.ollamaFlashAttention', value: newVal })
                }}
                label={t('models.flashAttention')}
                description={t('models.flashAttentionDescription')}
              />
              <Switch
                checked={autoThinking}
                onChange={(newVal) => {
                  setAutoThinking(newVal)
                  updateSettingMutation.mutate({ key: 'ai.autoThinking', value: newVal })
                }}
                label={t('models.autoThinking')}
                description={t('models.autoThinkingDescription')}
              />
              <Switch
                checked={ragEnabled}
                onChange={(newVal) => {
                  setRagEnabled(newVal)
                  updateSettingMutation.mutate({ key: 'rag.enabled', value: newVal })
                }}
                label={t('models.kbRetrieval')}
                description={t('models.kbRetrievalDescription')}
              />
              <Input
                name="aiAssistantCustomName"
                label={t('models.assistantName')}
                helpText={t('models.assistantNameHelp')}
                placeholder={t('models.assistantNamePlaceholder')}
                value={aiAssistantCustomName}
                onChange={(e) => setAiAssistantCustomName(e.target.value)}
                onBlur={() =>
                  updateSettingMutation.mutate({
                    key: 'ai.assistantCustomName',
                    value: aiAssistantCustomName,
                  })
                }
              />
              <Select
                name="tasksModel"
                label={t('models.tasksModel')}
                helpText={t('models.tasksModelHelp')}
                value={tasksModel}
                options={tasksModelOptions}
                onChange={(newVal) => {
                  setTasksModel(newVal)
                  updateSettingMutation.mutate({ key: 'ai.tasksModel', value: newVal })
                }}
              />
              <Select
                name="minRelevance"
                label={t('models.kbRelevance')}
                helpText={t('models.kbRelevanceHelp')}
                value={minRelevance}
                options={minRelevanceOptions}
                disabled={!ragEnabled}
                onChange={(newVal) => {
                  setMinRelevance(newVal)
                  updateSettingMutation.mutate({ key: 'rag.minRelevance', value: newVal })
                }}
              />
              <Switch
                checked={relevanceCheck}
                disabled={!ragEnabled}
                onChange={(newVal) => {
                  setRelevanceCheck(newVal)
                  updateSettingMutation.mutate({ key: 'rag.relevanceCheck', value: newVal })
                }}
                label={t('models.relevanceCheck')}
                description={t('models.relevanceCheckDescription')}
              />
              <Select
                name="responseStyle"
                label={t('models.responseStyle')}
                helpText={t('models.responseStyleHelp')}
                value={responseStyle}
                options={responseStyleOptions}
                onChange={(newVal) => {
                  setResponseStyle(newVal)
                  updateSettingMutation.mutate({ key: 'ai.responseStyle', value: newVal })
                }}
              />
              <Select
                name="contextWindow"
                label={t('models.contextWindow')}
                helpText={t('models.contextWindowHelp')}
                value={contextWindow}
                options={contextWindowOptions}
                onChange={(newVal) => {
                  setContextWindow(newVal)
                  updateSettingMutation.mutate({ key: 'ai.contextWindow', value: newVal })
                }}
              />
              {Object.keys(resolvedWindows).length > 0 && (
                <p className="text-xs text-text-muted">
                  {t('models.currentlyInEffect', {
                    windows: Object.entries(resolvedWindows)
                      .map(([name, tokens]) => `${name} → ${formatWindow(tokens)}`)
                      .join(', '),
                  })}
                </p>
              )}
            </div>
          </div>

          <StyledSectionHeader title={t('models.installedModels')} className="mt-12 mb-4" />
          <div className="bg-surface-primary rounded-lg border-2 border-border-subtle p-6">
            {props.models.installedModels.length === 0 ? (
              <p className="text-text-muted">{t('models.noModelsInstalled')}</p>
            ) : (
              <table className="min-w-full divide-y divide-border-subtle">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                      {t('models.columnModel')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                      {t('models.columnParameters')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                      {t('models.columnDiskSize')}
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                      {t('models.columnAction')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {props.models.installedModels.map((model) => (
                    <tr key={model.name} className="hover:bg-surface-secondary">
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-text-primary">{model.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-text-secondary">
                          {model.details?.parameter_size || t('common.notAvailable')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-text-secondary">
                          {formatBytes(model.size)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <StyledButton
                          variant="danger"
                          size="sm"
                          onClick={() => confirmDeleteModel(model.name)}
                          icon="IconTrash"
                        >
                          {t('common.delete')}
                        </StyledButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <StyledSectionHeader title={t('models.remoteConnection')} className="mt-8 mb-4" />
          <div className="bg-surface-primary rounded-lg border-2 border-border-subtle p-6">
            <p className="text-sm text-text-secondary mb-4">
              {t('models.remoteConnectionDescriptionBefore')}
              <code className="bg-surface-secondary px-1 rounded">OLLAMA_HOST=0.0.0.0</code>
              {t('models.remoteConnectionDescriptionAfter')}
            </p>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  name="remoteOllamaUrl"
                  label={t('models.remoteUrlLabel')}
                  placeholder={t('models.remoteUrlPlaceholder')}
                  value={remoteOllamaUrl}
                  onChange={(e) => {
                    setRemoteOllamaUrl(e.target.value)
                    setRemoteOllamaError(null)
                  }}
                />
                {remoteOllamaError && (
                  <p className="text-sm text-red-600 mt-1">{remoteOllamaError}</p>
                )}
              </div>
              <StyledButton
                variant="primary"
                onClick={handleSaveRemoteOllama}
                loading={remoteOllamaSaving}
                disabled={remoteOllamaSaving || !remoteOllamaUrl}
                className="mb-0.5"
              >
                {t('models.saveAndTest')}
              </StyledButton>
              {props.models.settings.remoteOllamaUrl && (
                <StyledButton
                  variant="danger"
                  onClick={handleClearRemoteOllama}
                  loading={remoteOllamaSaving}
                  disabled={remoteOllamaSaving}
                  className="mb-0.5"
                >
                  {t('common.clear')}
                </StyledButton>
              )}
            </div>
          </div>

          <ActiveModelDownloads withHeader />

          <StyledSectionHeader title={t('models.title')} className="mt-12 mb-4" />
          <Alert
            type="info"
            variant="bordered"
            title={t('models.downloadOnlyOllama')}
            message={t('models.downloadOnlyOllamaMessage')}
            className="mb-4"
          />
          <div className="flex justify-start items-center gap-3 mt-4">
            <Input
              name="search"
              label=""
              placeholder={t('models.searchPlaceholder')}
              value={queryUI}
              onChange={(e) => {
                setQueryUI(e.target.value)
                debouncedSetQuery(e.target.value)
              }}
              className="w-1/3"
              leftIcon={<IconSearch className="w-5 h-5 text-text-muted" />}
            />
            <StyledButton
              variant="secondary"
              onClick={handleForceRefresh}
              icon="IconRefresh"
              loading={isForceRefreshing}
              className='mt-1'
            >
              {t('models.refreshModels')}
            </StyledButton>
          </div>
          <StyledTable<NomadOllamaModel>
            className="font-semibold mt-4"
            rowLines={true}
            columns={[
              {
                accessor: 'name',
                title: t('common.name'),
                render(record) {
                  return (
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold">{record.name}</p>
                      <p className="text-sm text-text-muted">{record.description}</p>
                    </div>
                  )
                },
              },
              {
                accessor: 'estimated_pulls',
                title: t('models.estimatedPulls'),
              },
              {
                accessor: 'model_last_updated',
                title: t('models.lastUpdated'),
              },
            ]}
            data={availableModelData?.models || []}
            loading={isFetching}
            expandable={{
              expandedRowRender: (record) => (
                <div className="pl-14">
                  <div className="bg-surface-primary overflow-hidden">
                    <table className="min-w-full divide-y divide-border-subtle">
                      <thead className="bg-surface-primary">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            {t('models.tag')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            {t('models.inputType')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            {t('models.contextSize')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            {t('models.modelSize')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            {t('models.columnAction')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-surface-primary divide-y divide-border-subtle">
                        {record.tags.map((tag, tagIndex) => {
                          const isInstalled = props.models.installedModels.some(
                            (mod) => mod.name === tag.name
                          )
                          return (
                            <tr key={tagIndex} className="hover:bg-surface-secondary">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-text-primary">
                                  {tag.name}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-text-secondary">
                                  {tag.input || t('common.notAvailable')}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-text-secondary">
                                  {tag.context || t('common.notAvailable')}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-text-secondary">
                                  {tag.size || t('common.notAvailable')}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <StyledButton
                                  variant={isInstalled ? 'danger' : 'primary'}
                                  onClick={() => {
                                    if (!isInstalled) {
                                      handleInstallModel(tag.name)
                                    } else {
                                      confirmDeleteModel(tag.name)
                                    }
                                  }}
                                  icon={isInstalled ? 'IconTrash' : 'IconDownload'}
                                >
                                  {isInstalled ? t('common.delete') : t('common.install')}
                                </StyledButton>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ),
            }}
          />
          <div className="flex justify-center mt-6">
            {availableModelData?.hasMore && (
              <StyledButton
                variant="primary"
                onClick={() => {
                  setLimit((prev) => prev + 15)
                }}
              >
                {t('common.loadMore')}
              </StyledButton>
            )}
          </div>
        </main>
      </div>
    </SettingsLayout>
  )
}
