import { useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectLanguage, setLanguage } from "../../State/Settings/settingsSlice";

export const LanguageSelect = () => {

    const { t, i18n } = useTranslation();

    const language = useAppSelector(selectLanguage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLanguage(event.target.value));
    };

    return (
        <FloatingLabel controlId="languageSelect" label={t("settings_language")}>
            <Form.Select value={language} onChange={handleLanguageChange} aria-label={t("settings_language_aria")}>
                <option value="en">{t("language_english")}</option>
                <option value="se">{t("language_swedish")}</option>
            </Form.Select>
        </FloatingLabel>
    );
};