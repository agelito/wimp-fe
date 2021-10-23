import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ReadPictureDto } from "../../Dtos/Wimp/ReadPictureDto";
import { ReadIntelDto } from "../../Dtos/Wimp/ReadIntelDto";
import { getCurrentDateUTC } from "../../Utils/DateUtils";

interface PictureState {
    generatedDate?: string,
    characterIntel: ReadIntelDto[];
    statusIntel: ReadIntelDto[];
};

const initialState: PictureState = {
    characterIntel: [],
    statusIntel: [],
};

const BaseUrl = process.env.REACT_APP_WIMP_API || window.location.origin;

export const wimpPictureApi = createApi({
    reducerPath: 'wimpPictureApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseUrl}/picture`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set(`authorization`, `Bearer ${token.token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPicture: builder.query<ReadPictureDto, {}>({
            query: () => `/`,
        }),
    }),
})

export const pictureSlice = createSlice({
    name: 'picture',
    initialState,
    reducers: {
        addPicture: (state, action: PayloadAction<ReadPictureDto>) => {
            const picture = action.payload;
            const sortedIntel = [...picture.reported_intel]
                .sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));

            var currentUtcMillis = getCurrentDateUTC().valueOf();

            // NOTE: 15 = 15 minutes, 60000 = 1 minute in ms
            var removeAfterUtcMillis = (currentUtcMillis - 15 * 60000);

            var characters = new Map(state.characterIntel
                .filter(ci => Date.parse(ci.timestamp) > removeAfterUtcMillis)
                .map(ci => [ci.character.id, ci]));

            sortedIntel
                .filter(i => i.character)
                .forEach(i => {
                    characters.set(i.character.id, i);
                });

            var withoutCharacters = new Map(state.statusIntel
                .filter(ci => Date.parse(ci.timestamp) > removeAfterUtcMillis)
                .map(ci => [ci.id, ci]));

            sortedIntel
                .filter(i => i.character === null)
                .forEach(i => {
                    withoutCharacters.set(i.id, i);
                });

            state.characterIntel = Array.from(characters.values());
            state.statusIntel = Array.from(withoutCharacters.values());
            state.generatedDate = picture.generated_time;
        },
        removeReportsOlderThanMinutes: (state, action: PayloadAction<number>) => {
            var currentUtcMillis = getCurrentDateUTC().valueOf();
            var removeAfterUtcMillis = (currentUtcMillis - action.payload * 60000);

            var characterIntel = state.characterIntel.filter(ci =>
                Date.parse(ci.timestamp) > removeAfterUtcMillis
            );

            state.characterIntel = characterIntel;
        }
    }
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPictureQuery } = wimpPictureApi

export const { addPicture, removeReportsOlderThanMinutes } = pictureSlice.actions;
export const selectPicture = (state: RootState) => state.picture;
export const selectIntelForSystem = (state: PictureState, systemId: number) =>
    state.characterIntel
        .concat(state.statusIntel)
        .filter(intel => intel.starSystem.id === systemId);
export default pictureSlice.reducer;