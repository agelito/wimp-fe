import { FontWeights, Link, mergeStyleSets, Modal, PrimaryButton, Spinner, SpinnerSize, Stack, TextField, useTheme, Text } from '@fluentui/react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useRegisterMutation } from '../../State/Auth/authSlice';

enum PasswordError {
    TooShort,
    NoUppercase,
    NoLowercase,
    NoDigit,
    NoSpecial
};

function checkPasswordStrength(password: string): PasswordError | boolean {
    if (!password) return true;

    // options.Password.RequireDigit = true;
    // options.Password.RequireLowercase = true;
    // options.Password.RequireNonAlphanumeric = true;
    // options.Password.RequireUppercase = true;
    // options.Password.RequiredLength = 6;
    // options.Password.RequiredUniqueChars = 1;

    const containsLowercase = /.*[a-z].*/.test(password);
    const containsUppercase = /.*[A-Z].*/.test(password);
    const containsNumber = /.*[0-9].*/.test(password);
    const containsSpecial = /[^a-zA-Z0-9]/.test(password);

    const length = password.length;

    if (length < 6) {
        return PasswordError.TooShort;
    } else if (!containsUppercase) {
        return PasswordError.NoUppercase;
    } else if (!containsLowercase) {
        return PasswordError.NoLowercase;
    } else if (!containsNumber) {
        return PasswordError.NoDigit;
    } else if (!containsSpecial) {
        return PasswordError.NoSpecial;
    }

    return true;
}

interface Props {
}

export const Register: React.FC<Props> = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    const [isOpen] = useState(true);

    const history = useHistory();
    const location = useLocation();

    const inviteKey = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get(`inviteKey`);
    }, [location]);

    const [username, setUsername] = useState<string>(``);
    const [password, setPassword] = useState<string>(``);
    const [confirmPassword, setConfirmPassword] = useState<string>(``);

    const [register, { isLoading, error }] = useRegisterMutation();

    const registerStyles = mergeStyleSets({
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
        return username && password && password === confirmPassword;
    }, [username, password, confirmPassword]);

    const onRegisterClick = useCallback(() => {
        register({
            username,
            password,
            invite_key: inviteKey ?? ``
        }).then(() => {
            history.push(`/`);
        });
    }, [register, username, password, inviteKey, history]);

    const validatePassword = useCallback((value: string) => {
        const result = checkPasswordStrength(value);
        if (result === PasswordError.NoUppercase) {
            return t(`register_error_password_uppercase`);
        } else if (result === PasswordError.NoSpecial) {
            return t(`register_error_password_special`);
        } else if (result === PasswordError.NoLowercase) {
            return t(`register_error_password_lowercase`);
        } else if (result === PasswordError.NoDigit) {
            return t(`register_error_password_digit`);
        } else if (result === PasswordError.TooShort) {
            return t(`register_error_password_short`);
        } else {
            return ``;
        }
    }, [t]);

    const validateConfirmPassword = useCallback((value: string) => {
        if (value && value !== password) {
            return t(`register_error_password_mismatch`);
        } else {
            return ``;
        }
    }, [password, t]);

    const passwordErrorMessage = useMemo(() => {
        if (!error) return undefined;

        return t(`register_error_generic`);
    }, [error, t]);

    return (
        <Stack grow className={registerStyles.page}>
            <Modal
                titleAriaId={t(`register_title_aria`)}
                isOpen={isOpen}
                isBlocking={true}
                containerClassName={registerStyles.container}
            >
                <div className={registerStyles.header}>
                    <span>{t(`register_title`)}</span>
                </div>
                <div className={registerStyles.body}>
                    <Stack tokens={{ childrenGap: 16, padding: 0 }}>
                        <Stack tokens={{ childrenGap: 8, padding: 0 }}>
                            <TextField
                                name={"username"}
                                value={username}
                                label={t(`register_username_label`)}
                                placeholder={t(`register_username_placeholder`)}
                                required iconProps={{ iconName: `People` }}
                                onChange={(_, value) => setUsername(value ?? ``)} />
                            <TextField
                                name={"password"}
                                value={password}
                                label={t(`register_password_label`)}
                                placeholder={t(`register_password_placeholder`)}
                                required
                                type="password"
                                canRevealPassword
                                revealPasswordAriaLabel={t(`register_password_reveal_aria`)}
                                onChange={(_, value) => setPassword(value ?? ``)}
                                onGetErrorMessage={validatePassword}
                                errorMessage={passwordErrorMessage} />
                            <TextField
                                name={"confirm_password"}
                                value={confirmPassword}
                                label={t(`register_confirm_password_label`)}
                                placeholder={t(`register_confirm_password_placeholder`)}
                                required
                                type="password"
                                canRevealPassword
                                revealPasswordAriaLabel={t(`register_password_reveal_aria`)}
                                onChange={(_, value) => setConfirmPassword(value ?? ``)}
                                onGetErrorMessage={validateConfirmPassword}
                                errorMessage={passwordErrorMessage} />
                        </Stack>
                        <Stack horizontal horizontalAlign={"end"}>
                            {!isLoading ? <PrimaryButton
                                type="submit"
                                disabled={!readyToSignIn}
                                text={t('register_submit_button')}
                                onClick={onRegisterClick} /> : <Spinner size={SpinnerSize.medium} />}

                        </Stack>
                        <Stack horizontalAlign={"end"}>
                            <Link onClick={() => { history.push(`/`) }}>
                                <Text variant={"small"}>{t(`register_already_have_account`)}</Text>
                            </Link>
                        </Stack>
                    </Stack>
                </div>
            </Modal>
        </Stack>
    );
}

export default Register;
