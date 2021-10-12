import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectDarkMode, setDarkMode } from "../../State/Settings/settingsSlice";

function DarkModeSwitch() {
    const { t } = useTranslation();

    const darkMode = useAppSelector(selectDarkMode);
    const dispatch = useAppDispatch();

    return (
        <Form.Switch checked={darkMode} onChange={event => dispatch(setDarkMode(event.target.checked))} label={t("settings_dark_mode")} />
    );
}

export default DarkModeSwitch;