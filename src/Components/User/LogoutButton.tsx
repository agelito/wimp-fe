import { ActionButton } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { logout } from "../../State/Auth/authSlice";
import { useAppDispatch } from "../../State/hooks";

export const LogoutButton: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    return (
        <ActionButton iconProps={{ iconName: "Leave" }} onClick={() => dispatch(logout())}>
            {t(`logout_button`)}
        </ActionButton>
    );
}