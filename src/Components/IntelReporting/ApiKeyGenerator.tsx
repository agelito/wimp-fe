import { DefaultButton, IconButton, Spinner, SpinnerSize, Stack, StackItem, TextField } from "@fluentui/react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useApiKeyQuery, useCreateApiKeyMutation } from "../../State/Auth/authSlice";

export const ApiKeyGenerator: React.FC = () => {
    const { data: apiKeyData, isLoading } = useApiKeyQuery();
    const [createApiKey, { data: createdApiKey, isLoading: isCreating }] = useCreateApiKeyMutation();
    const apiKey = useMemo(() => apiKeyData?.length ? apiKeyData[0].key : (createdApiKey ? createdApiKey.key : undefined), [apiKeyData, createdApiKey])

    const { t } = useTranslation();

    const copyToClipboard = useCallback(() => {
        const listener = (e: ClipboardEvent) => {
            e.clipboardData?.setData('text/plain', apiKey ?? ``);
            e.preventDefault();
            document.removeEventListener('copy', listener);
        };
        document.addEventListener('copy', listener);
        document.execCommand('copy');
    }, [apiKey]);

    return (
        <Stack horizontal tokens={{ childrenGap: 4 }}>
            {isLoading || isCreating ? <Spinner size={SpinnerSize.medium} /> : (
                apiKey ?
                    <>
                        <StackItem>
                            <TextField
                                prefix={t(`api_key`)}
                                ariaLabel={t(`api_key`)}
                                value={apiKey}
                                readOnly
                            />
                        </StackItem>
                        <StackItem>
                            <IconButton
                                title={t(`copy_to_clipboard`)}
                                iconProps={{ iconName: `Copy` }}
                                onClick={() => { copyToClipboard(); }}
                            />
                        </StackItem>
                    </> :
                    <StackItem>
                        <DefaultButton
                            text={t(`api_key_create`)}
                            onClick={() => createApiKey()}
                        />
                    </StackItem>
            )}
        </Stack>
    );
}