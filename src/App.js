import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/configureStore';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './containers/AuthenticatedRoute';
import Dashboard from './components/DashBoard/Dashboard';
import './App.css';
import SignIn from "./containers/signin/SignIn";
import Board from "./containers/Board";
import Header from "./components/DashBoard/Header";
import Standard from "./containers/Standard";
import Subject from "./containers/Subject";
import Chapter from "./containers/Chapter";
import Batch from "./containers/Batch";
import Student from "./containers/Student";
import Footer from "./components/DashBoard/Footer";
import TimeTable from "./containers/TimeTable/TimeTable";

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
                  <AuthenticatedRoute exact path='/standard' component={Standard}/>
                  <AuthenticatedRoute exact path='/subject' component={Subject}/>
                  <AuthenticatedRoute exact path='/chapter' component={Chapter}/>
                  <AuthenticatedRoute exact path='/batch' component={Batch}/>
                  <AuthenticatedRoute exact path='/student' component={Student}/>
                  <AuthenticatedRoute exact path='/timetable' component={TimeTable}/>
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
