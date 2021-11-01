import { mergeStyleSets, Stack, StackItem, Text, TextField, DefaultButton } from "@fluentui/react"
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiKeyGenerator } from "../../Components/IntelReporting/ApiKeyGenerator";
import { ChannelNamesTable } from "../../Components/IntelReporting/ChannelNamesTable";
import { useApiKeyQuery } from "../../State/Auth/authSlice";
import "./SetupIntelReporting.css";

const DEFAULT_LOG_DIRECTORY = `%USERPROFILE%\\Documents\\EVE\\logs\\Chatlogs`;

export const SetupIntelReporting: React.FC = () => {
    const styles = mergeStyleSets({
        container: {
            overflowY: "scroll",
            height: "100%",
            paddingBottom: 36,
        },
        guideStepHeading: {
            paddingTop: 24,
        },
        guideSubStepHeading: {
            paddingTop: 12,
        }
    });

    const { t } = useTranslation();

    const [intelLogDirectory, setIntelLogDirectory] = useState(DEFAULT_LOG_DIRECTORY);
    const [intelChannels, setIntelChannels] = useState<string[]>([`INTEL.RC`, `WOMP intel`]);
    const { data: apiKeyData } = useApiKeyQuery();

    const apiKey = useMemo(() => apiKeyData?.length ? apiKeyData[0].key : undefined, [apiKeyData])

    const fileInput = useRef<HTMLInputElement>(null);

    const determineIntelChannels = useCallback((fileList: FileList | null) => {
        var fileCount = fileList?.length;
        if (!fileList || !fileCount) {
            setIntelLogDirectory(DEFAULT_LOG_DIRECTORY);
            setIntelChannels([]);
            return;
        }

        var files = [];
        for (var i = 0; i < fileCount; ++i) {
            files[i] = fileList[i].name;
        }

        const distinct = (value: string, index: number, self: string[]) => {
            return self.indexOf(value) === index;
        };

        var intelChannelNames = files
            .map(file => file.split("_")[0]);

        var uniqeChannelNames = intelChannelNames
            .filter(distinct);

        setIntelChannels(uniqeChannelNames);
    }, []);

    const generatedConfiguration = useMemo(() => {
        const options = {
            EveLogDirectory: intelLogDirectory,
            IntelChannelNames: intelChannels,
            IntelEndpoint: `${window.location.origin}/api/intel/`,
            IntelApiKey: apiKey ?? ``,
        };

        return JSON.stringify(options, null, 2);
    }, [apiKey, intelChannels, intelLogDirectory]);

    return (
        <Stack
            grow
            tokens={{ childrenGap: 16, padding: 16 }}
            className={styles.container}>

            <Text variant={"xLargePlus"}>{t(`intel_reporting_title`)}</Text>
            <Text>{t(`intel_reporting_setup_0`)}</Text>

            <Text className={styles.guideStepHeading} variant={"large"}>{t(`intel_reporting_1_title`)}</Text>
            <Text>{t(`intel_reporting_1_1`)}</Text>
            {!apiKey && <Text>{t(`intel_reporting_1_2`)}</Text>}
            <ApiKeyGenerator />
            <Text className={styles.guideStepHeading} variant={"large"}>{t(`intel_reporting_2_title`)}</Text>
            <Text>{t(`intel_reporting_2_1`)}</Text>
            <Text>{t(`intel_reporting_2_2`)}</Text>
            <Stack horizontal>
                <DefaultButton text={t(`wimp_intellog_download`)} target="_blank" href="https://github.com/agelito/wimp-intellog/releases/latest" />
            </Stack>
            <Text>{t(`intel_reporting_2_3`)}</Text>
            <Text className={styles.guideStepHeading} variant={"large"}>{t(`intel_reporting_3_title`)}</Text>
            <Text>{t(`intel_reporting_3_1`)}</Text>
            <Text variant={"mediumPlus"} className={styles.guideSubStepHeading}>{t(`intel_reporting_3_2_title`)}</Text>
            <Text>{t(`intel_reporting_3_2`)}</Text>
            <StackItem>
                <TextField prefix={t(`log_directory`)} value={intelLogDirectory} onChange={(_, value) => setIntelLogDirectory(value ?? ``)} />
            </StackItem>
            <Text>{t(`intel_reporting_3_3`)}</Text>
            <StackItem>
                <DefaultButton text={t(`select_log_files_button`)} onClick={() => fileInput.current?.click()} />
                <input ref={fileInput} type="file" accept=".txt" multiple style={{ display: "none" }} onChange={(e) => determineIntelChannels(e.target.files)} />
            </StackItem>
            <StackItem>
                <ChannelNamesTable channelNames={intelChannels} />
            </StackItem>
            <Text variant={"mediumPlus"} className={styles.guideSubStepHeading}>{t(`intel_reporting_3_4_title`)}</Text>
            <Text>{t(`intel_reporting_3_4`)}</Text>
            <Stack horizontal>
                <StackItem style={{ minWidth: 360 }}>
                    <TextField label={t(`wimp_intellog_config_name`)} resizable={false} multiline autoAdjustHeight readOnly value={generatedConfiguration} />
                </StackItem>
            </Stack>
            <Text className={styles.guideStepHeading} variant={"large"}>{t(`intel_reporting_4_title`)}</Text>
            <Text>{t(`intel_reporting_4_1`)}</Text>
        </Stack>
    )
}