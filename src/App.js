import React from 'react';
import './App.css';
import './css/homePage.css';
import './css/index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { persistStore } from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './pages/home/HomePage';
import LinkBoardPage from './pages/linkBoard/LinkBoardPage';
//import history from "./history";

function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <div >
        <Router >
          <div>
            <Switch>
                <Route exact path="/">
                  <div className="App">
                    <HomePage />
                  </div>
                </Route>
                <Route exact path="/dashboard">
                  <LinkBoardPage />
                </Route>
                <Route>
                  "404 Not Found"
                  <a href="/dashboard">
                    Click here to get back to the dashboard
                  </a>
                </Route>
            </Switch>
          </div>
          </Router>
      </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
