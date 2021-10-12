import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function LanguagePicker() {
    const { t, i18n } = useTranslation();

    return (
        <NavDropdown title={t("navbar_language")} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => i18n.changeLanguage("en")}>{t("language_english")}</NavDropdown.Item>
            <NavDropdown.Item onClick={() => i18n.changeLanguage("se")}>{t("language_swedish")}</NavDropdown.Item>
        </NavDropdown>
    );
}

export default LanguagePicker;