import { buildColumns, ConstrainMode, DetailsListLayoutMode, IColumn, SelectionMode, ShimmeredDetailsList, Stack, StackItem, Selection } from '@fluentui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserCommands } from '../../Components/Admin/UserCommands';
import { ReadUserDto } from '../../Dtos/Wimp/User/ReadUserDto';
import { useUsersQuery } from '../../State/Admin/adminSlice';

export const Users: React.FC = () => {
    const [page, setPage] = useState(0);
    const { data: usersPage, isFetching } = useUsersQuery(page);

    const { t } = useTranslation();

    const [filterName] = useState<string>(``);

    const pages = useMemo<Map<number, ReadUserDto[]>>(() => new Map(), []);
    const users = useMemo<(ReadUserDto | null)[]>(() => {
        var fullUserList = new Array<ReadUserDto | null>(usersPage?.total ?? 0);

        if (usersPage) {
            pages.set(usersPage.page, usersPage.users);
        }


        var newUsers: (ReadUserDto | null)[] = [];

        pages.forEach((pageUsers) => {
            newUsers = [...newUsers, ...pageUsers];
        });

        fullUserList.splice(0, newUsers.length, ...newUsers);

        return fullUserList;
    }, [usersPage, pages]);

    const filteredUsers = useMemo<(ReadUserDto | null)[]>(() => users.filter(u => filterName.length === 0 || (u && u.username.toLowerCase().indexOf(filterName.toLowerCase()) >= 0)), [users, filterName]);

    const [selectedUser, setSelectedUser] = useState<ReadUserDto>();

    useEffect(() => {
        if (isFetching || !usersPage) return;

        if (usersPage.page < usersPage.total_pages - 1) {
            setPage(usersPage.page + 1);
        }
    }, [usersPage, isFetching, pages])

    const columns = useMemo(() => buildColumns([{ id: ``, username: ``, roles: [] }]).map(col => {
        return {
            ...col,
            isResizable: true,
            name: t(`users_list_${col.key}`)
        };
    }), [t]);

    const onRenderItemColumn = useCallback((item: ReadUserDto, _index?: number, column?: IColumn): React.ReactNode | undefined => {
        if (!column) return undefined;

        return item[column.key as keyof ReadUserDto];
    }, []);

    const selection = useMemo(() => {
        var sel: Selection | undefined = undefined;

        sel = new Selection({
            onSelectionChanged: () => {
                if (!sel) return;

                if (sel.getSelectedCount()) {
                    setSelectedUser(sel.getSelection()[0] as ReadUserDto);
                } else {
                    setSelectedUser(undefined);
                }
            }
        });

        return sel;
    }, []);

    return (
        <Stack grow tokens={{ padding: 16 }}>
            <UserCommands selectedUser={selectedUser} onUpdateUsers={() => {
                selection.setAllSelected(false);
                setSelectedUser(undefined);

                setPage(0);
            }} />
            { /* <TextField label={t(`users_list_filter_by_name`)} value={filterName} onChange={(_event, value) => setFilterName(value ?? ``)} /> */}
            <StackItem style={{ maxWidth: "99%", position: "relative" }}>
                <ShimmeredDetailsList
                    setKey="items"
                    items={filteredUsers || []}
                    columns={columns}
                    selectionMode={SelectionMode.single}
                    layoutMode={DetailsListLayoutMode.justified}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    onRenderItemColumn={onRenderItemColumn}
                    enableShimmer={false}
                    ariaLabelForShimmer="Content is being fetched"
                    ariaLabelForGrid="Item details"
                    selection={selection}
                    listProps={{
                        renderedWindowsAhead: 0,
                        renderedWindowsBehind: 0,
                    }}
                />
            </StackItem>
        </Stack>
    );
}

export default Users;
