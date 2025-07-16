import {combineReducers, configureStore} from '@reduxjs/toolkit'

// And use redux-batched-subscribe as an example of adding enhancers

import todosReducer from './valueReducer'
import type {ValueInterface} from "@/redux/valueReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from "redux-persist";
import createIndexedDBStorage from 'redux-persist-indexeddb-storage';

const reducer = {
    todos: todosReducer,
    
}

interface storeState {
    todos: ValueInterface[]
}

const indexedDBStorage = createIndexedDBStorage('myIndexedDB', 'myDataStore');

const persistConfig = {
    key: 'root',
    storage: indexedDBStorage
}

const persistedReducer = persistReducer(persistConfig, combineReducers(reducer));

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
