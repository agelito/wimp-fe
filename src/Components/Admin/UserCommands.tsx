import { CommandBar, Target } from "@fluentui/react";
import React, { useCallback, useMemo, useState } from "react";
import { ReadUserDto } from "../../Dtos/Wimp/User/ReadUserDto";
import { useDeleteMutation, useRoleMutation } from "../../State/Admin/adminSlice";
import { selectUser } from "../../State/Auth/authSlice";
import { useAppSelector } from "../../State/hooks";
import { InviteLinkGenerator } from "./InviteLinkGenerator";

interface Props {
    selectedUser?: ReadUserDto;
    onUpdateUsers: () => void;
}

export const UserCommands: React.FC<Props> = ({ selectedUser, onUpdateUsers }) => {
    const currentUser = useAppSelector(selectUser);

    const [inviteClickEvent, setInviteClickEvent] = useState<Target>();
    const [inviteLinkVisible, setInviteLinkVisible] = useState<boolean>(false);

    const [deleteUserWithId] = useDeleteMutation();
    const [changeUserRole] = useRoleMutation();

    const inviteUser = useCallback(() => {
        setInviteLinkVisible(true);
    }, []);

    const promoteUser = useCallback(() => {
        if (!selectedUser) return;
        changeUserRole({
            user_id: selectedUser.id,
            new_role: `Admin`
        }).then(onUpdateUsers);
    }, [changeUserRole, onUpdateUsers, selectedUser]);

    const demoteUser = useCallback(() => {
        if (!selectedUser) return;
        changeUserRole({
            user_id: selectedUser.id,
            new_role: `User`
        }).then(onUpdateUsers);
    }, [changeUserRole, onUpdateUsers, selectedUser]);

    const deleteUser = useCallback(() => {
        if (!selectedUser) return;
        deleteUserWithId(selectedUser.id)
            .then(onUpdateUsers);

    }, [deleteUserWithId, onUpdateUsers, selectedUser]);

    const selectedOwnUser = useMemo<boolean>(() => {
        if (!currentUser) return false;
        if (!selectedUser) return false;

        return currentUser.id === selectedUser.id;
    }, [currentUser, selectedUser]);

    return <>
        <CommandBar
            items={[
                {
                    key: `users_list_invite`,
                    text: `Invite Users`,
                    iconProps: { iconName: `PeopleAdd` },
                    onClick: (evt) => {
                        setInviteClickEvent(evt?.target as Target);
                        inviteUser();
                    }
                }
            ]}
            farItems={[
                {
                    key: `users_list_roles`,
                    text: `Roles`,
                    iconProps: { iconName: `Shield` },
                    disabled: !selectedUser || selectedOwnUser,
                    subMenuProps: {
                        items: [{
                            key: `users_list_promote`,
                            text: `Promote`,
                            iconProps: { iconName: `DoubleChevronUp8` },
                            disabled: !selectedUser || selectedOwnUser,
                            onClick: () => promoteUser()
                        },
                        {
                            key: `users_list_demote`,
                            text: `Demote`,
                            iconProps: { iconName: `DoubleChevronDown8` },
                            disabled: !selectedUser || selectedOwnUser,
                            onClick: () => demoteUser()
                        }]
                    }
                },
                {
                    key: `users_list_delete`,
                    text: `Delete`,
                    iconProps: { iconName: `Delete` },
                    disabled: !selectedUser || selectedOwnUser,
                    onClick: () => deleteUser()
                }
            ]}
            ariaLabel="User Actions"
        />
        {inviteLinkVisible && <InviteLinkGenerator
            onDismiss={() => setInviteLinkVisible(false)}
            target={inviteClickEvent}
        />}
    </>;
}