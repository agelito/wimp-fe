import { Dropdown, IDropdownOption, Stack, Toggle } from "@fluentui/react";
import { createRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectAudioNotifications, selectAudioNotificationSoundEffect, setAudioNotifications, setAudioNotificationSoundEffect } from "../../State/Settings/settingsSlice";
import { NotificationSoundEffects, SoundEffect } from "./NotificationSoundEffects";

export const SelectAudioNotifications: React.FC = () => {
    const { t } = useTranslation();
    const audioNotifications = useAppSelector(selectAudioNotifications);
    const audioNotificationSoundEffect = useAppSelector(selectAudioNotificationSoundEffect);
    const dispatch = useAppDispatch();

    const audioRef = createRef<HTMLAudioElement>();

    const onChange = useCallback((_, value) => {
        dispatch(setAudioNotifications(value));
    }, [dispatch]);

    const onSoundEffectChange = useCallback((_, value?: IDropdownOption<SoundEffect>) => {
        const soundEffect = value?.data ?? NotificationSoundEffects[0];

        dispatch(setAudioNotificationSoundEffect(soundEffect));

        if (audioRef.current) {
            audioRef.current.src = soundEffect.src;
            audioRef.current.play();
        }
    }, [audioRef, dispatch]);

    const audioEffectOptions = useMemo(() => {
        return NotificationSoundEffects.map(e => {
            return { key: e.label_id, text: t(e.label_id), data: e };
        })
    }, [t]);

    return (
        <Stack horizontal grow tokens={{ childrenGap: 16 }}>
            <Stack.Item>
                <Toggle
                    label={t(`settings_audio_notifications`)}
                    checked={audioNotifications}
                    onText={t(`toggle_on`)}
                    offText={t(`toggle_off`)}
                    onChange={onChange}
                    role="checkbox"
                />
            </Stack.Item>
            {audioNotifications &&
                <Stack.Item grow>
                    <Dropdown
                        label={t(`settings_audio_notification_sound_effect`)}
                        selectedKey={audioNotificationSoundEffect?.label_id}
                        onChange={onSoundEffectChange}
                        placeholder={t(`settings_select_sound_effect`)}
                        options={audioEffectOptions}
                    />
                    <audio ref={audioRef} />
                </Stack.Item>
            }
        </Stack>
    );
}