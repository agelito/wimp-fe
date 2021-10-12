import Stargate from "./Stargate";
import StarSystem from "./StarSystem";

interface Universe {
    systems: Map<number, StarSystem>,
    stargates: Map<number, Stargate>
}

export default Universe;