
export type ReadIntelDto = {
    id: number,
    character: {
        id: number,
        name: string,
    },
    starSystem: {
        id: number,
        name: string,
    }
    ship: {
        id: number,
        name: string,
    },
    timestamp: Date,
}