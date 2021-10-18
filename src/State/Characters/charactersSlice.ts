import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ReadCharacterPortraitDto } from "../../Dtos/Esi/ReadCharacterPortraitDto";

interface CharactersState {
};

const initialState: CharactersState = {
};

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {}
});

export const esiCharactersApi = createApi({
    reducerPath: 'esiCharactersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://esi.evetech.net/latest/characters' }),
    endpoints: (builder) => ({
        characterPortrait: builder.query<ReadCharacterPortraitDto, { characterId: number }>({
            query: ({ characterId }) => `/${characterId}/portrait`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCharacterPortraitQuery } = esiCharactersApi

export default charactersSlice.reducer;