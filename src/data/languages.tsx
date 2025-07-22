export type LanguageLabels = {
  language: string;
  save: string;
  showMore: string;
  showLess: string;
  delete: string;
  back: string;
  enterListName: string;
  enterNewValue: string;
  description: string;
  company: string;
  date: string;
  packingList: string;
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
  answerMessageForExitWithoutChange: string;
};

export type SettingLanguageSliceState = {
  [key: string]: LanguageLabels;
};

export const allLanguages: SettingLanguageSliceState = {
  russian: {
    language: 'ru',
    save: 'сохранить',
    showMore: 'показать больше',
    showLess: 'показать меньше',
    delete: 'удалить',
    back: 'назад',
    enterListName: 'ввести название списка',
    enterNewValue: 'ввести новое значение',
    description: 'описание',
    company: 'компания',
    date: 'дата',
    packingList: 'упаковочный лист',
    languageLabel: 'язык',
    packName: 'наименование упаковки',
    example: 'пример',
    home: 'главная',
    information: 'информация',
    settingsWhatsAppMessage: 'настройки сообщений WhatsApp',
    whatsAppMessagePrompt: 'хотите отобразить в WhatsApp даты создания списка производства или названия компании (например, компания: флора)?',
    listEmptyWarning: 'список не должен быть пустым',
    history: 'история',
    reset: 'сбросить',
    clear: 'очистить',
    settings: 'настройки',
    limit: 'лимит',
    cannotBeEmpty: 'не может быть пустым',
    answerMessageForExitWithoutChange: 'Для сохранения перед выходом нужно нажать «=»! Вы уверены, что хотите выйти без сохранения?',
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
    packingList: 'packing list',
    languageLabel: 'language',
    packName: 'pack name',
    example: 'example',
    home: 'home',
    information: 'information',
    settingsWhatsAppMessage: 'WhatsApp message settings',
    whatsAppMessagePrompt: 'Do you want to show the packing list creation date or company name (e.g. Company: Flora) in the WhatsApp message?',
    listEmptyWarning: 'the list must not be empty',
    history: 'history',
    reset: 'reset',
    clear: 'clear',
    settings: 'settings',
    limit: 'limit',
    cannotBeEmpty: 'cannot be empty',
    answerMessageForExitWithoutChange: 'To save before exiting, you need to press "="! Are you sure you want to exit without saving?',
  },
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
    packingList: 'lista opakowań',
    languageLabel: 'język',
    packName: 'nazwa opakowania',
    example: 'przykład',
    home: 'strona główna',
    information: 'informacje',
    settingsWhatsAppMessage: 'ustawienia wiadomości WhatsApp',
    whatsAppMessagePrompt: 'czy chcesz wyświetlić w wiadomości WhatsApp: datę utworzenia listy pakowania lub nazwę firmy (np. Firma: Flora)?',
    listEmptyWarning: 'lista nie może być pusta',
    history: 'historia',
    reset: 'zresetuj',
    clear: 'wyczyść',
    settings: 'ustawienia',
    limit: 'limit',
    cannotBeEmpty: 'nie może być puste',
    answerMessageForExitWithoutChange: 'Aby zapisać przed wyjściem, naciśnij "="! Czy na pewno chcesz wyjść bez zapisywania?',
  },
  german: {
    language: 'de',
    save: 'speichern',
    showMore: 'mehr anzeigen',
    showLess: 'weniger anzeigen',
    delete: 'löschen',
    back: 'zurück',
    enterListName: 'Listenname hier eingeben',
    enterNewValue: 'neuen Wert eingeben',
    description: 'beschreibung',
    company: 'firma',
    date: 'datum',
    packingList: 'verpackungsliste',
    languageLabel: 'sprache',
    packName: 'verpackungsname',
    example: 'beispiel',
    home: 'startseite',
    information: 'informationen',
    settingsWhatsAppMessage: 'WhatsApp-Nachrichteneinstellungen',
    whatsAppMessagePrompt: 'Möchten Sie in der WhatsApp-Nachricht das Erstellungsdatum der Verpackungsliste oder den Firmennamen anzeigen (z. B. Firma: Flora)?',
    listEmptyWarning: 'die Liste darf nicht leer sein',
    history: 'verlauf',
    reset: 'zurücksetzen',
    clear: 'löschen',
    settings: 'einstellungen',
    limit: 'limit',
    cannotBeEmpty: 'darf nicht leer sein',
    answerMessageForExitWithoutChange: 'Um vor dem Beenden zu speichern, drücken Sie "="! Möchten Sie wirklich ohne Speichern beenden?',
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
    packingList: 'verpakkingslijst',
    languageLabel: 'taal',
    packName: 'naam van het pakket',
    example: 'voorbeeld',
    home: 'startpagina',
    information: 'informatie',
    settingsWhatsAppMessage: 'WhatsApp-berichtinstellingen',
    whatsAppMessagePrompt: 'Wilt u in het WhatsApp-bericht de datum van het aanmaken van de verpakkingslijst of de bedrijfsnaam tonen (bijv. bedrijf: Flora)?',
    listEmptyWarning: 'de lijst mag niet leeg zijn',
    history: 'geschiedenis',
    reset: 'resetten',
    clear: 'wissen',
    settings: 'instellingen',
    limit: 'limiet',
    cannotBeEmpty: 'mag niet leeg zijn',
    answerMessageForExitWithoutChange: 'Om op te slaan voor het afsluiten, druk op "="! Weet je zeker dat je wilt afsluiten zonder op te slaan?',
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
    packingList: 'пакувальний лист',
    languageLabel: 'мова',
    packName: 'назва пакування',
    example: 'приклад',
    home: 'головна',
    information: 'інформація',
    settingsWhatsAppMessage: 'налаштування повідомлень WhatsApp',
    whatsAppMessagePrompt: 'Бажаєте показати у повідомленні WhatsApp: дату створення списку пакування чи назву компанії (наприклад, компанія: Флора)?',
    listEmptyWarning: 'список не повинен бути порожнім',
    history: 'історія',
    reset: 'скинути',
    clear: 'очистити',
    settings: 'налаштування',
    limit: 'ліміт',
    cannotBeEmpty: 'не може бути порожнім',
    answerMessageForExitWithoutChange: 'Щоб зберегти перед виходом, натисніть "="! Ви впевнені, що хочете вийти без збереження?',
  },
};
