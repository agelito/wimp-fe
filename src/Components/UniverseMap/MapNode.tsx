import { useTheme, Text } from '@fluentui/react';
import { DefaultEffects } from '@fluentui/style-utilities';
import React, { useMemo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useAppSelector } from '../../State/hooks';
import { selectLocatedAtSystemId, selectSelectedSystemId } from '../../State/Universe/universeSlice';
import { ReportedIntelLabel } from './ReportedIntelLabel/ReportedIntelLabel';
import { SystemData } from './UniverseMap';
import "./MapNode.css";
import { selectIntelForSystem, selectPicture } from '../../State/Picture/pictureSlice';
import { interpolateRgbBasis } from "d3-interpolate";
import { getCurrentDateUTC } from '../../Utils/DateUtils';

interface Props {
    data: SystemData
    style?: React.CSSProperties
}

const MapNode: React.FC<Props> = ({ data, style }) => {
    const selectedSystemId = useAppSelector(selectSelectedSystemId);
    const locatedAtSystemId = useAppSelector(selectLocatedAtSystemId);
    const intelPicture = useAppSelector(selectPicture);

    const isLocatedAt = useMemo(() => locatedAtSystemId === data.systemId, [data.systemId, locatedAtSystemId]);
    const isSelected = useMemo(() => selectedSystemId === data.systemId, [data.systemId, selectedSystemId]);

    const theme = useTheme();

    const intelInSystem = useMemo(() => {
        if (!intelPicture) return [];
        return selectIntelForSystem(intelPicture, data.systemId)
            .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
    }, [data.systemId, intelPicture]);

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

    const nodeBackgroundColor = useMemo(() => {
        if (isSelected) {
            return theme.palette.neutralTertiaryAlt;
        } else if (isLocatedAt) {
            return theme.palette.neutralQuaternaryAlt;
        } else {
            return theme.palette.neutralQuaternary;
        }
    }, [isLocatedAt, isSelected, theme.palette.neutralQuaternary, theme.palette.neutralQuaternaryAlt, theme.palette.neutralTertiaryAlt]);

    const warningColorInterpolation = useMemo(() => {
        return interpolateRgbBasis([theme.palette.green, theme.palette.yellow, theme.palette.red]);
    }, [theme]);

    const mostRecentIntelSinceClear = useMemo(() => intelInSystemSinceClear[0], [intelInSystemSinceClear]);

    const warningColor = useMemo(() => {
        if (mostRecentIntelSinceClear === undefined) {
            return warningColorInterpolation(0.0);
        }

        const currentEveTime = getCurrentDateUTC().getTime();
        const mostRecentTimestamp = Date.parse(mostRecentIntelSinceClear.timestamp);
        const threatFadeAwayInSeconds = 15 * 60; // 15 minutes

        const secondsSinceRecentInSystem = (currentEveTime - mostRecentTimestamp) / 1000.0;

        return warningColorInterpolation(1.0 - secondsSinceRecentInSystem / threatFadeAwayInSeconds);
    }, [mostRecentIntelSinceClear, warningColorInterpolation]);

    return (
        <>
            <div style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "transparent",
                position: "relative"
            }}>
                {isLocatedAt && <div className={"rotate-node"} style={{
                    inset: "-1.4px",
                    borderRadius: "50%",
                    borderColor: theme.palette.neutralPrimary,
                    borderStyle: "dotted",
                    borderWidth: "2px",
                    position: "absolute"
                }} />}
                <div style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: warningColor,
                    boxShadow: DefaultEffects.elevation16,
                }}>
                    <div style={{
                        inset: 3,
                        position: "absolute",
                        borderRadius: "50%",
                        backgroundColor: nodeBackgroundColor,
                        ...style
                    }}>
                        <ReportedIntelLabel reportedIntelCount={intelInSystemSinceClear.length} />
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Top}
                id="a"
                style={{ top: '30px', visibility: "hidden" }}
            />
            <Handle
                type="target"
                position={Position.Top}
                id="b"
                style={{ top: '30px', visibility: "hidden" }}
            />
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Text variant={"large"} styles={{
                    root: {
                        overflow: "visible",
                        textAlign: "center",
                    }
                }}>
                    {data.systemName}
                </Text>
            </div>
        </>
    );
};

export default MapNode;

// export default memo(({ data, style }): React.FC<Props> => {

// });