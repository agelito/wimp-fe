import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ReadPictureDto } from "../../Dtos/Wimp/ReadPictureDto";
import { ReadIntelDto } from "../../Dtos/Wimp/ReadIntelDto";

interface PictureState {
    generatedDate?: Date,
    characters: Map<number, ReadIntelDto>;
};

const initialState: PictureState = {
    characters: new Map(),
};

export const pictureSlice = createSlice({
    name: 'picture',
    initialState,
    reducers: {
        addPicture: (state, action: PayloadAction<ReadPictureDto>) => {
            const picture = action.payload;
            const sortedIntel = [...picture.reported_intel]
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

            sortedIntel.forEach(i => {
                state.characters.set(i.id, i);
            });

            state.generatedDate = picture.generated_time;
        },
    }
});

export const wimpPictureApi = createApi({
    reducerPath: 'wimpPictureApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/picture' }),
    endpoints: (builder) => ({
        getPicture: builder.query<ReadPictureDto[], {}>({
            query: () => `/`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPictureQuery } = wimpPictureApi

export const { addPicture } = pictureSlice.actions;
export const selectPictureForSystem = (state: RootState, systemId: number) =>
    Array.from(state.picture.characters.values()).filter(intel => intel.starSystem.id === systemId);
export default pictureSlice.reducer;