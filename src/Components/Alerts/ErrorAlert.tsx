import { MessageBar, MessageBarType } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type ErrorAlertProps = {
    messageId: string,
}

export const ErrorAlert = ({ messageId }: ErrorAlertProps) => {
    const { t } = useTranslation();

    const [errorDismissed, setErrorDismissed] = useState<boolean>();

    useEffect(() => setErrorDismissed(false), []);

    return (
        !errorDismissed ?
            <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={false}
                onDismiss={() => setErrorDismissed(true)}
                dismissButtonAriaLabel={t("error_alert_dismiss_button_aria")}
            >
                {t(messageId)}
            </MessageBar> : <></>
    );
}