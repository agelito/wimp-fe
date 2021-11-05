import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../State/hooks";
import { selectPicture } from "../../State/Picture/pictureSlice";
import { selectUniverse } from "../../State/Universe/universeSlice";
import { distinct } from "../../Utils/Distinct";

export const DesktopNotifications: React.FC = () => {
    const { newIntelEntries, movedIntelEntries } = useAppSelector(selectPicture);
    const { starSystems } = useAppSelector(selectUniverse);

    const { t } = useTranslation();

    const focusWindow = useCallback(() => {
        window.parent.focus();
        window.focus();
    }, []);

    useEffect(() => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (!newIntelEntries?.length) return;

        const newIntelCandidates = newIntelEntries.filter(i => starSystems.findIndex(s => s.systemId === i.starSystem?.id) !== -1);
        if (!newIntelCandidates.length) return;

        if (Notification.permission !== "granted") {
            console.error(`Trying to use notifications without appropriate permissions.`);
            return;
        }

        const systems = newIntelCandidates.map(i => i.starSystem?.name);
        const uniqueSystems = systems.filter(distinct);
        const joinedSystems = uniqueSystems.join(", ");

        const characters = newIntelCandidates.map(i => i.character?.name);
        const uniqueCharacters = characters.filter(distinct);
        const joinedCharacters = uniqueCharacters.join(", ");

        const MANY_SYSTEMS = 2;
        const MANY_CHARACTERS = 4;

        var message = ``;
        if (uniqueSystems.length > MANY_SYSTEMS && uniqueCharacters.length > MANY_CHARACTERS) {
            message = t(`new_intel_notification_message_multiple`, { character_count: uniqueCharacters.length, system_count: uniqueSystems.length });
        } else if (uniqueSystems.length > MANY_SYSTEMS) {
            message = t(`new_intel_notification_message_multiple_systems`, { characters: joinedCharacters, system_count: uniqueSystems.length });
        } else if (uniqueCharacters.length > MANY_CHARACTERS) {
            message = t(`new_intel_notification_message_multiple_characters`, { systems: joinedSystems, character_count: uniqueCharacters.length });
        } else {
            message = t(`new_intel_notification_message`, { characters: joinedCharacters, systems: joinedSystems });
        }

        var notification = new Notification(
            t(`new_intel_notification_title`),
            {
                body: message,
            }
        );
        notification.onclick = function () {
            focusWindow();
            this.close();
        };
    }, [focusWindow, newIntelEntries, starSystems, t]);

    useEffect(() => {
        if (!movedIntelEntries?.length) return;

        const movedIntelCandidates = movedIntelEntries.filter(i => starSystems.findIndex(s => s.systemId === i.starSystem?.id) !== -1);
        if (!movedIntelCandidates.length) return;

        if (Notification.permission !== "granted") {
            console.error(`Trying to use notifications without appropriate permissions.`);
            return;
        }

        var message = movedIntelCandidates
            .map(i => t(`moved_intel_notification_message`, { character: i.character.name, system: i.starSystem.name }))
            .join(`\n`);

        var notification = new Notification(
            t(`moved_intel_notification_title`),
            {
                body: message,
            }
        );
        notification.onclick = function () {
            focusWindow();
            this.close();
        };

    }, [focusWindow, movedIntelEntries, starSystems, t]);

    return <></>;
}