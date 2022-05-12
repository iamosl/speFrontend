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
import PublicProfile from './pages/PublicProfile';

const App = () => {
  const user = getLocalStorageData('currentUser');

  useEffect(()=>{

  },[user])

  console.log(user);
  return (
      <Box className="find-buddy" sx={{padding:10}}>
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
                    <Route path={`/dashboard/:uname`} component={DashboardView}></Route>
                    <Route path={`/profile/${user.username}`} component={Profile}></Route>
                    <Route path={`/portfolio/:uname`} component={UserProjects}></Route>
                    <Route path={`/post/:uname`} component={UserPosts}></Route>
                    <Route path={"/profile/:uname"} component={PublicProfile}></Route>
                    <Redirect from="*" to={`/dashboard/${user.username}`}></Redirect>
                  </Switch>
              </Fragment>
            )
          }
        </Router >
      </Box>
  )
}

export default App;
