import React from 'react'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router";
import RegisterUser from './views/RegisterUser'
import UserLogin from './views/UserLogin'
import DashboardView from './views/DashboardView'
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={UserLogin}></Route>
        <Route path="/dashboard" component={DashboardView}></Route>
        <Route path="/register" component={RegisterUser}></Route>
        <Redirect from="*" to="/login"></Redirect>
      </Switch>
    </Router>
  )
}

export default App
