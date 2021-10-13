import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SettingsState {
    language: string,
    themeId: string,
    fetchNumberOfJumps: number,
};

const initialState: SettingsState = {
    language: 'en',
    themeId: 'caldari',
    fetchNumberOfJumps: 3,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
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

export const { setLanguage, setThemeId, setFetchNumberOfJumps } = settingsSlice.actions;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectThemeId = (state: RootState) => state.settings.themeId;
export const selectFetchNumberOfJumps = (state: RootState) => state.settings.fetchNumberOfJumps;
export default settingsSlice.reducer;