import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { esiCharactersApi } from './Characters/charactersSlice';
import pictureReducer, { wimpPictureApi } from './Picture/pictureSlice';
import settingsReducer from './Settings/settingsSlice';
import universeReducer, { wimpUniverseApi } from './Universe/universeSlice';
import charactersReducer from './Characters/charactersSlice';
import authReducer from './Auth/authSlice';
import { wimpAuthApi } from './Auth/authSlice';

const reducers = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    universe: universeReducer,
    picture: pictureReducer,
    characters: charactersReducer,
    [wimpAuthApi.reducerPath]: wimpAuthApi.reducer,
    [wimpUniverseApi.reducerPath]: wimpUniverseApi.reducer,
    [wimpPictureApi.reducerPath]: wimpPictureApi.reducer,
    [esiCharactersApi.reducerPath]: esiCharactersApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['settings', 'universe', 'picture', 'auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }).concat([wimpAuthApi.middleware, wimpUniverseApi.middleware, wimpPictureApi.middleware, esiCharactersApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
