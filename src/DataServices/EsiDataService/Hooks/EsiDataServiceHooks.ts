import { useEffect, useState } from "react";
import { ConstellationResponseDto, ConstellationsResponseDto, StargateResponseDto, StarSystemResponseDto, StarSystemsResponseDto } from "../../../Dtos/Esi";
import { useEsiDataService } from "./EsiDataServiceProvider";

export const useAllConstellations = () => {
    const [data, setData] = useState<ConstellationsResponseDto>();
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const { service } = useEsiDataService();

    useEffect(() => {
        setFetching(true);

        service!.getAllConstellations()
            .then(constellations => setData(constellations))
            .catch(reason => setError(reason))
            .finally(() => setFetching(false));

    }, [service]);

    return { data, fetching, error };
}

export const useConstellationWithId = (id: number) => {
    const [data, setData] = useState<ConstellationResponseDto>();
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const { service } = useEsiDataService();

    useEffect(() => {
        setFetching(true);

        service!.getConstellationWithId(id)
            .then(constellation => setData(constellation))
            .catch(reason => setError(reason))
            .finally(() => setFetching(false));

    }, [id, service]);

    return { data, fetching, error };
}

export const useAllStarSystems = () => {
    const [data, setData] = useState<StarSystemsResponseDto>();
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const { service } = useEsiDataService();

    useEffect(() => {
        setFetching(true);

        service!.getAllStarSystems()
            .then(starSystems => setData(starSystems))
            .catch(reason => setError(reason))
            .finally(() => setFetching(false));

    }, [service]);

    return { data, fetching, error };
};

export const useStarSystemWithId = (id: number) => {
    const [data, setData] = useState<StarSystemResponseDto>();
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const { service } = useEsiDataService();

    useEffect(() => {
        setFetching(true);

        service!.getStarSystemWithId(id)
            .then(starSystem => setData(starSystem))
            .catch(reason => setError(reason))
            .finally(() => setFetching(false));

    }, [id, service]);

    return { data, fetching, error };
};

export const useStargateWithId = (id: number) => {
    const [data, setData] = useState<StargateResponseDto>();
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const { service } = useEsiDataService();

    useEffect(() => {
        setFetching(true);

        service!.getStargateWithId(id)
            .then(stargate => setData(stargate))
            .catch(reason => setError(reason))
            .finally(() => setFetching(false));

    }, [id, service]);

    return { data, fetching, error };
}
