import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingWhatsAppMessage = {
  date: boolean;
  company: boolean;
};

type SettingKey = keyof SettingWhatsAppMessage;

const LOCAL_STORAGE_KEY = 'settingWhatsApp';

const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState: SettingWhatsAppMessage = savedState
  ? JSON.parse(savedState)
  : { date: false, company: false };

const saveToLocalStorage = (state: SettingWhatsAppMessage) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const settingWhatsAppMessageSlice = createSlice({
  name: 'settingWhatsAppMessage',
  initialState,
  reducers: {
    setWhatsAppMessageSetting: (state, action: PayloadAction<SettingKey>) => {
      state[action.payload] = !state[action.payload];
      saveToLocalStorage(state);
    },
  },
});

export const { setWhatsAppMessageSetting } = settingWhatsAppMessageSlice.actions;
export default settingWhatsAppMessageSlice.reducer;
