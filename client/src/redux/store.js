import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import adminReducer from './admin/adminLoginSlice'
import adminUserReducer from './admin/adminuserSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({user:userReducer,admin:adminReducer,adminUsers:adminUserReducer})
const persistConfig = {
    key:'root',
    version:1,
    storage,
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false
    }),
})

export const persistor =persistStore(store)