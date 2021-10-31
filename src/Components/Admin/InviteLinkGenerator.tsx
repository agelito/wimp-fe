import { Callout, IconButton, Spinner, SpinnerSize, Stack, StackItem, Target, Text, TextField } from "@fluentui/react";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useInviteMutation } from "../../State/Admin/adminSlice";

interface Props {
    target?: Target;
    onDismiss: () => void;
}

export const InviteLinkGenerator: React.FC<Props> = ({ target, onDismiss }) => {

    const { t } = useTranslation();
    const [invite, { isLoading, data, error }] = useInviteMutation();

    const registerLink = useMemo(() => {
        return `${window.location.origin}/register?inviteKey=${data?.key}`
    }, [data]);

    useEffect(() => {
        invite();
    }, [invite]);

    const copyToClipboard = useCallback(() => {
        const listener = (e: ClipboardEvent) => {
            e.clipboardData?.setData('text/plain', registerLink);
            e.preventDefault();
            document.removeEventListener('copy', listener);
        };
        document.addEventListener('copy', listener);
        document.execCommand('copy');
    }, [registerLink]);

    return (
        <Callout
            gapSpace={0}
            target={target}
            onDismiss={() => onDismiss()}
            setInitialFocus
            style={{
                width: 320,
                maxWidth: `90%`,
                padding: `20px 24px`,
            }}
        >
            <Stack tokens={{ childrenGap: 8 }}>
                <Text block variant="xLarge">
                    {t(`invite_link_title`)}
                </Text>
                <Text block variant="small">
                    {t(`invite_link_description`)}
                </Text>
                {isLoading ?
                    <Spinner size={SpinnerSize.medium} /> :
                    error ? t(`invite_link_error`) :
                        <Stack horizontal tokens={{ childrenGap: 4 }} verticalAlign="center">
                            <StackItem grow>
                                <TextField readOnly defaultValue={registerLink} />
                            </StackItem>
                            <StackItem>
                                <IconButton
                                    title={`copy_to_clipboard`}
                                    iconProps={{ iconName: `Copy` }}
                                    onClick={() => { copyToClipboard() }}
                                />
                            </StackItem>
                        </Stack>
                }
            </Stack>
        </Callout >
    );
};
