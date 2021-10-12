import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import settingsReducer from './Settings/settingsSlice';
import universeReducer, { wimpUniverseApi } from './Universe/universeSlice';

const reducers = combineReducers({
    settings: settingsReducer,
    universe: universeReducer,
    [wimpUniverseApi.reducerPath]: wimpUniverseApi.reducer,
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
