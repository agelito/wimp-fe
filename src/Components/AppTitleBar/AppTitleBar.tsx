import { IconButton, Stack, Text, useTheme } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../State/hooks";
import { toggleShowSettings } from "../../State/Settings/settingsSlice";
import "./AppTitleBar.css";

export const AppTitleBar: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const theme = useTheme();

    return (
        <Stack horizontal horizontalAlign={"center"} tokens={{ padding: 2 }}>
            <Stack disableShrink horizontal horizontalAlign={"start"}>
                <IconButton
                    iconProps={{ iconName: "GlobalNavButton" }}
                    title={t("appbar_settings")}
                    ariaLabel={t("appbar_settings")}
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
                    onClick={() => {
                        dispatch(toggleShowSettings());
                    }}
                />
            </Stack>
            <Stack horizontal grow horizontalAlign={"center"} className={"dragged"} tokens={{ childrenGap: 0, padding: 6 }}>
                <Text nowrap block variant={"medium"}>
                    {t("application_name")}
                </Text>
            </Stack>
            <Stack disableShrink horizontal horizontalAlign={"end"}>
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
        </Stack>
    );
};