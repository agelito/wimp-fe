export type StargateResponseDto = {
    stargate_id: number,
    system_id: number,
    name: string,
    destination: {
        stargate_id: number,
        system_id: number,
    }
}
