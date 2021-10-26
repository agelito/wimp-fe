import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ReadUniverseGraphDto } from "../../Dtos/Wimp/ReadUniverseGraphDto";

export interface StarSystem {
    systemId: number;
    systemName: string;
}

interface UniverseState {
    locatedAtSystemId: number,
    selectedSystem?: StarSystem,
};

const initialState: UniverseState = {
    locatedAtSystemId: 30001192 // GJ0-OJ
};

export const universeSlice = createSlice({
    name: 'universe',
    initialState,
    reducers: {
        moveToSystem: (state, action: PayloadAction<number>) => {
            state.locatedAtSystemId = action.payload;
        },
        selectSystem: (state, action: PayloadAction<StarSystem>) => {
            state.selectedSystem = action.payload;
        },
        deselectSystem: (state) => {
            state.selectedSystem = undefined;
        }
    },
});

const BaseUrl = process.env.REACT_APP_WIMP_API || window.location.origin;

export const wimpUniverseApi = createApi({
    reducerPath: 'wimpUniverseApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BaseUrl}/api/universe` }),
    endpoints: (builder) => ({
        getUniverseGraphWithinJumps: builder.query<ReadUniverseGraphDto, { systemId: number, jumps: number }>({
            query: ({ systemId, jumps }) => `/${systemId}/${jumps}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUniverseGraphWithinJumpsQuery } = wimpUniverseApi

export const { moveToSystem, selectSystem, deselectSystem } = universeSlice.actions;
export const selectUniverse = (state: RootState) => state.universe;
export const selectSelectedSystemId = (state: RootState) => state.universe.selectedSystem?.systemId;
export const selectSelectedSystem = (state: RootState) => state.universe.selectedSystem;
export const selectLocatedAtSystemId = (state: RootState) => state.universe.locatedAtSystemId;
export default universeSlice.reducer;