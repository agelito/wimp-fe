import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationSoundEffects, SoundEffect } from "../../Components/Settings/NotificationSoundEffects";
import { RootState } from "../store";

interface SettingsState {
    expandedSideNav: boolean,
    language: string,
    themeId: string,
    fetchNumberOfJumps: number,
    desktopNotifications: boolean,
    audioNotifications: boolean,
    audioNotificationSoundEffect: SoundEffect,
};

const initialState: SettingsState = {
    expandedSideNav: false,
    language: 'en',
    themeId: 'caldari',
    fetchNumberOfJumps: 3,
    desktopNotifications: false,
    audioNotifications: false,
    audioNotificationSoundEffect: NotificationSoundEffects[0],
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setExpandedSideNav: (state, action: PayloadAction<boolean>) => {
            state.expandedSideNav = action.payload;
        },
        toggleShowSettings: (state) => {
            state.expandedSideNav = !state.expandedSideNav;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setThemeId: (state, action: PayloadAction<string>) => {
            state.themeId = action.payload;
        },
        setFetchNumberOfJumps: (state, action: PayloadAction<number>) => {
            state.fetchNumberOfJumps = action.payload;
        },
        setDesktopNotifications: (state, action: PayloadAction<boolean>) => {
            state.desktopNotifications = action.payload;
        },
        setAudioNotifications: (state, action: PayloadAction<boolean>) => {
            state.audioNotifications = action.payload;
        },
        setAudioNotificationSoundEffect: (state, action: PayloadAction<SoundEffect>) => {
            state.audioNotificationSoundEffect = action.payload;
        }
    },
});

export const {
    setExpandedSideNav,
    toggleShowSettings,
    setLanguage,
    setThemeId,
    setFetchNumberOfJumps,
    setDesktopNotifications,
    setAudioNotifications,
    setAudioNotificationSoundEffect
} = settingsSlice.actions;
export const selectExpandedSideNav = (state: RootState) => state.settings.expandedSideNav;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectThemeId = (state: RootState) => state.settings.themeId;
export const selectFetchNumberOfJumps = (state: RootState) => state.settings.fetchNumberOfJumps;
export const selectDesktopNotifications = (state: RootState) => state.settings.desktopNotifications;
export const selectAudioNotifications = (state: RootState) => state.settings.audioNotifications;
export const selectAudioNotificationSoundEffect = (state: RootState) => state.settings.audioNotificationSoundEffect;
export default settingsSlice.reducer;