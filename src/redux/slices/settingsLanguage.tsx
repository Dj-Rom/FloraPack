import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LanguageLabels = {
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
};

type SettingLanguageSliceState = {
  [key: string]: LanguageLabels;
};

const allLanguages: SettingLanguageSliceState = {
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
  },
};

const langMap: { [key: string]: keyof typeof allLanguages } = {
  pl: 'polish',
  en: 'english',
  ru: 'russian',
  nl: 'dutch',
  ua: 'ukrainian',
};

const savedSettings = localStorage.getItem('FloraPackSettingsLanguage');
const savedLanguageKey = savedSettings ? JSON.parse(savedSettings).language : 'pl';

const initialState: LanguageLabels = allLanguages[langMap[savedLanguageKey] || 'polish'];

export const settingsLanguageSlice = createSlice({
  name: 'settingsLanguage',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      const selectedLang = langMap[action.payload];
      if (selectedLang) {
        Object.assign(state, allLanguages[selectedLang]);
        localStorage.setItem(
          'FloraPackSettingsLanguage',
          JSON.stringify({ language: allLanguages[selectedLang].language })
        );
        
      }
    },
  },
});

export const { setLanguage } = settingsLanguageSlice.actions;
export default settingsLanguageSlice.reducer;
