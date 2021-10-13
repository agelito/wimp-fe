import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import pictureReducer, { wimpPictureApi } from './Picture/pictureSlice';
import settingsReducer from './Settings/settingsSlice';
import universeReducer, { wimpUniverseApi } from './Universe/universeSlice';

const reducers = combineReducers({
    settings: settingsReducer,
    universe: universeReducer,
    picture: pictureReducer,
    [wimpUniverseApi.reducerPath]: wimpUniverseApi.reducer,
    [wimpPictureApi.reducerPath]: wimpPictureApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, wimpUniverseApi.middleware],
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
