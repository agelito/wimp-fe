import { IconButton, Stack, useTheme } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import "./AppWindowControls.css";

export const AppWindowControls: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack horizontal disableShrink tokens={{ padding: 2 }}>
            <IconButton
                iconProps={{ iconName: "ChromeMinimize" }}
                title={t("appbar_minimize")}
                ariaLabel={t("appbar_minimize")}
                styles={{
                    rootHovered: {
                        backgroundColor: theme.palette.themeTertiary,
                        color: theme.palette.black
                    },
                    rootPressed: {
                        backgroundColor: theme.palette.themeSecondary,
                        color: theme.palette.black
                    },
                }}
            />
            <IconButton
                iconProps={{ iconName: "ChromeFullScreen" }}
                title={t("appbar_maximize")}
                ariaLabel={t("appbar_maximize")}
                styles={{
                    rootHovered: {
                        backgroundColor: theme.palette.themeTertiary,
                        color: theme.palette.black
                    },
                    rootPressed: {
                        backgroundColor: theme.palette.themeSecondary,
                        color: theme.palette.black
                    },
                }}
            />
            <IconButton
                iconProps={{ iconName: "ChromeClose" }}
                title={t("appbar_close")}
                ariaLabel={t("appbar_close")}
                styles={{
                    rootHovered: {
                        backgroundColor: theme.palette.redDark,
                        color: theme.palette.black
                    },
                    rootPressed: {
                        backgroundColor: theme.palette.red,
                        color: theme.palette.black
                    },
                }}
            />
        </Stack>
    );
};