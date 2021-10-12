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

    return (
        <>
            <div className={`border-dark border rounded-circle`} style={{
                width: "60px",
                height: "60px",
                backgroundColor: isLocatedAt ? "lightseagreen" : (isSelected ? "lightskyblue" : "lightgreen"),
                ...style
            }}>
                <ReportedIntelLabel reportedIntelCount={data.reportedCount ?? 0} />
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
            <div style={{ overflow: "visible", textAlign: "center" }}>
                {data.systemName}
            </div>
        </>
    );
};

export default MapNode;

// export default memo(({ data, style }): React.FC<Props> => {

// });