import React, { Fragment } from 'react'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router";
import RegisterUser from './views/RegisterUser'
import UserLogin from './views/UserLogin'
import DashboardView from './views/DashboardView'
import CreateProjectView from './views/CreateProjectView';
import Profile from './pages/Profile';
import Portfolio from './pages/Portfolio';
import PostView from './views/PostView';
import AllProjects from './views/AllProjects'
import NavMenuBar from './components/Menu';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { getLocalStorageData, setLocalStorageData } from './components/globalFunctions';
import { useEffect } from 'react';

// import Navbar from './components/navbar';
import './App.css'

const App = () => {
  const user = getLocalStorageData('currentUser');

  useEffect(()=>{

  },[user])

  console.log(user);
  return (
      <Box  className="find-buddy" sx={{ display: 'flex' }}>
        <Router>
          {
            !user && (
              <Switch>
                <Route path="/login" component={UserLogin}></Route>
                <Route path="/register" component={RegisterUser}></Route>
                <Redirect from="*" to="/login"></Redirect>

                </Switch>
            )
          }
          {
            console.log(getLocalStorageData('currentUser'))
          }
          {
            user && (
              <Fragment>
                <NavMenuBar />
                  <Switch>
                    <Route path="/dashboard" component={DashboardView}></Route>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/portfolio" component={AllProjects}></Route>
                    {/* <Route path="/addProject" component={CreateProjectView}></Route> */}
                    <Route path="/posts" component={PostView}></Route>
                    <Redirect from="*" to="/dashboard"></Redirect>
                  </Switch>
              </Fragment>
            )
          }
        </Router >
      </Box>
  )
}

export default App;
