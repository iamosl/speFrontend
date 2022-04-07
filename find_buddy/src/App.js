import React from 'react'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router";
import RegisterUser from './views/RegisterUser'
import UserLogin from './views/UserLogin'
import DashboardView from './views/DashboardView'
import ProfileView from './views/ProfileView';
import PortfolioView from './views/PortfolioView';
import PostView from './views/PostView';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={UserLogin}></Route>
        <Route path="/register" component={RegisterUser}></Route>
        <Route path="/dashboard" component={DashboardView}></Route>
        <Route path="/profile" component={ProfileView}></Route>
        <Route path="/portfolio" component={PortfolioView}></Route>
        <Route path="/post" component={PostView}></Route>
        <Redirect from="*" to="/profile"></Redirect>
      </Switch>
    </Router>
  )
}

export default App
