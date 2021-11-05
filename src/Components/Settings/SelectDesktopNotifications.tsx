import { Toggle } from "@fluentui/react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectDesktopNotifications, setDesktopNotifications } from "../../State/Settings/settingsSlice";

export const SelectDesktopNotifications: React.FC = () => {
    const { t } = useTranslation();
    const desktopNotifications = useAppSelector(selectDesktopNotifications);
    const dispatch = useAppDispatch();

    const unsupported = useMemo(() => !('Notification' in window), []);

    const [error, setError] = useState(false);

    const onChange = useCallback(async (_, value) => {
        setError(false);

        if (!value) {
            dispatch(setDesktopNotifications(false));
            return;
        }

        if (Notification.permission === "granted") {
            dispatch(setDesktopNotifications(true));
            return;
        }

        const result = await Notification.requestPermission();
        if (result === "granted") {
            dispatch(setDesktopNotifications(true));
        } else {
            setError(true);
        }
    }, [dispatch]);

    return (
        <>
            <Toggle
                label={t(`settings_enable_notifications`)}
                disabled={unsupported}
                checked={desktopNotifications}
                onText={t(`toggle_on`)}
                offText={t(`toggle_off`)}
                onChange={onChange}
                role="checkbox"
            />
            {error ? <></> : <></>}
        </>
    );
}