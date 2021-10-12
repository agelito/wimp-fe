import { MessageBar, MessageBarType } from "@fluentui/react";
import { useTranslation } from "react-i18next";

type ErrorAlertProps = {
    messageId: string,
    onDismiss?: () => void,
}

export const ErrorAlert = ({ messageId, onDismiss }: ErrorAlertProps) => {
    const { t } = useTranslation();

    return (
        <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={onDismiss}
            dismissButtonAriaLabel={t("error_alert_dismiss_button_aria")}
        >
            {t(messageId)}
        </MessageBar>
    );
}