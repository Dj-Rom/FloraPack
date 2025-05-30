import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allLanguages, LanguageLabels } from '../../data/languages';

export type LanguageCode = 'pl' | 'en' | 'ru' | 'nl' | 'ua' | 'de';

const LOCAL_STORAGE_KEY = 'FloraPackSettingsLanguage';

const langMap: Record<LanguageCode, keyof typeof allLanguages> = {
  pl: 'polish',
  en: 'english',
  ru: 'russian',
  nl: 'dutch',
  ua: 'ukrainian',
  de: 'deutsch',
};

const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
const savedLanguageKey: LanguageCode = savedSettings
  ? JSON.parse(savedSettings).language
  : 'pl';

const initialState: LanguageLabels = allLanguages[langMap[savedLanguageKey]];

export const settingsLanguageSlice = createSlice({
  name: 'settingsLanguage',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      const selectedLang = langMap[action.payload];
      if (selectedLang) {
        Object.assign(state, allLanguages[selectedLang]);
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ language: allLanguages[selectedLang].language })
        );
      }
    },
  },
});

export const { setLanguage } = settingsLanguageSlice.actions;
export default settingsLanguageSlice.reducer;
