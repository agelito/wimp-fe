import { Toggle } from "@fluentui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectDarkMode, setDarkMode } from "../../State/Settings/settingsSlice";

function DarkModeSwitch() {
    const { t } = useTranslation();

    const darkMode = useAppSelector(selectDarkMode);
    const dispatch = useAppDispatch();

    const onChange = useCallback((_, checked?: boolean) => {
        dispatch(setDarkMode(checked ?? false))
    }, [dispatch])

    return (
        <Toggle
            label={t("settings_dark_mode")}
            defaultChecked={darkMode}
            onText={t("toggle_on")}
            offText={t("toggle_off")}
            onChange={onChange}
            role="checkbox" />
    );
}

export default DarkModeSwitch;