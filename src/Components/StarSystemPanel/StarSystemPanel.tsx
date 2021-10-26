import { Panel, Stack } from "@fluentui/react"
import { useTranslation } from "react-i18next";
import { useIntelInSystem } from "../../Hooks/Intel/useIntelInSystem";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { deselectSystem, selectSelectedSystem } from "../../State/Universe/universeSlice";
import { IntelListItem } from "./IntelListItem";

export const StarSystemPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedSystem = useAppSelector(selectSelectedSystem);

    const { t } = useTranslation();

    const { intelInSystemSinceClear } = useIntelInSystem({ systemId: selectedSystem?.systemId });

    return (
        <Panel
            style={{ marginTop: 56 }}
            headerText={selectedSystem?.systemName}
            isBlocking={false}
            isOpen={selectedSystem !== undefined}
            onDismiss={() => dispatch(deselectSystem())}
            closeButtonAriaLabel={t("button_close_aria_label")}
        >
            <Stack tokens={{ childrenGap: 8, padding: 4 }}>
                {intelInSystemSinceClear.map((intel) => <IntelListItem key={intel.id} intel={intel} />)}
            </Stack>
        </Panel>
    )
}