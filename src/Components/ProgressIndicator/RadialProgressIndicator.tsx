import React, { CSSProperties } from "react";
import { Circle } from "rc-progress";
import { useTheme } from "@fluentui/react";

interface Props {
    style?: CSSProperties
    percentage: number,
};

export const RadialProgressIndicator: React.FC<Props> = ({ style, percentage }) => {

    const theme = useTheme();

    return (
        <div style={{ position: "absolute", ...style }}>
            <Circle percent={percentage} strokeLinecap={"round"} strokeWidth={4} strokeColor={theme.palette.neutralPrimary} trailColor="transparent" />
        </div>);
}