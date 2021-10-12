
export type ReadUniverseGraphDto = {
    systems: {
        systemId: number,
        systemName: string,
    }[]
    edges: {
        sourceSystemId: number,
        destinationSystemId: number,
    }[]
};