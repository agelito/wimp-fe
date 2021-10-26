import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ReadUsersDto } from "../../Dtos/Wimp/User/ReadUsersDto";

interface AdminState {
};

const initialState: AdminState = {
};

const BaseUrl = process.env.REACT_APP_WIMP_API || window.location.origin;

export const wimpAdminApi = createApi({
    reducerPath: 'wimpAdminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseUrl}/api/admin`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set(`authorization`, `Bearer ${token.token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        users: builder.query<ReadUsersDto, number | undefined>({
            query: (page = 0) => ({ url: `/users?page=${page}` }),
        })
    }),
});

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
});

export const { useUsersQuery } = wimpAdminApi

export default adminSlice.reducer;