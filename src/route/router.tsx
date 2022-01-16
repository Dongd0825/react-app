import { HashRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
// import { Router, Route, Link, Redirect, Switch } from '../react-router-dom/index';
import React from 'react';
import Path from '../path.js';
// import Home from './Home/home';
// import Login from './Login/login';
// import Drag from './Drag';
import User from './User';
import Profile from './Profile';
import SagaTest from './SagaTest';
import FileClip from './FileClip';

export  const Routers:React.FC = () => {
    return ( 
      <>
        <Router>
          <div>
            <Link to={`${Path.Profile}`}>Profile</Link>
            <Link to={`${Path.User}`}>User</Link>
            <Link to={`${Path.SagaTest}`}>SagaTest</Link>
            <Link to={`${Path.FileClip}`}>FileClip</Link>
          </div>
          <Switch>
            <Route path={Path.Profile} component={Profile}></Route>
            <Route path={Path.User} component={User}></Route>
            <Route path={Path.SagaTest} component={SagaTest}></Route>
            <Route path={Path.FileClip} component={FileClip}></Route>
            <Redirect to={Path.Profile}></Redirect>
          </Switch>
        </Router>
      </>
    )
}
