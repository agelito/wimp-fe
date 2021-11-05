
export interface SoundEffect {
    label_id: string;
    src: string;
}

export const NotificationSoundEffects: SoundEffect[] = [
    { label_id: `notification_alarm_tone`, src: `audio/alarm-tone.mp3` },
    { label_id: `notification_door_bell`, src: `audio/cartoon-door-melodic-bell.mp3` },
    { label_id: `notification_short_alarm`, src: `audio/classic-short-alarm.mp3` },
    { label_id: `notification_confirmation_tone`, src: `audio/confirmation-tone.mp3` },
    { label_id: `notification_sci_fi_beep`, src: `audio/fast-sci-fi-bleep.mp3` },
    { label_id: `notification_sci_fi_error`, src: `audio/sci-fi-error-alert.mp3` },
    { label_id: `notification_sci_fi_notification`, src: `audio/sci-fi-reject-notification.mp3` },
    { label_id: `notification_sci_fi_robot`, src: `audio/sci-fi-robot-voice.mp3` },
    { label_id: `notification_synth_notification`, src: `audio/synth-mechanical-notification-or-alert.mp3` },
]