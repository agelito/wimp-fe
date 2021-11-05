import { Coachmark, DirectionalHint, IconButton, Stack, TeachingBubbleContent } from "@fluentui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../State/hooks";
import { selectPicture } from "../../State/Picture/pictureSlice";
import { selectUniverse } from "../../State/Universe/universeSlice";

export const AudioNotifications: React.FC = () => {
    const { newIntelEntries } = useAppSelector(selectPicture);
    const { starSystems } = useAppSelector(selectUniverse);

    const [muted, setMuted] = useState(true);

    const audio = useRef<HTMLAudioElement>(null);
    const button = useRef<HTMLDivElement>(null);

    const { t } = useTranslation();

    const [unmuteHintWasDisplayed, setUnmuteHintWasDisplayed] = useState(false);
    const [unmuteHintVisible, setUnmuteHintVisible] = useState(false);

    useEffect(() => {
        if (muted && !unmuteHintWasDisplayed) {
            setUnmuteHintVisible(true);
            setUnmuteHintWasDisplayed(true);
        }
    }, [muted, unmuteHintWasDisplayed]);

    useEffect(() => {
        if (!newIntelEntries?.length) return;

        const newIntelCandidates = newIntelEntries.filter(i => starSystems.findIndex(s => s.systemId === i.starSystem?.id) !== -1);
        if (!newIntelCandidates.length) return;

        if (!audio.current) return;

        audio.current.play();
    }, [audio, newIntelEntries, starSystems, t]);

    const toggleMute = useCallback(() => {
        if (muted) {
            setUnmuteHintVisible(false);
        }

        setMuted(!muted);
    }, [muted]);

    return (
        <Stack.Item>
            <>
                <div ref={button}>
                    <IconButton
                        title={t(`settings_audio_notifications`)}
                        iconProps={{
                            iconName: muted ? 'VolumeDisabled' : 'Volume3',
                        }}
                        onClick={() => toggleMute()}
                    />
                </div>
                <audio ref={audio} muted={muted} src={`audio/alarm-tone.mp3`} />
                {unmuteHintVisible && (
                    <Coachmark
                        target={button.current}
                        positioningContainerProps={{
                            directionalHint: DirectionalHint.bottomAutoEdge,
                        }}
                        ariaAlertText={t(`audio_notification_unmute_hint`)}
                    >
                        <TeachingBubbleContent
                            headline={t(`audio_notification_unmute_hint`)}
                            hasCloseButton
                            closeButtonAriaLabel={t(`button_close_aria_label`)}
                            onDismiss={() => setUnmuteHintVisible(false)}
                        >
                            {t(`audio_notification_unmute_description`)}
                        </TeachingBubbleContent>
                    </Coachmark>
                )}
            </>
        </Stack.Item>
    );
}