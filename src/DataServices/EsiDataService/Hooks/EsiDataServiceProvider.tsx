import React, { createContext, useContext, useMemo } from "react";
import EsiDataServiceHttp from "../Http/EsiDataServiceHttp";
import IEsiDataService from "../IEsiDataService";

const EsiDataServiceProviderContext = createContext<{ service?: IEsiDataService }>({ service: undefined });

export const EsiDataServiceProvider = ({ children, esiEndpoint }: React.PropsWithChildren<{ esiEndpoint: string }>) => {
    const esiDataService = useMemo<IEsiDataService>(() => new EsiDataServiceHttp(esiEndpoint), [esiEndpoint]);

    return (
        <EsiDataServiceProviderContext.Provider value={{ service: esiDataService }}>
            {children}
        </EsiDataServiceProviderContext.Provider>
    );
}

export const useEsiDataService = () => useContext(EsiDataServiceProviderContext);
