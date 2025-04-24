import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type  SettingWhatsAppMessage = {
  date: boolean;
  company: boolean;
};
type SettingKey = keyof  SettingWhatsAppMessage; // "date" | "company"
const savedState = localStorage.getItem('settingWhatsApp');
const initialState:  SettingWhatsAppMessage = savedState
  ? JSON.parse(savedState)
  : { date: false, company: false };

export const settingWhatsAppMessageSlice = createSlice({
  name: 'settingWhatsAppMessage',
  initialState,
  reducers: {
    setWhatsAppMessageSetting: (state, action: PayloadAction<SettingKey>) => {
      state[action.payload] = !state[action.payload];
      localStorage.setItem('settingWhatsApp', JSON.stringify({ ...state }));
    },
  },
});

export const { setWhatsAppMessageSetting } = settingWhatsAppMessageSlice.actions;
export default settingWhatsAppMessageSlice.reducer;
