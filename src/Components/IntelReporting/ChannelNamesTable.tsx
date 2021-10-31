import { useTranslation } from "react-i18next";

interface Props {
    channelNames: string[]
}

export const ChannelNamesTable: React.FC<Props> = ({ channelNames }) => {

    const { t } = useTranslation();

    return (
        <table>
            <tbody>
                {channelNames.map(ic => (
                    <tr key={ic}>
                        <th>{t(`intel_channel_name`)}</th>
                        <td>{ic}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}