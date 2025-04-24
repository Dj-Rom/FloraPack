import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allLanguages, LanguageLabels } from '../../data/languages';

const langMap: { [key: string]: keyof typeof allLanguages } = {
  pl: 'polish',
  en: 'english',
  ru: 'russian',
  nl: 'dutch',
  ua: 'ukrainian',
  de: 'deutsch',
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
