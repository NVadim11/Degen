import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { phpApi } from './services/apiQuery'

const root = combineReducers({
	[phpApi.reducerPath]: phpApi.reducer,
});

export const store = configureStore({
	reducer: root,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			phpApi.middleware,
		]),
});

setupListeners(store.dispatch);