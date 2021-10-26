import { buildColumns, ConstrainMode, DetailsListLayoutMode, IColumn, SelectionMode, ShimmeredDetailsList, Stack, StackItem, TextField } from '@fluentui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReadUserDto } from '../../Dtos/Wimp/User/ReadUserDto';
import { useUsersQuery } from '../../State/Admin/adminSlice';

export const Users: React.FC = () => {
    const [page, setPage] = useState(0);
    const { data: usersPage, isFetching } = useUsersQuery(page);

    const { t } = useTranslation();

    const [filterName, setFilterName] = useState<string>(``);

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

    return (
        <Stack grow tokens={{ padding: 16 }}>
            <TextField label={t(`users_list_filter_by_name`)} value={filterName} onChange={(_event, value) => setFilterName(value ?? ``)} />
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
