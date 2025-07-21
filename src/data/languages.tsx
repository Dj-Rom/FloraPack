export type LanguageLabels = {
  language: string;
  save: string;
  showMore: string;
  showLess: string;
  delete: string;
  back: string;
  enterListName: string;
  enterNewValue: string; // ✅ New label
  description: string;
  company: string;
  date: string;
  packagingList: string;
  languageLabel: string;
  packName: string;
  example: string;
  home: string;
  information: string;
  settingsWhatsAppMessage: string;
  whatsAppMessagePrompt: string;
  listEmptyWarning: string;
  history: string;
  reset: string;
  clear: string;
  settings: string;
  limit: string;
  cannotBeEmpty: string;
};

type SettingLanguageSliceState = {
  [key: string]: LanguageLabels;
};

export const allLanguages: SettingLanguageSliceState = {
  polish: {
    language: 'pl',
    save: 'zapisz',
    showMore: 'pokaż więcej',
    showLess: 'pokaż mniej',
    delete: 'usuń',
    back: 'wstecz',
    enterListName: 'wpisz tutaj nazwę listy',
    enterNewValue: 'wpisz nową wartość',
    description: 'opis',
    company: 'firma',
    date: 'data',
    packagingList: 'lista opakowań',
    languageLabel: 'język',
    packName: 'nazwa opakowania',
    example: 'przykład',
    home: 'strona główna',
    information: 'informacje',
    settingsWhatsAppMessage: 'ustawienia wiadomości whatsapp',
    whatsAppMessagePrompt: 'czy chcesz wyświetlić w wiadomości whatsapp: datę utworzenia listy pakowania lub nazwę firmy (np. firma: flora)?',
    listEmptyWarning: 'lista nie może być pusta',
    history: 'historia',
    reset: 'zresetuj',
    clear: 'wyczyść',
    settings: 'ustawienia',
    limit: 'limit',
    cannotBeEmpty: 'nie może być puste',
  },
  deutsch: {
    language: 'de',
    save: 'speichern',
    showMore: 'mehr anzeigen',
    showLess: 'weniger anzeigen',
    delete: 'löschen',
    back: 'zurück',
    enterListName: 'listenname hier eingeben',
    enterNewValue: 'neuen Wert eingeben',
    description: 'beschreibung',
    company: 'firma',
    date: 'datum',
    packagingList: 'verpackungsliste',
    languageLabel: 'sprache',
    packName: 'verpackungsname',
    example: 'beispiel',
    home: 'startseite',
    information: 'informationen',
    settingsWhatsAppMessage: 'whatsapp-nachrichteneinstellungen',
    whatsAppMessagePrompt: 'möchten sie in der whatsapp-nachricht das erstellungsdatum der packliste oder den firmennamen anzeigen (z. b. firma: flora)?',
    listEmptyWarning: 'die liste darf nicht leer sein',
    history: 'verlauf',
    reset: 'zurücksetzen',
    clear: 'löschen',
    settings: 'einstellungen',
    limit: 'limit',
    cannotBeEmpty: 'darf nicht leer sein',
  },
  english: {
    language: 'en',
    save: 'save',
    showMore: 'show more',
    showLess: 'show less',
    delete: 'delete',
    back: 'back',
    enterListName: 'enter list name here',
    enterNewValue: 'enter new value',
    description: 'description',
    company: 'company',
    date: 'date',
    packagingList: 'packaging list',
    languageLabel: 'language',
    packName: 'package name',
    example: 'example',
    home: 'home',
    information: 'information',
    settingsWhatsAppMessage: 'settings whatsapp message',
    whatsAppMessagePrompt: 'do you want to show in the whatsapp message: the date the pack list was created or the company title (e.g., company: flora)?',
    listEmptyWarning: 'the list must not be empty',
    history: 'history',
    reset: 'reset',
    clear: 'clear',
    settings: 'settings',
    limit: 'limit',
    cannotBeEmpty: 'cannot be empty',
  },
  russian: {
    language: 'ru',
    save: 'сохранить',
    showMore: 'показать больше',
    showLess: 'показать меньше',
    delete: 'удалить',
    back: 'назад',
    enterListName: 'введите название списка',
    enterNewValue: 'введите новое значение',
    description: 'описание',
    company: 'компания',
    date: 'дата',
    packagingList: 'упаковочный лист',
    languageLabel: 'язык',
    packName: 'наименование упаковки',
    example: 'пример',
    home: 'главная',
    information: 'информация',
    settingsWhatsAppMessage: 'настройки сообщений whatsapp',
    whatsAppMessagePrompt: 'хотите отобразить в сообщении whatsapp дату создания списка упаковки или название компании (например, компания: flora)?',
    listEmptyWarning: 'список не должен быть пустым',
    history: 'история',
    reset: 'сбросить',
    clear: 'очистить',
    settings: 'настройки',
    limit: 'лимит',
    cannotBeEmpty: 'не может быть пустым',
  },
  dutch: {
    language: 'nl',
    save: 'opslaan',
    showMore: 'meer weergeven',
    showLess: 'minder weergeven',
    delete: 'verwijderen',
    back: 'terug',
    enterListName: 'voer hier de naam van de lijst in',
    enterNewValue: 'voer nieuwe waarde in',
    description: 'beschrijving',
    company: 'bedrijf',
    date: 'datum',
    packagingList: 'verpakkingslijst',
    languageLabel: 'taal',
    packName: 'naam van het pakket',
    example: 'voorbeeld',
    home: 'startpagina',
    information: 'informatie',
    settingsWhatsAppMessage: 'whatsapp-berichtinstellingen',
    whatsAppMessagePrompt: 'wilt u in het whatsapp-bericht de datum van het aanmaken van de verpakkingslijst of de bedrijfsnaam tonen (bijv. bedrijf: flora)?',
    listEmptyWarning: 'de lijst mag niet leeg zijn',
    history: 'geschiedenis',
    reset: 'resetten',
    clear: 'wissen',
    settings: 'instellingen',
    limit: 'limiet',
    cannotBeEmpty: 'mag niet leeg zijn',
  },
  ukrainian: {
    language: 'ua',
    save: 'зберегти',
    showMore: 'показати більше',
    showLess: 'показати менше',
    delete: 'видалити',
    back: 'назад',
    enterListName: 'введіть назву списку тут',
    enterNewValue: 'введіть нове значення',
    description: 'опис',
    company: 'компанія',
    date: 'дата',
    packagingList: 'пакувальний лист',
    languageLabel: 'мова',
    packName: 'назва пакування',
    example: 'приклад',
    home: 'головна',
    information: 'інформація',
    settingsWhatsAppMessage: 'налаштування повідомлень whatsapp',
    whatsAppMessagePrompt: 'бажаєте показати у повідомленні whatsapp: дату створення списку пакування чи назву компанії (наприклад, компанія: flora)?',
    listEmptyWarning: 'список не повинен бути порожнім',
    history: 'історія',
    reset: 'скинути',
    clear: 'очистити',
    settings: 'налаштування',
    limit: 'ліміт',
    cannotBeEmpty: 'не може бути порожнім',
  },
};
