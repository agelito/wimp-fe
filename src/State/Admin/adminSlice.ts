import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ReadUsersDto } from "../../Dtos/Wimp/User/ReadUsersDto";
import { ReadInvitationKeyDto } from "../../Dtos/Wimp/Admin/ReadInvitationKeyDto";
import { ChangeUserRoleDto } from "../../Dtos/Wimp/Admin/ChangeUserRoleDto";

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
        },
    }),
    tagTypes: [`Users`],
    endpoints: (builder) => ({
        users: builder.query<ReadUsersDto, number | undefined>({
            query: (page = 0) => ({ url: `/users?page=${page}` }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.users.map(({ id }) => ({ type: `Users` as const, id })),
                        { type: `Users`, id: `PARTIAL-LIST` },
                    ] : [{ type: `Users`, id: `PARTIAL-LIST` }],
        }),
        invite: builder.mutation<ReadInvitationKeyDto, void>({
            query: () => ({ url: `/invite`, method: `POST` })
        }),
        delete: builder.mutation<{}, string>({
            query: (userId) => ({
                url: `/users/delete`,
                method: `DELETE`,
                params: { userId: userId }
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: `Users`, id },
                { type: `Users`, id: `PARTIAL-LIST` },
            ],
        }),
        role: builder.mutation<{}, ChangeUserRoleDto>({
            query: (changeRole) => ({
                url: `users/role`,
                method: `POST`,
                body: changeRole
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: `Users`, id: id.user_id },
                { type: `Users`, id: `PARTIAL-LIST` },
            ],
        })
    }),
});

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
});

export const { useUsersQuery, useInviteMutation, useDeleteMutation, useRoleMutation } = wimpAdminApi

export default adminSlice.reducer;