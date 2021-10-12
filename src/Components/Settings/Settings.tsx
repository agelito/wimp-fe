import { Panel, Slider, Stack } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectFetchNumberOfJumps, setFetchNumberOfJumps } from "../../State/Settings/settingsSlice";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";

function Settings({ show, handleClose }: { show: boolean, handleClose: () => void }) {

    const { t } = useTranslation();

    const jumps = useAppSelector(selectFetchNumberOfJumps);
    const dispatch = useAppDispatch();

    return (/*
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{t("settings_title")}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formLanguageSelect">
                        <LanguageSelect />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formThemeSelect">
                        <DarkModeSwitch />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNumberOfJumpsSelect">
                        <Form.Label>{t("settings_jumpsWithCount", { count: jumps })}</Form.Label>
                        <Form.Range value={jumps} min={1} max={10} onChange={e => dispatch(setFetchNumberOfJumps(e.target.valueAsNumber))} />
                    </Form.Group>
                </Form>

            </Offcanvas.Body>
        </Offcanvas>*/
        <Panel
            headerText={t("settings_title")}
            isBlocking={false}
            isOpen={show}
            onDismiss={handleClose}
            closeButtonAriaLabel={t("button_close_aria_label")}
        >
            <Stack tokens={{ childrenGap: 8, padding: 4 }}>
                <LanguageSelect />
                <DarkModeSwitch />
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