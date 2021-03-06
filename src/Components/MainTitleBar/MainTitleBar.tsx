import { DefaultEffects, IconButton, IStackStyles, Stack, Text, useTheme } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { selectIsSignedIn } from "../../State/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectAudioNotifications, toggleShowSettings } from "../../State/Settings/settingsSlice";
import { AppWindowControls } from "../AppWindowControls/AppWindowControls";
import { AudioNotifications } from "../Intel/AudioNotifications";
import { LogoutButton } from "../User/LogoutButton";

function MainTitleBar() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const theme = useTheme();

    const isSignedIn = useAppSelector(selectIsSignedIn);
    const audioNotifications = useAppSelector(selectAudioNotifications);

    const mainNavigationBarContainerStyle: IStackStyles = {
        root: {
            background: theme.palette.white,
            boxShadow: DefaultEffects.elevation4,
            color: theme.palette.neutralPrimary,
        },
    };

    return (
        <Stack horizontal styles={mainNavigationBarContainerStyle}>
            <Stack horizontal grow tokens={{ childrenGap: 16, padding: 8 }}>
                <Stack disableShrink horizontal horizontalAlign={"start"} verticalAlign={"center"}>
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
                <Stack horizontal grow horizontalAlign={"center"} verticalAlign={"center"} className={"dragged"} tokens={{ childrenGap: 0, padding: 6 }}>
                    <Text nowrap block variant={"large"}>
                        {t("application_name")}
                    </Text>
                </Stack>
            </Stack>
            <Stack horizontal horizontalAlign={"end"} verticalAlign={"center"}>
                {audioNotifications && <AudioNotifications />}
                {isSignedIn && <LogoutButton />}
            </Stack>
            {process.env.REACT_APP_IS_ELECTRON && <Stack horizontal horizontalAlign={"end"}>
                <AppWindowControls />
            </Stack>}
        </Stack>
    );
}

export default MainTitleBar;