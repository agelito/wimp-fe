
import { Stack, ThemeProvider } from '@fluentui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { AppTitleBar } from './Components/AppTitleBar/AppTitleBar';
import { IntelPicture } from './Components/IntelPicture/IntelPicture';
import MainNavigationBar from './Components/MainNavigationBar/MainNavigationBar';
import Settings from './Components/Settings/Settings';
import { StarSystemPanel } from './Components/StarSystemPanel/StarSystemPanel';
import { EsiDataServiceProvider } from './DataServices/EsiDataService/Hooks/EsiDataServiceProvider';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import { useAppDispatch, useAppSelector } from './State/hooks';
import { selectShowSettings, selectThemeId, setShowSettings } from './State/Settings/settingsSlice';
import { themes } from './Themes/themes';

function App() {
    const dispatch = useAppDispatch();
    const showSettings = useAppSelector(selectShowSettings);
    const themeId = useAppSelector(selectThemeId);

    return (
        <EsiDataServiceProvider esiEndpoint={"https://esi.evetech.net"}>
            <ThemeProvider applyTo="body" theme={themes.find(t => t.id === themeId)?.theme}>
                <Stack verticalFill={true} styles={{ root: { height: "100vh" } }}>
                    <Router>
                        {process.env.REACT_APP_IS_ELECTRON ? <AppTitleBar /> : <MainNavigationBar />}
                        <IntelPicture />
                        <Switch>
                            <Route path="/register/:inviteKey?">
                                <Register />
                            </Route>
                            <AuthenticatedRoute exact path="/">
                                <Home />
                            </AuthenticatedRoute>

                        </Switch>
                        <Settings show={showSettings} handleClose={() => dispatch(setShowSettings(false))} />
                        <StarSystemPanel />
                    </Router>
                </Stack>
            </ThemeProvider>
        </EsiDataServiceProvider>
    );
}

export default App;
