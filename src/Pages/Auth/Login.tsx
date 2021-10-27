import { FontWeights, mergeStyleSets, Modal, PrimaryButton, Spinner, SpinnerSize, Stack, TextField, useTheme } from '@fluentui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useLoginMutation } from '../../State/Auth/authSlice';

function Login() {
    const theme = useTheme();
    const { t } = useTranslation();

    const [isOpen] = useState(true);

    const [username, setUsername] = useState<string>(``);
    const [password, setPassword] = useState<string>(``);

    const [login, { isLoading, error }] = useLoginMutation();

    const history = useHistory();

    const loginStyles = mergeStyleSets({
        page: {
            background: theme.palette.neutralTertiary,
            height: "100%",
        },
        container: {
            display: `flex`,
            flexFlow: `column nowrap`,
            alignItems: `stretch`
        },
        header: [
            theme.fonts.xLarge,
            {
                flex: '1 1 auto',
                borderTop: `4px solid ${theme.palette.themePrimary}`,
                color: theme.palette.neutralPrimary,
                display: 'flex',
                alignItems: 'center',
                fontWeight: FontWeights.semibold,
                padding: '12px 12px 14px 24px',
            }
        ],
        body: {
            flex: `4 4 auto`,
            padding: `0 16px 16px 16px`
        }
    });

    const readyToSignIn = useMemo(() => {
        return username?.length && password?.length;
    }, [username, password]);

    const onLoginClick = useCallback(() => {
        login({
            username,
            password
        }).then(() => {
            history.replace(`/`);
        });
    }, [login, username, password, history]);

    const errorMessage = useMemo(() => {
        if (!error) return undefined;

        if ((error as FetchBaseQueryError).status === 401) {
            return t(`login_error_invalid_username_or_password`);
        } else {
            return t(`login_error_generic`);
        }
    }, [error, t]);

    return (
        <Stack grow className={loginStyles.page}>
            <Modal
                titleAriaId={t(`login_title_aria`)}
                isOpen={isOpen}
                isModeless={true}
                isBlocking={false}
                containerClassName={loginStyles.container}
            >
                <div className={loginStyles.header}>
                    <span>{t(`login_title`)}</span>
                </div>
                <div className={loginStyles.body}>
                    <Stack tokens={{ childrenGap: 16, padding: 0 }}>
                        <Stack tokens={{ childrenGap: 8, padding: 0 }}>
                            <TextField
                                name={"username"}
                                value={username}
                                label={t(`login_username_label`)}
                                placeholder={t(`login_username_placeholder`)}
                                required iconProps={{ iconName: `People` }}
                                onChange={(_, value) => setUsername(value ?? ``)} />
                            <TextField
                                name={"password"}
                                value={password}
                                label={t(`login_password_label`)}
                                placeholder={t(`login_password_placeholder`)}
                                required
                                type="password"
                                canRevealPassword
                                revealPasswordAriaLabel={t(`login_password_reveal_aria`)}
                                onChange={(_, value) => setPassword(value ?? ``)}
                                errorMessage={errorMessage} />
                        </Stack>
                        <Stack horizontal horizontalAlign={"end"}>
                            {!isLoading ? <PrimaryButton
                                type="submit"
                                disabled={!readyToSignIn}
                                text={t('login_submit_button')}
                                onClick={onLoginClick} /> : <Spinner size={SpinnerSize.medium} />}

                        </Stack>
                    </Stack>
                </div>
            </Modal>
        </Stack>
    );
}

export default Login;