import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IconAlertTriangle } from '@tabler/icons-react'
import StyledButton from '~/components/StyledButton'
import { useT } from '~/i18n/I18nProvider'

/**
 * localStorage key for the Drug Reference disclaimer acknowledgement. Versioned:
 * bump the suffix if the disclaimer text changes materially so every browser is
 * re-prompted. Per-browser by design — a new browser/device gets the gate again.
 */
export const DRUG_DISCLAIMER_ACK_KEY = 'nomad:drugReferenceDisclaimer:v1'

export function hasAcknowledgedDrugDisclaimer(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem(DRUG_DISCLAIMER_ACK_KEY) === 'ack'
  } catch {
    return false
  }
}

/**
 * First-open disclaimer gate for the Drug Reference. Blocks the page until the
 * user acknowledges (no backdrop / Escape dismissal). On acknowledgement the
 * acceptance is saved to this browser's localStorage so it isn't shown again on
 * this browser — other browsers/devices see it on their first open.
 */
export default function DrugDisclaimerModal({ open, onAcknowledge }: { open: boolean; onAcknowledge: () => void }) {
  const { t } = useT()
  const acknowledge = () => {
    try {
      window.localStorage.setItem(DRUG_DISCLAIMER_ACK_KEY, 'ack')
    } catch {
      // Private mode / storage disabled — still let them through for this session.
    }
    onAcknowledge()
  }

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/60" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel className="relative w-full transform overflow-hidden rounded-lg bg-surface-primary px-5 pb-5 pt-6 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-desert-orange/15 text-desert-orange-dark">
                <IconAlertTriangle size={26} />
              </span>
              <DialogTitle as="h3" className="mt-4 text-lg font-bold text-text-primary">
                {t('drugReference.disclaimer.title')}
              </DialogTitle>
            </div>

            <div className="mt-4 space-y-3 text-sm text-text-secondary">
              <p>
                {t('drugReference.disclaimer.intro')}{' '}
                <strong>{t('drugReference.disclaimer.fdaLabels')}</strong>{' '}
                {t('drugReference.disclaimer.afterLabels')}{' '}
                <strong>{t('drugReference.disclaimer.informationOnly')}</strong>
                {t('drugReference.disclaimer.sentenceEnd')}
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  {t('drugReference.disclaimer.adviceBefore')}{' '}
                  <strong>{t('drugReference.disclaimer.notMedicalAdvice')}</strong>{' '}
                  {t('drugReference.disclaimer.adviceAfter')}
                </li>
                <li>
                  {t('drugReference.disclaimer.checkerBefore')}{' '}
                  <strong>{t('drugReference.disclaimer.notInteractionChecker')}</strong>
                  {t('drugReference.disclaimer.checkerAfter')}
                </li>
                <li>
                  {t('drugReference.disclaimer.situationMatches')}
                </li>
                <li>
                  {t('drugReference.disclaimer.followDirectionsBefore')}{' '}
                  <strong>{t('drugReference.disclaimer.actualProduct')}</strong>
                  {t('drugReference.disclaimer.followDirectionsAfter')}
                </li>
                <li>
                  {t('drugReference.disclaimer.emergencyBefore')}{' '}
                  <strong>{t('drugReference.disclaimer.emergencyAction')}</strong>
                  {t('drugReference.disclaimer.emergencyAfter')}
                </li>
              </ul>
              <p className="text-xs text-text-muted">
                {t('drugReference.disclaimer.dataNote')}
              </p>
            </div>

            <div className="mt-6">
              <StyledButton variant="action" fullWidth onClick={acknowledge}>
                {t('drugReference.disclaimer.acknowledge')}
              </StyledButton>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
