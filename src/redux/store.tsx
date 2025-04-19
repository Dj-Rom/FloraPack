import { configureStore } from '@reduxjs/toolkit';
import settingsPackReducer from './slices/settingsPack';
import settingsLanguageReducer from './slices/settingsLanguage'
import naviReducer from './slices/navi'
export const store = configureStore({
  reducer: {
    settingsPack: settingsPackReducer,
    settingsLanguage: settingsLanguageReducer,
    navi: naviReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
