import React from "react";
import { Spinner } from "react-bootstrap";

interface Props {
};

export const LoadingData: React.FC<Props> = () => {

    return (
        <>
            <Spinner animation="grow" />
        </>
    )
};