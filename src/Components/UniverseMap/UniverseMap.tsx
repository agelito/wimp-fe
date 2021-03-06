import ReactFlow, { Controls, Edge, Node } from "react-flow-renderer";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3-force";
import * as d3 from "d3";
import { deselectSystem, moveToSystem, selectSelectedSystemId, selectSystem, setStarSystems, useGetUniverseGraphWithinJumpsQuery } from "../../State/Universe/universeSlice";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapNode from "./MapNode";
import { LoadingData } from "./LoadingData";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { ErrorAlert } from "../Alerts/ErrorAlert";
import { Stack } from "@fluentui/react";

export type SystemData = {
    systemId: number,
    systemName: string,
}

type GraphState = {
    nodes: GraphNode[],
    edges: GraphEdge[],
};

type GraphNode = Node<SystemData> & SimulationNodeDatum;
type GraphEdge = Edge;

type GraphNodeEdge = GraphNode | GraphEdge;

function UniverseMap({ systemId, mapSize }: { systemId: number, mapSize: number }) {
    const dispatch = useAppDispatch();
    const selectedSystemId = useAppSelector(selectSelectedSystemId);

    const { data, isLoading, error } = useGetUniverseGraphWithinJumpsQuery({ systemId, jumps: mapSize });

    const positionLookupTable = useMemo<Map<number, { x: number, y: number }>>(() => new Map(), []);

    const [graphVisualState, setGraphVisualState] = useState<GraphState>();

    useEffect(() => {
        dispatch(setStarSystems(data?.systems ?? []));
    }, [data, dispatch]);

    const graphSimulationState = useMemo(() => {
        if (!data) return;

        const nodes = data?.systems.flatMap<GraphNode>(s => {
            const position = positionLookupTable.get(s.systemId);

            var node: GraphNode = {
                id: `${s.systemId}`,
                type: "mapNode",
                data: { ...s },
                position: {
                    x: (position?.x ?? 0) * 3,
                    y: (position?.y ?? 0) * 3,
                },
                x: position?.x ?? 0,
                y: position?.y ?? 0,
            }

            return node;
        });

        const edges = data.edges.flatMap<SimulationLinkDatum<SimulationNodeDatum>>(e => {
            return { source: `${e.sourceSystemId}`, target: `${e.destinationSystemId}` };
        });

        return {
            nodes,
            edges
        };
    }, [data, positionLookupTable]);

    const visualEdgesReference = useRef<GraphEdge[]>();

    // NOTE: Create the visual edges and assign to visual edges ref.
    useEffect(() => {
        if (!data) return;

        var edges = data.edges.flatMap<GraphEdge>(e => {
            return { id: `e${e.sourceSystemId}-${e.destinationSystemId}`, source: `${e.sourceSystemId}`, target: `${e.destinationSystemId}`, animated: false, type: 'straight' };
        });

        visualEdgesReference.current = edges;
    }, [data]);

    const graphNodesAndEdges = useMemo<GraphNodeEdge[]>(() => {
        if (!graphVisualState) return [];
        return [...graphVisualState.nodes, ...graphVisualState.edges];
    }, [graphVisualState]);

    const simulation = useMemo(() => {
        console.log(`starting graph simulation`);
        const simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(0, 0))
            .force("link", d3.forceLink()
                .id(n => (n as any).id));

        return simulation;
    }, []);

    useEffect(() => {
        if (!simulation) return;

        simulation.on('tick', () => {
            const nodes = simulation.nodes() as GraphNode[];

            nodes.forEach(gn => {
                const position = {
                    x: (gn?.x ?? 0),
                    y: (gn?.y ?? 0)
                };

                positionLookupTable.set(Number(gn.id), position);

                gn.position = {
                    x: position.x * 3,
                    y: position.y * 3
                };
            });

            if (visualEdgesReference.current) {
                setGraphVisualState({
                    nodes,
                    edges: visualEdgesReference.current,
                });
            }
        });

        return () => {
            console.log(`stop simulation`);
            simulation.stop();
        }

    }, [positionLookupTable, simulation]);

    useEffect(() => {
        console.log(`updating graph simulation`);
        if (!graphSimulationState) return;
        if (!simulation) return;

        try {
            simulation.nodes(graphSimulationState.nodes);
            (simulation.force('link') as d3.ForceLink<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>>)
                .links(graphSimulationState.edges);

            simulation.alpha(1.0);
            simulation.restart();
        } catch (e) {
            console.error(e);
        }
    }, [graphSimulationState, simulation]);

    const onLoadReactFlow = useCallback(reactFlowInstance => {
        reactFlowInstance.fitView();
    }, []);

    const handleElementClicked = useCallback((e: React.MouseEvent<Element, MouseEvent>, element: GraphNodeEdge) => {
        if (element.data) {
            if (e.getModifierState("Control")) {
                dispatch(moveToSystem(element.data.systemId));
            } else {
                if (selectedSystemId === element.data.systemId) {
                    dispatch(deselectSystem());
                } else {
                    dispatch(selectSystem(element.data));
                }
            }
        }
    }, [dispatch, selectedSystemId]);


    return (
        error ?
            <ErrorAlert messageId={"universe_map_fetch_error_description"} /> :
            <Stack grow verticalAlign={"center"} horizontalAlign={"center"} style={{ height: "100%" }}>
                {
                    isLoading ? <LoadingData /> :
                        <ReactFlow
                            elements={graphNodesAndEdges}
                            nodeTypes={{ mapNode: MapNode }}
                            elementsSelectable={false}
                            nodesConnectable={false}
                            nodesDraggable={false}
                            onElementClick={handleElementClicked}
                            onLoad={onLoadReactFlow}
                        >
                            <Controls showInteractive={false} />
                        </ReactFlow >
                }
            </Stack>
    );
}

export default UniverseMap;