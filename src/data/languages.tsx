
export type LanguageLabels = {

  language: string;
  save: string;
  showMore: string;
  showLess: string;
  delete: string;
  back: string;
  enterListName: string;
  description: string;
  company: string;
  date: string;
  packagingList: string;
  languageLabel: string;
  packName: string;
  example: string;
  home: string;
  information: string;
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
    enterListName: 'Wpisz tutaj nazwę listy',
    description: 'Opis',
    company: 'Firma',
    date: 'Data',
    packagingList: 'Lista opakowań',
    languageLabel: 'Język',
    packName: 'Nazwa opakowania',
    example: 'Przykład',
    home: 'Strona główna',
    information: 'Informacje',
  },
  deutsch: {
    language: 'de',
    save: 'speichern',
    showMore: 'mehr anzeigen',
    showLess: 'weniger anzeigen',
    delete: 'löschen',
    back: 'zurück',
    enterListName: 'Listenname hier eingeben',
    description: 'Beschreibung',
    company: 'Firma',
    date: 'Datum',
    packagingList: 'Verpackungsliste',
    languageLabel: 'Sprache',
    packName: 'Verpackungsname',
    example: 'Beispiel',
    home: 'Startseite',
    information: 'Informationen',
  },
  english: {
    language: 'en',
    save: 'save',
    showMore: 'show more',
    showLess: 'show less',
    delete: 'delete',
    back: 'back',
    enterListName: 'Enter list name here',
    description: 'Description',
    company: 'Company',
    date: 'Date',
    packagingList: 'Packaging list',
    languageLabel: 'Language',
    packName: 'Package name',
    example: 'Example',
    home: 'Home',
    information: 'Information',
  },
  russian: {
    language: 'ru',
    save: 'сохранить',
    showMore: 'показать больше',
    showLess: 'показать меньше',
    delete: 'удалить',
    back: 'назад',
    enterListName: 'Введите название списка',
    description: 'Описание',
    company: 'Компания',
    date: 'Дата',
    packagingList: 'Упаковочный лист',
    languageLabel: 'Язык',
    packName: 'Наименование упаковки',
    example: 'Пример',
    home: 'Главная',
    information: 'Информация',
  },
  dutch: {
    language: 'nl',
    save: 'opslaan',
    showMore: 'meer weergeven',
    showLess: 'minder weergeven',
    delete: 'verwijderen',
    back: 'terug',
    enterListName: 'Voer hier de naam van de lijst in',
    description: 'Beschrijving',
    company: 'Bedrijf',
    date: 'Datum',
    packagingList: 'Verpakkingslijst',
    languageLabel: 'Taal',
    packName: 'Naam van het pakket',
    example: 'Voorbeeld',
    home: 'Startpagina',
    information: 'Informatie',
  },
  ukrainian: {
    language: 'ua',
    save: 'зберегти',
    showMore: 'показати більше',
    showLess: 'показати менше',
    delete: 'видалити',
    back: 'назад',
    enterListName: 'Введіть назву списку тут',
    description: 'Опис',
    company: 'Компанія',
    date: 'Дата',
    packagingList: 'Пакувальний лист',
    languageLabel: 'Мова',
    packName: 'Назва пакування',
    example: 'Приклад',
    home: 'Головна',
    information: 'Інформація',
  },
};
