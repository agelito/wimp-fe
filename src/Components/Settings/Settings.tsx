import { Panel, PanelType, Slider, Stack } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectFetchNumberOfJumps, setFetchNumberOfJumps } from "../../State/Settings/settingsSlice";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import { SelectTheme } from "../SelectTheme/SelectTheme";

function Settings({ show, handleClose }: { show: boolean, handleClose: () => void }) {

    const { t } = useTranslation();

    const jumps = useAppSelector(selectFetchNumberOfJumps);
    const dispatch = useAppDispatch();

    return (
        <Panel
            style={{ marginTop: 34 }}
            headerText={t("settings_title")}
            type={PanelType.customNear}
            customWidth={"360px"}
            isBlocking={false}
            isOpen={show}
            onDismiss={handleClose}
            closeButtonAriaLabel={t("button_close_aria_label")}
        >
            <Stack tokens={{ childrenGap: 8, padding: 4 }}>
                <LanguageSelect />
                <SelectTheme />
                <Slider
                    label={t("settings_map_size")}
                    min={1}
                    max={10}
                    value={jumps}
                    showValue
                    onChange={v => dispatch(setFetchNumberOfJumps(v))}
                />
            </Stack>
        </Panel>
    );
}

export default Settings;