import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SettingsState {
    language: string,
    darkMode: boolean,
    fetchNumberOfJumps: number,
};

const initialState: SettingsState = {
    language: 'en',
    darkMode: false,
    fetchNumberOfJumps: 3,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        toggleDarkMode: state => {
            state.darkMode = !state.darkMode;
        },
        setFetchNumberOfJumps: (state, action: PayloadAction<number>) => {
            state.fetchNumberOfJumps = action.payload;
        }
    },
});

export const { setLanguage, setDarkMode, toggleDarkMode, setFetchNumberOfJumps } = settingsSlice.actions;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectDarkMode = (state: RootState) => state.settings.darkMode;
export const selectFetchNumberOfJumps = (state: RootState) => state.settings.fetchNumberOfJumps;
export default settingsSlice.reducer;