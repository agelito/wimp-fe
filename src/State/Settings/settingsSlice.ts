import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SettingsState {
    showSettings: boolean,
    language: string,
    themeId: string,
    fetchNumberOfJumps: number,
};

const initialState: SettingsState = {
    showSettings: false,
    language: 'en',
    themeId: 'caldari',
    fetchNumberOfJumps: 3,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setShowSettings: (state, action: PayloadAction<boolean>) => {
            state.showSettings = action.payload;
        },
        toggleShowSettings: (state) => {
            state.showSettings = !state.showSettings;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setThemeId: (state, action: PayloadAction<string>) => {
            state.themeId = action.payload;
        },
        setFetchNumberOfJumps: (state, action: PayloadAction<number>) => {
            state.fetchNumberOfJumps = action.payload;
        }
    },
});

export const { setShowSettings, toggleShowSettings, setLanguage, setThemeId, setFetchNumberOfJumps } = settingsSlice.actions;
export const selectShowSettings = (state: RootState) => state.settings.showSettings;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectThemeId = (state: RootState) => state.settings.themeId;
export const selectFetchNumberOfJumps = (state: RootState) => state.settings.fetchNumberOfJumps;
export default settingsSlice.reducer;