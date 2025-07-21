import { configureStore } from '@reduxjs/toolkit';
import settingsPackReducer from './slices/settingsPackSlice';
import settingsLanguageReducer from './slices/settingsLanguageSlice'
import dataPackListReducer from './slices/packagingListSlice'
import modalWindowsReducer from './slices/modalWindowsSlice'
import naviReducer from './slices/naviSlice'
import alertReducer from './slices/alertSlice'
import settingWhatsAppMessageReducer from './slices/settingsWhatsAppMessageSlice'
import activityHistoryReducer from './slices/activityHistorySlice'
import formListReducer from "./slices/FormForListPackagingSlice";
export const store = configureStore({
  reducer: {
    settingsPack: settingsPackReducer,
    settingsLanguage: settingsLanguageReducer,
    navi: naviReducer,
    dataPackList: dataPackListReducer,
    modalWindows: modalWindowsReducer,
    alert: alertReducer,
    settingWhatsAppMessage: settingWhatsAppMessageReducer,
    activityHistory: activityHistoryReducer,
    formList : formListReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
