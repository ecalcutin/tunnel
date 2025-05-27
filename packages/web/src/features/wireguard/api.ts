import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wireguardApi = createApi({
  reducerPath: 'wireguardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: builder => {
    return {
      getWireguardInterfaces: builder.query<unknown, void>({
        query: () => `/wireguard/interfaces`,
      }),
    };
  },
});

export const { useGetWireguardInterfacesQuery } = wireguardApi;
