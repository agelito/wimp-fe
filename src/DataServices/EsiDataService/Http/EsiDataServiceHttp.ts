import { ConstellationResponseDto, ConstellationsResponseDto, StargateResponseDto, StarSystemResponseDto, StarSystemsResponseDto } from "../../../Dtos/Esi";
import IEsiDataService from "../IEsiDataService";

class EsiDataServiceHttp implements IEsiDataService {
    private readonly esiEndpoint: string;

    constructor(esiEndpoint: string) {
        this.esiEndpoint = esiEndpoint;
    }

    getAllConstellations = (): Promise<ConstellationsResponseDto> =>
        fetch(`${this.esiEndpoint}/latest/universe/constellations/`)
            .then(response => response.json());

    getConstellationWithId = (id: number): Promise<ConstellationResponseDto> =>
        fetch(`${this.esiEndpoint}/latest/universe/constellations/${id}/`)
            .then(response => response.json());

    getAllStarSystems = (): Promise<StarSystemsResponseDto> =>
        fetch(`${this.esiEndpoint}/latest/universe/systems/`)
            .then(response => response.json());

    getStarSystemWithId = (id: number): Promise<StarSystemResponseDto> =>
        fetch(`${this.esiEndpoint}/latest/universe/systems/${id}/`)
            .then(response => response.json());

    getStargateWithId = (id: number): Promise<StargateResponseDto> =>
        fetch(`${this.esiEndpoint}/latest/universe/stargates/${id}/`)
            .then(response => response.json());
}

export default EsiDataServiceHttp;
