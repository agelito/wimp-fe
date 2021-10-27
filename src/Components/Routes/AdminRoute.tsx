import { useMemo } from "react";
import { Redirect, Route } from "react-router-dom";
import { selectUser } from "../../State/Auth/authSlice";
import { useAppSelector } from "../../State/hooks";

interface Props {
    path: string,
    exact?: boolean,
}

export const AdminRoute: React.FC<Props> = ({ path, exact, children }) => {
    const user = useAppSelector(selectUser);

    const isAdmin = useMemo(() => {
        return user?.roles.filter(r => r === `Admin`).length;
    }, [user]);

    const modifiedChildren = isAdmin ? children : <Redirect to={`/`} />

    return (
        <Route path={path} exact={exact}>
            {modifiedChildren}
        </Route>
    );
}