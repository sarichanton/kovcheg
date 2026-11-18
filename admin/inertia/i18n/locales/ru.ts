import type { EnDictionary, TranslationShape } from './en.js'

/**
 * Russian dictionary.
 *
 * The `satisfies` check below ties this object to the English key tree: a
 * missing (or misspelled) key is a TypeScript error, and extra keys are
 * rejected too. Values are typed as strings, so translations stay free-form.
 */
export const ru = {
  app: {
    name: 'Ковчег',
  },
  common: {
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    close: 'Закрыть',
    back: 'Назад',
    next: 'Далее',
    previous: 'Назад',
    loading: 'Загрузка…',
    error: 'Ошибка',
    retry: 'Повторить',
    yes: 'Да',
    no: 'Нет',
    search: 'Поиск',
    settings: 'Настройки',
    language: 'Язык',
    russian: 'Русский',
    english: 'English',
    apply: 'Применить',
    confirm: 'Подтвердить',
    edit: 'Изменить',
    add: 'Добавить',
    remove: 'Убрать',
    refresh: 'Обновить',
    download: 'Скачать',
    upload: 'Загрузить',
    install: 'Установить',
    start: 'Запустить',
    stop: 'Остановить',
    open: 'Открыть',
    copy: 'Копировать',
    copied: 'Скопировано',
    welcome: 'Добро пожаловать, {name}!',
    files: {
      one: '{count} файл',
      few: '{count} файла',
      many: '{count} файлов',
      other: '{count} файла',
    },
    items: {
      one: '{count} элемент',
      few: '{count} элемента',
      many: '{count} элементов',
      other: '{count} элемента',
    },
  },
  nav: {
    home: 'Главная',
    backToHome: 'На главную',
    commandCenter: 'Командный центр',
    easySetup: 'Быстрая настройка',
    supplyDepot: 'Склад снабжения',
    benchmark: 'Бенчмарк',
    contentExplorer: 'Обзор контента',
    contentManager: 'Управление контентом',
    creatorPacks: 'Наборы авторов',
    maps: 'Карты',
    mapsManager: 'Управление картами',
    drugReference: 'Справочник лекарств',
    serviceLogs: 'Логи и метрики',
    updates: 'Проверить обновления',
    system: 'Система',
    advanced: 'Дополнительно',
    apiReference: 'Справочник API',
    support: 'Поддержать проект',
    legal: 'Правовая информация',
    settings: 'Настройки',
    docs: 'Документация',
  },
  errors: {
    generic: 'Что-то пошло не так',
    network: 'Нет связи с сервером. Проверьте подключение и попробуйте ещё раз.',
    notFound: 'Страница не найдена',
    server: 'Ошибка на сервере. Попробуйте позже.',
    required: 'Заполните поле «{field}»',
    timeout: 'Запрос занял слишком много времени. Попробуйте ещё раз.',
    unknown: 'Неизвестная ошибка',
    loadFailed: 'Не удалось загрузить данные',
  },
} satisfies TranslationShape<EnDictionary>

export default ru
