import { configureStore } from '@reduxjs/toolkit';
import settingsPackReducer from './slices/settingsPack';
import settingsLanguageReducer from './slices/settingsLanguage'
import dataPackListReducer from './slices/packagingList'
import modalWindowsReducer from './slices/modalWindows'
import naviReducer from './slices/navi'
import alertReducer from './slices/alert'
export const store = configureStore({
  reducer: {
    settingsPack: settingsPackReducer,
    settingsLanguage: settingsLanguageReducer,
    navi: naviReducer,
    dataPackList: dataPackListReducer,
    modalWindows: modalWindowsReducer,
    alert: alertReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
