import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingPackSliceState = {
  [key: string]: boolean;
};

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
localStorage.getItem('FloraPackSettingsPackagingList') ? "" : localStorage.setItem(
  'FloraPackSettingsPackagingList',
  JSON.stringify({ packList: { ...defaultState } })
);
const savedSettings = localStorage.getItem('FloraPackSettingsPackagingList');
const savedPackList = savedSettings ? JSON.parse(savedSettings).packList : null;

const initialState: SettingPackSliceState = savedPackList || defaultState;

export const settingsPackSlice = createSlice({
  name: 'settingsPack',
  initialState,
  reducers: {
    settingsPackAddNewPackItem: (state, action) => {
      state[action.payload] = false
      localStorage.setItem(
        'FloraPackSettingsPackagingList',
        JSON.stringify({ packList: { ...state } })
      );
    },
    settingsViewFormChangeItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (key in state) {
        state[key] = !state[key];
        localStorage.setItem(
          'FloraPackSettingsPackagingList',
          JSON.stringify({ packList: { ...state } })
        );
      }
    },

    settingsFormAllItemsIsShow: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = true;
      });

    },
    settingsFormAllItemsIsUnshow: (state) => {
      const temp = JSON.parse(localStorage.getItem('FloraPackSettingsPackagingList') || '{}')?.packList || null;
      Object.keys(state).forEach((key) => {
        state[key] = temp[key] ?? defaultState[key];
      });
    },
  },
});

export const {
  settingsPackAddNewPackItem,
  settingsViewFormChangeItem,
  settingsFormAllItemsIsShow,
  settingsFormAllItemsIsUnshow,
} = settingsPackSlice.actions;

export default settingsPackSlice.reducer;
