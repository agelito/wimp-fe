import { CommandBar, DefaultEffects, IStackItemStyles, IStackStyles, Stack, Text, useTheme } from "@fluentui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Settings from "../Settings/Settings";
import { StarSystemPanel } from "../StarSystemPanel/StarSystemPanel";

function MainNavigationBar() {
    const { t } = useTranslation();

    const [settingsShow, setSettingsShow] = useState<boolean>(false);

    const theme = useTheme();

    const mainNavigationBarContainerStyle: IStackStyles = {
        root: {
            background: theme.palette.white,
            boxShadow: DefaultEffects.elevation4,
            color: theme.palette.neutralPrimary,
        },
    };
    const titleStackStyle: IStackItemStyles = {
        root: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: "start",
        },
    };

    const menuStackStyle: IStackItemStyles = {
        root: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: "end",
        },
    }

    return (
        <>
            <Stack horizontal styles={mainNavigationBarContainerStyle} tokens={{ childrenGap: 16, padding: 16 }}>
                <Stack.Item styles={titleStackStyle}>
                    <Text nowrap block variant={"xLarge"}>
                        {t("application_name")}
                    </Text>
                </Stack.Item>
                <Stack.Item grow styles={menuStackStyle}>
                    <CommandBar items={[{
                        key: 'settings',
                        text: t("button_settings"),
                        iconProps: { iconName: 'Settings' },
                        onClick: () => setSettingsShow(true),
                    }]} />
                </Stack.Item>
            </Stack>
            <Settings show={settingsShow} handleClose={() => setSettingsShow(false)} />
            <StarSystemPanel />
        </>
    );
}

export default MainNavigationBar;