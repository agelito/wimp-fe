import EsiDataServiceHttp from "./EsiDataServiceHttp";

describe('EsiDataServiceHttp', () => {
    const sut = new EsiDataServiceHttp(`https://esi.evetech.net`);

    it('should get list of star systems', async () => {
        const systems = await sut.getAllStarSystems();
        expect(systems).toBeDefined();
        expect(systems.length).toBeGreaterThan(0);
    });

    it('should get a list of constellations', async () => {
        const constellations = await sut.getAllConstellations();
        expect(constellations).toBeDefined();
        expect(constellations.length).toBeGreaterThan(0);
    });

    it('should get a constellation', async () => {
        const constellation = await sut.getConstellationWithId(20000001);
        expect(constellation).toBeDefined();
        expect(constellation.name).toBe('San Matar');
    });

    it('should get star system', async () => {
        const starSystem = await sut.getStarSystemWithId(30000005);
        expect(starSystem).toBeDefined();
        expect(starSystem.name).toBe('Sasta');
    });

    it('should get a stargate', async () => {
        const stargate = await sut.getStargateWithId(50001739);
        expect(stargate).toBeDefined();
        expect(stargate.name).toBe('Stargate (Tanoo)');
    });
});

export { }