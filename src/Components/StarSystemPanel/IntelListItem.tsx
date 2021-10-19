import { Stack, Image, ImageFit, Link, Text } from "@fluentui/react";
import { useMemo } from "react";
import { ReadIntelDto } from "../../Dtos/Wimp/ReadIntelDto";
import { useCharacterPortraitQuery } from "../../State/Characters/charactersSlice";
import ReactTimeAgo from "react-time-ago";
import { getDateUTC } from "../../Utils/DateUtils";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../State/hooks";
import { selectLanguage } from "../../State/Settings/settingsSlice";

interface Props {
    intel: ReadIntelDto
}

export const IntelListItem: React.FC<Props> = ({ intel }) => {
    const characterZKillLink = useMemo(() => `https://zkillboard.com/character/${intel.character.id}/`, [intel]);
    const { data } = useCharacterPortraitQuery({ characterId: intel.character.id });
    const date = useMemo(() => getDateUTC(new Date(intel.timestamp)), [intel]);
    const { t } = useTranslation();
    const language = useAppSelector(selectLanguage);

    return (
        <Stack tokens={{
            childrenGap: 6,
            padding: 0
        }}>
            <Stack horizontal tokens={{
                childrenGap: 10
            }}>
                <Stack disableShrink>
                    <Image
                        imageFit={ImageFit.contain}
                        src={data?.px64x64}
                        alt={intel.character.name}
                        width={64}
                        height={64}
                    />
                </Stack>
                <Stack grow>
                    <Stack grow>
                        <Link href={characterZKillLink} target={"_blank"}>
                            <Text variant={"large"}>{intel.character.name}</Text>
                        </Link>
                        {
                            intel.ship ?
                                <Text variant={"medium"}>{intel.ship.name}</Text> :
                                <Text variant={"medium"}>{t("intel_list_item_no_visual")}</Text>
                        }
                    </Stack>
                    <Stack horizontalAlign={"end"}>
                        <Text variant={"small"}>
                            <ReactTimeAgo date={date} locale={language} />
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    );
}