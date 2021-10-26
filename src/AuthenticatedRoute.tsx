import { Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import { selectIsSignedIn } from "./State/Auth/authSlice";
import { useAppSelector } from "./State/hooks";

interface Props {
    path: string,
    exact?: boolean,
}

export const AuthenticatedRoute: React.FC<Props> = ({ path, exact, children }) => {
    const isSignedIn = useAppSelector(selectIsSignedIn);
    const modifiedChildren = isSignedIn ? children : <Login />

    return (
        <Route path={path} exact={exact}>
            {modifiedChildren}
        </Route>
    );
}