import { Spinner, SpinnerSize } from "@fluentui/react";
import React from "react";

interface Props {
};

export const LoadingData: React.FC<Props> = () => {

    return (
        <>
            <Spinner size={SpinnerSize.large} />
        </>
    )
};