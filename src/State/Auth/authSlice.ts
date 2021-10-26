import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginUserDto } from "../../Dtos/Wimp/User/LoginUserDto";
import { ReadTokenDto } from "../../Dtos/Wimp/User/ReadTokenDto";
import { ReadUserDto } from "../../Dtos/Wimp/User/ReadUserDto";
import { RegisterUserDto } from "../../Dtos/Wimp/User/RegisterUserDto";

interface AuthState {
    user?: ReadUserDto
    token?: ReadTokenDto
};

const initialState: AuthState = {
};

const BaseUrl = process.env.REACT_APP_WIMP_API || window.location.origin;

export const wimpAuthApi = createApi({
    reducerPath: 'wimpAuthApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseUrl}/api/user`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set(`authorization`, `Bearer ${token.token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        user: builder.query<ReadUserDto, {}>({
            query: () => ({ url: `/` }),
            providesTags: [`User`],
        }),
        login: builder.mutation<ReadTokenDto, LoginUserDto>({
            query: (login) => ({
                url: `/login`,
                method: `POST`,
                body: login
            }),
            invalidatesTags: ['User']
        }),
        register: builder.mutation<ReadUserDto, RegisterUserDto>({
            query: (register) => ({
                url: `/register`,
                method: `POST`,
                body: register
            }),
        })
    }),
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ReadUserDto>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<ReadTokenDto | undefined>) => {
            state.token = action.payload;
        },
        logout: (state, action: PayloadAction) => {
            state.token = undefined;
            state.user = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(wimpAuthApi.endpoints.login.matchFulfilled, (state, { payload }) => { state.token = payload });
        builder.addMatcher(wimpAuthApi.endpoints.user.matchFulfilled, (state, { payload }) => { state.user = payload });
        builder.addMatcher(wimpAuthApi.endpoints.user.matchRejected, (state) => { state.user = undefined; });
    },
});

export const { setToken, setUser, logout } = authSlice.actions;
export const { useLoginMutation, useRegisterMutation, useUserQuery } = wimpAuthApi
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsSignedIn = (state: RootState) => {
    if (!state.auth.token) {
        return false;
    }

    const tokenExpireDate = new Date(state.auth.token.expiration);
    const currentDate = new Date();

    if (tokenExpireDate.getTime() < currentDate.getTime()) {
        return false;
    }

    return true;
};
export default authSlice.reducer;