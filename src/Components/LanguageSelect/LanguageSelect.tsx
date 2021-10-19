import { Dropdown, IDropdownOption } from "@fluentui/react";
import { FormEvent, useEffect } from "react";
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

    const handleLanguageChange = (_: FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
        if (!item) return;
        dispatch(setLanguage(item.id ?? 'en'));
    };

    const languageOptions = [
        { key: 'en', id: "en", text: t("language_english") },
        { key: 'sv', id: "sv", text: t("language_swedish") },
    ];

    return (
        <Dropdown
            label={t("settings_language")}
            selectedKey={language}
            onChange={handleLanguageChange}
            placeholder="settings_language_placeholder"
            options={languageOptions}
        />
    );
};