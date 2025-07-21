import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingPackSliceState = {
  [key: string]: boolean;
};

const LOCAL_STORAGE_KEY = 'FloraPackSettingsPackagingList';
const LOCAL_STORAGE_KEY_CURRENT_LIST = 'FloraPackSettingsPackagingListCurrentList';
const defaultState: SettingPackSliceState = {
  'KK': true,
  'KK-SH': true,
  'CC': true,
  'NC': true,
  'TAG-5': true,
  'TAG-6': true,
  'CC-SH': true,
  'EXT': false,
  'EP': false,
  'PALETA': false,
  '533/544': false,
  '560': false,
  '566': false,
  '577': false,
  '588': false,
  '596': false,
  '597': false,
  '598': false,
  '520': false,
  '595': false,
  'TRAAY': false,
};

if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ packList: { ...defaultState } })
  );
}


const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
const savedPackList = savedSettings ? JSON.parse(savedSettings).packList : null;

const initialState: SettingPackSliceState = savedPackList || defaultState;

const saveToStorage = (state: SettingPackSliceState, LOCAL_STORAGE_KEY: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ packList: { ...state } }));
};

export const settingsPackSlice = createSlice({
  name: 'settingsPack',
  initialState,
  reducers: {
    settingsPackAddNewPackItem: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
      saveToStorage(state, LOCAL_STORAGE_KEY);
    },
    settingsPackDeletePackItem: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
      saveToStorage(state, LOCAL_STORAGE_KEY);
    },
    settingsViewFormChangeItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (key in state) {
        state[key] = !state[key];
        saveToStorage(state, LOCAL_STORAGE_KEY);
        saveToStorage(state, LOCAL_STORAGE_KEY_CURRENT_LIST);
      }
    },
    settingsFormAllItemsIsShow: (state) => {
      saveToStorage(state, LOCAL_STORAGE_KEY_CURRENT_LIST)
      Object.keys(state).forEach((key) => {
        state[key] = true;
      });
      saveToStorage(state, LOCAL_STORAGE_KEY);
    },
    settingsFormAllItemsIsUnshod: (state) => {
      const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_LIST) || '{}')?.packList;
      Object.keys(state).forEach((key) => {
        state[key] = saved?.[key] ?? defaultState[key];
      });
      saveToStorage(state, LOCAL_STORAGE_KEY);
    },
  },
});

export const {
  settingsPackAddNewPackItem,
  settingsPackDeletePackItem,
  settingsViewFormChangeItem,
  settingsFormAllItemsIsShow,
  settingsFormAllItemsIsUnshod,
} = settingsPackSlice.actions;

export default settingsPackSlice.reducer;
