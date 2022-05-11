import React, { Fragment } from 'react'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router";
import RegisterUser from './pages/RegisterUser'
import UserLogin from './pages/UserLogin'
import DashboardView from './pages/DashboardView'
import Profile from './pages/Profile';
import NavMenuBar from './components/Menu';
import { Box } from '@mui/material';
import { getLocalStorageData, setLocalStorageData } from './components/globalFunctions';
import { useEffect } from 'react';
import UserProjects from './pages/UserProjects';
import UserPosts from './pages/UserPosts';

// import Navbar from './components/navbar';
import './App.css'

const App = () => {
  const user = getLocalStorageData('currentUser');

  useEffect(()=>{

  },[user])

  console.log(user);
  return (
      <Box className="find-buddy" sx={{display:'flex', padding:10,marginLeft:"-200px", backgroundColor: '#95B9C7', height: "100vh"}}>
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
                    <Route path="/portfolio" component={UserProjects}></Route>
                    <Route path="/post" component={UserPosts}></Route>
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
