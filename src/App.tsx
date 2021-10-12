
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainNavigationBar from './Components/MainNavigationBar/MainNavigationBar';
import { EsiDataServiceProvider } from './DataServices/EsiDataService/Hooks/EsiDataServiceProvider';
import Home from './Pages/Home/Home';

function App() {
    return (
        <EsiDataServiceProvider esiEndpoint={"https://esi.evetech.net"}>

            <Router>
                <MainNavigationBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </EsiDataServiceProvider>
    );
}

export default App;
