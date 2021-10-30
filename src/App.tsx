
import { Stack, ThemeProvider } from '@fluentui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthenticatedRoute } from './Components/Routes/AuthenticatedRoute';
import MainTitleBar from './Components/MainTitleBar/MainTitleBar';
import SideNav from './Components/SideNav/SideNav';
import { StarSystemPanel } from './Components/StarSystemPanel/StarSystemPanel';
import { EsiDataServiceProvider } from './DataServices/EsiDataService/Hooks/EsiDataServiceProvider';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import Settings from './Pages/Settings/Settings';
import Users from './Pages/Users/Users';
import { useAppSelector } from './State/hooks';
import { selectExpandedSideNav, selectThemeId } from './State/Settings/settingsSlice';
import { themes } from './Themes/themes';
import { AdminRoute } from './Components/Routes/AdminRoute';
import Login from './Pages/Auth/Login';

function App() {
    const expandedSideNav = useAppSelector(selectExpandedSideNav);
    const themeId = useAppSelector(selectThemeId);

    return (
        <EsiDataServiceProvider esiEndpoint={"https://esi.evetech.net"}>
            <ThemeProvider applyTo="body" theme={themes.find(t => t.id === themeId)?.theme}>
                <Stack verticalFill={true} styles={{ root: { height: "100vh" } }}>
                    <Router>
                        <MainTitleBar />
                        <Stack horizontal verticalFill={true} styles={{ root: { width: "100%" } }}>
                            <SideNav expanded={expandedSideNav} />
                            <Switch>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/register/:inviteKey?">
                                    <Register />
                                </Route>
                                <Route path="/settings">
                                    <Settings />
                                </Route>
                                <AdminRoute path="/users">
                                    <Users />
                                </AdminRoute>
                                <AuthenticatedRoute exact path="/">
                                    <Home />
                                </AuthenticatedRoute>
                            </Switch>
                        </Stack>
                        <StarSystemPanel />
                    </Router>
                </Stack>
            </ThemeProvider>
        </EsiDataServiceProvider>
    );
}

export default App;
