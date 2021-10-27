import { INavLink, INavStyles, Nav } from "@fluentui/react";
import { useUserQuery } from "../../State/Auth/authSlice";
import { useMemo } from "react";
import { useHistory } from "react-router";

export const Navigation: React.FC = () => {
    const navStyles: Partial<INavStyles> = { root: { width: 'auto' } };

    const { data: user } = useUserQuery();
    const history = useHistory();

    const navLinkGroups = useMemo(() => {

        const links: INavLink[] = [
            {
                name: `Intel`,
                key: `key_intel`,
                icon: `Home`,
                url: `/`
            },
            {
                name: `Settings`,
                key: `key_settings`,
                icon: `Settings`,
                url: `/settings`
            }
        ];

        if (user?.roles.filter(r => r === `Admin`).length) {
            links.push(
                ...[
                    {
                        name: 'Users',
                        key: 'key_users',
                        icon: `People`,
                        url: `/users`,
                    },
                    {
                        name: 'Integrations',
                        key: 'key_integrations',
                        icon: `Link`,
                        url: `/integrations`,
                    },
                ],
            );
        }

        return [{ links }];
    }, [user]);

    return (
        <Nav
            styles={navStyles}
            ariaLabel="Navigation"
            groups={navLinkGroups}
            onLinkClick={(event, item) => {
                event?.preventDefault();
                history.push(item?.url ?? ``);
            }} />
    );
}

export default Navigation;