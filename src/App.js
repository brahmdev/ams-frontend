import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/configureStore';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminRoute from './containers/AdminRoute';
import AuthenticatedRoute from './containers/AuthenticatedRoute';
import Dashboard from './components/DashBoard/Dashboard';
import './App.css';
import SignIn from "./containers/signin/SignIn";
import Board from "./containers/Board";
import Header from "./components/DashBoard/Header";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router basename={'/ams'}>
          <div>
            <div className='app-main'>
              <Header/>
              {/* ToDo add ErrorBoundary (c) https://reactjs.org/docs/code-splitting.html#error-boundaries */}
              <div className='content'>
                <Switch>
                  <AuthenticatedRoute exact path='/' component={Dashboard}/>
                  <Route exact path='/login' component={SignIn}/>
                  <AuthenticatedRoute exact path='/board' component={Board}/>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
