import { useTheme, Text } from '@fluentui/react';
import { DefaultEffects } from '@fluentui/style-utilities';
import React, { useMemo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useAppSelector } from '../../State/hooks';
import { selectLocatedAtSystemId, selectSelectedSystemId } from '../../State/Universe/universeSlice';
import { ReportedIntelLabel } from './ReportedIntelLabel/ReportedIntelLabel';
import { SystemData } from './UniverseMap';

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

    const nodeBackgroundColor = useMemo(() => {
        if (isSelected) {
            return theme.palette.neutralTertiaryAlt;
        } else if (isLocatedAt) {
            return theme.palette.neutralQuaternaryAlt;
        } else {
            return theme.palette.neutralQuaternary;
        }
    }, [isLocatedAt, isSelected, theme.palette.neutralQuaternary, theme.palette.neutralQuaternaryAlt, theme.palette.neutralTertiaryAlt]);

    return (
        <>
            <div style={{
                width: "70px",
                height: "70px",
                borderRadius: "35px",
                backgroundColor: theme.palette.green,
                position: "relative",
                boxShadow: DefaultEffects.elevation16,
            }}>
                <div style={{
                    inset: 3,
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: nodeBackgroundColor,
                    ...style
                }}>
                    <ReportedIntelLabel reportedIntelCount={data.reportedCount ?? 0} />
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