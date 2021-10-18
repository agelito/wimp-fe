import { useMemo } from "react";
import { useAppSelector } from "../../State/hooks";
import { selectIntelForSystem, selectPicture } from "../../State/Picture/pictureSlice";

interface Props {
    systemId?: number,
}

export const useIntelInSystem = ({ systemId }: Props) => {
    const intelPicture = useAppSelector(selectPicture);

    const intelInSystem = useMemo(() => {
        if (!intelPicture || !systemId) return [];
        return selectIntelForSystem(intelPicture, systemId)
            .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
    }, [systemId, intelPicture]);

    const intelInSystemSinceClear = useMemo(() => {
        const mostRecentClearIntel =
            intelInSystem.filter(i => i.isClear)[0];

        if (mostRecentClearIntel) {
            const clearTime = Date.parse(mostRecentClearIntel.timestamp);
            return intelInSystem.filter(i => Date.parse(i.timestamp) > clearTime);
        } else {
            return intelInSystem;
        }
    }, [intelInSystem])

    return {
        intelInSystem,
        intelInSystemSinceClear
    }
}