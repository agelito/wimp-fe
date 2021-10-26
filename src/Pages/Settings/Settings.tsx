import { Slider, Stack } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../../Components/LanguageSelect/LanguageSelect';
import { SelectTheme } from '../../Components/SelectTheme/SelectTheme';
import { useAppDispatch, useAppSelector } from '../../State/hooks';
import { selectFetchNumberOfJumps, setFetchNumberOfJumps } from '../../State/Settings/settingsSlice';

export const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const jumps = useAppSelector(selectFetchNumberOfJumps);

    return (
        <Stack
            grow
            styles={{
                root: {
                    maxWidth: 600
                }
            }}
            tokens={{ childrenGap: 16, padding: 16 }}>
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
    );
}

export default Settings;
