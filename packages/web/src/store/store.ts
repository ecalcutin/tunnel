import { configureStore } from '@reduxjs/toolkit';

import { wireguardApi } from '../features/wireguard/api';

export const store = configureStore({
  reducer: {
    [wireguardApi.reducerPath]: wireguardApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(wireguardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
