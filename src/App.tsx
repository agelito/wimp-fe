
import { Stack, ThemeProvider } from '@fluentui/react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainNavigationBar from './Components/MainNavigationBar/MainNavigationBar';
import { EsiDataServiceProvider } from './DataServices/EsiDataService/Hooks/EsiDataServiceProvider';
import Home from './Pages/Home/Home';
import { useAppSelector } from './State/hooks';
import { selectDarkMode } from './State/Settings/settingsSlice';
import { themes } from './Themes/themes';

function App() {

    const darkMode = useAppSelector(selectDarkMode);

    return (
        <EsiDataServiceProvider esiEndpoint={"https://esi.evetech.net"}>
            <ThemeProvider applyTo="body" theme={darkMode ? themes.caldariTheme : themes.amarrTheme}>
                <Stack verticalFill={true} styles={{ root: { height: "100vh" } }}>
                    <Router>
                        <MainNavigationBar />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Router>
                </Stack>
            </ThemeProvider>
        </EsiDataServiceProvider>
    );
}

export default App;
