import React, { useEffect } from "react";
import { selectIsSignedIn } from "../../State/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { addPicture, useGetPictureQuery } from "../../State/Picture/pictureSlice";
import { ErrorAlert } from "../Alerts/ErrorAlert";

export const IntelPicture: React.FC = () => {
    const dispatch = useAppDispatch();

    const isSignedIn = useAppSelector(selectIsSignedIn);

    const { data, error } = useGetPictureQuery({}, {
        skip: !isSignedIn,
        pollingInterval: 3000,
    });

    useEffect(() => {
        if (!data) return;

        dispatch(addPicture(data));
    }, [data, dispatch]);

    return error ? <ErrorAlert messageId={"intel_picture_fetch_error_description"} /> : <></>;
}