import { CommandBar, DefaultEffects, IStackStyles, Stack, Text, useTheme } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../State/hooks";
import { setShowSettings } from "../../State/Settings/settingsSlice";

function MainNavigationBar() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const theme = useTheme();

    const mainNavigationBarContainerStyle: IStackStyles = {
        root: {
            background: theme.palette.white,
            boxShadow: DefaultEffects.elevation4,
            color: theme.palette.neutralPrimary,
        },
    };

    return (
        <>
            <Stack horizontal styles={mainNavigationBarContainerStyle} tokens={{ childrenGap: 16, padding: 8 }}>
                <Stack horizontalAlign={"start"} verticalAlign={"center"}>
                    <Text nowrap block variant={"xLarge"}>
                        {t("application_name")}
                    </Text>
                </Stack>
                <Stack grow horizontalAlign={"end"}>
                    <CommandBar items={[{
                        key: 'settings',
                        text: t("button_settings"),
                        iconProps: { iconName: 'Settings' },
                        onClick: () => {
                            dispatch(setShowSettings(true));
                        }
                    }]} />
                </Stack>
            </Stack>

        </>
    );
}

export default MainNavigationBar;