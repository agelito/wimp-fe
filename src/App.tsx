
import { Stack, ThemeProvider } from '@fluentui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { AppTitleBar } from './Components/AppTitleBar/AppTitleBar';
import { IntelPicture } from './Components/IntelPicture/IntelPicture';
import MainNavigationBar from './Components/MainNavigationBar/MainNavigationBar';
import SideNav from './Components/SideNav/SideNav';
import { StarSystemPanel } from './Components/StarSystemPanel/StarSystemPanel';
import { EsiDataServiceProvider } from './DataServices/EsiDataService/Hooks/EsiDataServiceProvider';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import Settings from './Pages/Settings/Settings';
import Users from './Pages/Users/Users';
import { selectIsSignedIn } from './State/Auth/authSlice';
import { useAppSelector } from './State/hooks';
import { selectExpandedSideNav, selectThemeId } from './State/Settings/settingsSlice';
import { themes } from './Themes/themes';

function App() {
    const expandedSideNav = useAppSelector(selectExpandedSideNav);
    const themeId = useAppSelector(selectThemeId);
    const isSignedIn = useAppSelector(selectIsSignedIn);

    return (
        <EsiDataServiceProvider esiEndpoint={"https://esi.evetech.net"}>
            <ThemeProvider applyTo="body" theme={themes.find(t => t.id === themeId)?.theme}>
                <Stack verticalFill={true} styles={{ root: { height: "100vh" } }}>
                    <Router>
                        {process.env.REACT_APP_IS_ELECTRON ? <AppTitleBar /> : <MainNavigationBar />}
                        {isSignedIn ? <IntelPicture /> : <></>}
                        <Stack horizontal verticalFill={true} styles={{ root: { width: "100%" } }}>
                            <SideNav expanded={expandedSideNav} />
                            <Switch>
                                <Route path="/register/:inviteKey?">
                                    <Register />
                                </Route>
                                <Route path="/settings">
                                    <Settings />
                                </Route>
                                <AuthenticatedRoute path="/users">
                                    <Users />
                                </AuthenticatedRoute>
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
