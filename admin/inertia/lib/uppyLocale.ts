import type { Locale } from '../i18n/index.js'

type UppyPluralStrings = Record<number, string>

export interface UppyLocale {
  strings: Record<string, string | UppyPluralStrings>
  pluralize: (count: number) => number
}

/**
 * Russian plural selector for Uppy's polyglot-style dictionaries.
 * Uppy expects numeric plural keys, so one/few/many map to 0/1/2.
 */
function russianPlural(count: number): number {
  const form = new Intl.PluralRules('ru-RU').select(count)
  if (form === 'one') return 0
  if (form === 'few') return 1
  return 2
}

const RU_STRINGS: Record<string, string | UppyPluralStrings> = {
  // Core
  addBulkFilesFailed: {
    0: 'Не удалось добавить %{smart_count} файл из-за внутренней ошибки',
    1: 'Не удалось добавить %{smart_count} файла из-за внутренних ошибок',
    2: 'Не удалось добавить %{smart_count} файлов из-за внутренних ошибок',
  },
  youCanOnlyUploadX: {
    0: 'Можно загрузить только %{smart_count} файл',
    1: 'Можно загрузить только %{smart_count} файла',
    2: 'Можно загрузить только %{smart_count} файлов',
  },
  youHaveToAtLeastSelectX: {
    0: 'Нужно выбрать хотя бы %{smart_count} файл',
    1: 'Нужно выбрать хотя бы %{smart_count} файла',
    2: 'Нужно выбрать хотя бы %{smart_count} файлов',
  },
  exceedsSize: 'Файл %{file} превышает максимальный размер %{size}',
  inferiorSize: 'Файл меньше допустимого размера %{size}',
  youCanOnlyUploadFileTypes: 'Можно загрузить только: %{types}',
  noMoreFilesAllowed: 'Больше файлы добавлять нельзя',
  noDuplicates: 'Нельзя добавить дубликат файла «%{fileName}»: он уже добавлен',
  failedToUpload: 'Не удалось загрузить %{file}',
  noInternetConnection: 'Нет подключения к интернету',
  connectedToInternet: 'Подключение к интернету восстановлено',
  noFilesFound: 'Здесь нет файлов или папок',
  noSearchResults: 'По этому запросу ничего не найдено',
  selectX: {
    0: 'Выбрать %{smart_count}',
    1: 'Выбрать %{smart_count}',
    2: 'Выбрать %{smart_count}',
  },
  cancel: 'Отмена',
  loading: 'Загрузка…',
  loadedXFiles: 'Загружено файлов: %{numFiles}',
  emptyFolderAdded: 'Из пустой папки файлы не добавлены',
  addedNumFiles: 'Добавлено файлов: %{numFiles}',
  folderAlreadyAdded: 'Папка «%{folder}» уже добавлена',
  folderAdded: {
    0: 'Из папки %{folder} добавлен %{smart_count} файл',
    1: 'Из папки %{folder} добавлено %{smart_count} файла',
    2: 'Из папки %{folder} добавлено %{smart_count} файлов',
  },
  additionalRestrictionsFailed: 'Не выполнено дополнительных условий: %{count}',
  unnamed: 'Без названия',
  pleaseWait: 'Подождите',

  // Dashboard
  closeModal: 'Закрыть окно',
  addMoreFiles: 'Добавить ещё файлы',
  addingMoreFiles: 'Добавление файлов',
  importFrom: 'Импорт из %{name}',
  dashboardWindowTitle: 'Окно загрузки (нажмите Esc, чтобы закрыть)',
  dashboardTitle: 'Загрузка файлов',
  copyLinkToClipboardSuccess: 'Ссылка скопирована.',
  copyLinkToClipboardFallback: 'Скопируйте URL ниже',
  copyLink: 'Скопировать ссылку',
  back: 'Назад',
  removeFile: 'Удалить файл',
  editFile: 'Изменить файл',
  editImage: 'Изменить изображение',
  editing: 'Изменение %{file}',
  error: 'Ошибка',
  finishEditingFile: 'Завершить изменение файла',
  saveChanges: 'Сохранить изменения',
  myDevice: 'Моё устройство',
  dropHint: 'Перетащите файлы сюда',
  uploadComplete: 'Загрузка завершена',
  uploadPaused: 'Загрузка приостановлена',
  resumeUpload: 'Продолжить загрузку',
  pauseUpload: 'Приостановить загрузку',
  retryUpload: 'Повторить загрузку',
  cancelUpload: 'Отменить загрузку',
  xFilesSelected: {
    0: 'Выбран %{smart_count} файл',
    1: 'Выбрано %{smart_count} файла',
    2: 'Выбрано %{smart_count} файлов',
  },
  uploadingXFiles: {
    0: 'Загружается %{smart_count} файл',
    1: 'Загружается %{smart_count} файла',
    2: 'Загружается %{smart_count} файлов',
  },
  processingXFiles: {
    0: 'Обрабатывается %{smart_count} файл',
    1: 'Обрабатывается %{smart_count} файла',
    2: 'Обрабатывается %{smart_count} файлов',
  },
  poweredBy: 'Работает на %{uppy}',
  addMore: 'Добавить ещё',
  editFileWithFilename: 'Изменить файл %{file}',
  save: 'Сохранить',
  dropPasteFiles: 'Перетащите файлы сюда или %{browseFiles}',
  dropPasteFolders: 'Перетащите файлы сюда или %{browseFolders}',
  dropPasteBoth: 'Перетащите файлы сюда, %{browseFiles} или %{browseFolders}',
  dropPasteImportFiles: 'Перетащите файлы сюда, %{browseFiles} или импортируйте из:',
  dropPasteImportFolders:
    'Перетащите файлы сюда, %{browseFolders} или импортируйте из:',
  dropPasteImportBoth:
    'Перетащите файлы сюда, %{browseFiles}, %{browseFolders} или импортируйте из:',
  importFiles: 'Импортировать файлы из:',
  browseFiles: 'выберите файлы',
  browseFolders: 'выберите папку',
  recoveredXFiles: {
    0: 'Не удалось полностью восстановить 1 файл. Выберите его заново и продолжите загрузку.',
    1: 'Не удалось полностью восстановить %{smart_count} файла. Выберите их заново и продолжите загрузку.',
    2: 'Не удалось полностью восстановить %{smart_count} файлов. Выберите их заново и продолжите загрузку.',
  },
  recoveredAllFiles: 'Все файлы восстановлены. Можно продолжить загрузку.',
  sessionRestored: 'Сеанс восстановлен',
  reSelect: 'Выбрать заново',
  missingRequiredMetaFields: {
    0: 'Не заполнено обязательное поле: %{fields}.',
    1: 'Не заполнены обязательные поля: %{fields}.',
    2: 'Не заполнены обязательные поля: %{fields}.',
  },
  takePictureBtn: 'Сделать фото',
  recordVideoBtn: 'Записать видео',
  uploading: 'Загрузка',
  complete: 'Готово',
  uploadFailed: 'Загрузка не удалась',
  paused: 'Приостановлено',
  retry: 'Повторить',
  pause: 'Пауза',
  resume: 'Продолжить',
  done: 'Готово',
  filesUploadedOfTotal: {
    0: 'Загружен %{complete} из %{smart_count} файла',
    1: 'Загружено %{complete} из %{smart_count} файлов',
    2: 'Загружено %{complete} из %{smart_count} файлов',
  },
  dataUploadedOfTotal: 'Загружено %{complete} из %{total}',
  dataUploadedOfUnknown: 'Загружено %{complete} из неизвестного объёма',
  xTimeLeft: 'Осталось %{time}',
  uploadXFiles: {
    0: 'Загрузить %{smart_count} файл',
    1: 'Загрузить %{smart_count} файла',
    2: 'Загрузить %{smart_count} файлов',
  },
  uploadXNewFiles: {
    0: 'Загрузить +%{smart_count} файл',
    1: 'Загрузить +%{smart_count} файла',
    2: 'Загрузить +%{smart_count} файлов',
  },
  upload: 'Загрузить',
  xMoreFilesAdded: {
    0: 'Добавлен ещё %{smart_count} файл',
    1: 'Добавлено ещё %{smart_count} файла',
    2: 'Добавлено ещё %{smart_count} файлов',
  },
  showErrorDetails: 'Показать подробности ошибки',

  // @uppy/xhr-upload
  uploadStalled:
    'Загрузка не продвигается уже %{seconds} с. Возможно, стоит попробовать ещё раз.',
}

/**
 * Uppy locale override. English returns undefined so Uppy keeps its original
 * strings; Russian only overrides the strings used by Dashboard/XHRUpload.
 */
export function getUppyLocale(locale: Locale): UppyLocale | undefined {
  if (locale !== 'ru') return undefined
  return {
    strings: RU_STRINGS,
    pluralize: russianPlural,
  }
}
