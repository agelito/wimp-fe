import { ConstellationResponseDto, ConstellationsResponseDto, StargateResponseDto, StarSystemResponseDto, StarSystemsResponseDto } from "../../Dtos/Esi";

interface IEsiDataService {
    getAllConstellations(): Promise<ConstellationsResponseDto>
    getConstellationWithId(id: number): Promise<ConstellationResponseDto>
    getAllStarSystems(): Promise<StarSystemsResponseDto>
    getStarSystemWithId(id: number): Promise<StarSystemResponseDto>
    getStargateWithId(id: number): Promise<StargateResponseDto>
}

export default IEsiDataService;