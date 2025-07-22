import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingPackState = {
  [key: string]: boolean;
};

const LOCAL_STORAGE_KEY = 'FloraPackSettingsPackagingList1';
const LOCAL_STORAGE_SNAPSHOT_KEY = 'FloraPackSettingsPackagingListCurrentList1';

const defaultState: SettingPackState = {
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

// Helpers
const getSavedState = (key: string): SettingPackState | null => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved).packList : null;
  } catch {
    return null;
  }
};

const saveState = (key: string, state: SettingPackState) => {
  localStorage.setItem(key, JSON.stringify({ packList: { ...state } }));
};

// Initialize localStorage if not set
if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  saveState(LOCAL_STORAGE_KEY, defaultState);
}

const initialState: SettingPackState =
    getSavedState(LOCAL_STORAGE_KEY) || { ...defaultState };

// Slice
const settingsPackSlice = createSlice({
  name: 'settingsPack',
  initialState,
  reducers: {
    addPackItem: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
      saveState(LOCAL_STORAGE_KEY, state);
    },
    deletePackItem: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
      saveState(LOCAL_STORAGE_KEY, state);
    },
    togglePackItemVisibility: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (key in state) {
        state[key] = !state[key];
        saveState(LOCAL_STORAGE_KEY, state);
        saveState(LOCAL_STORAGE_SNAPSHOT_KEY, state);
      }
    },
    showAllPackItems: (state) => {
      // Save snapshot before changing
      saveState(LOCAL_STORAGE_SNAPSHOT_KEY, state);
      Object.keys(state).forEach((key) => {
        state[key] = true;
      });
      saveState(LOCAL_STORAGE_KEY, state);
    },
    restorePreviousVisibility: (state) => {
      const snapshot = getSavedState(LOCAL_STORAGE_SNAPSHOT_KEY);
      Object.keys(state).forEach((key) => {
        state[key] = snapshot?.[key] ?? defaultState[key];
      });
      saveState(LOCAL_STORAGE_KEY, state);
    },
  },
});

// Actions
export const {
  addPackItem,
  deletePackItem,
  togglePackItemVisibility,
  showAllPackItems,
  restorePreviousVisibility,
} = settingsPackSlice.actions;

// Reducer
export default settingsPackSlice.reducer;
