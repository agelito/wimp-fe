import { useTheme, Text } from '@fluentui/react';
import { DefaultEffects } from '@fluentui/style-utilities';
import React, { useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useAppSelector } from '../../State/hooks';
import { ReportedIntelLabel } from './ReportedIntelLabel/ReportedIntelLabel';
import { SystemData } from './UniverseMap';
import "./MapNode.css";
import { interpolateRgbBasis } from "d3-interpolate";
import { getCurrentDateUTC } from '../../Utils/DateUtils';
import { RadialProgressIndicator } from '../ProgressIndicator/RadialProgressIndicator';
import { useIntelInSystem } from '../../Hooks/Intel/useIntelInSystem';
import { selectLocatedAtSystemId, selectSelectedSystemId } from '../../State/Universe/universeSlice';

interface Props {
    data: SystemData
    style?: React.CSSProperties
}

const MapNode: React.FC<Props> = ({ data, style }) => {
    const selectedSystemId = useAppSelector(selectSelectedSystemId);
    const locatedAtSystemId = useAppSelector(selectLocatedAtSystemId);

    const isLocatedAt = useMemo(() => locatedAtSystemId === data.systemId, [data.systemId, locatedAtSystemId]);
    const isSelected = useMemo(() => selectedSystemId === data.systemId, [data.systemId, selectedSystemId]);

    const theme = useTheme();

    const { intelInSystemSinceClear } = useIntelInSystem({ systemId: data.systemId });

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

    const [threatInterpolationValue, setThreatInterpolationValue] = useState<number>(0.0);

    useEffect(() => {
        if (!mostRecentIntelSinceClear) {
            setThreatInterpolationValue(0.0);
            return;
        }

        const interval = setInterval(() => {
            const currentEveTime = getCurrentDateUTC().getTime();
            const mostRecentTimestamp = Date.parse(mostRecentIntelSinceClear.timestamp);
            const threatFadeAwayInSeconds = 15 * 60; // 15 minutes

            const secondsSinceRecentInSystem = (currentEveTime - mostRecentTimestamp) / 1000.0;

            setThreatInterpolationValue(1.0 - (secondsSinceRecentInSystem / threatFadeAwayInSeconds));
        }, 500);

        return () => {
            clearInterval(interval);
        }

    }, [mostRecentIntelSinceClear]);

    const warningColor = useMemo(() => warningColorInterpolation(threatInterpolationValue), [threatInterpolationValue, warningColorInterpolation]);

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
                        {intelInSystemSinceClear.length ? <RadialProgressIndicator percentage={threatInterpolationValue * 100} style={{ inset: "2px" }} /> : undefined}
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
