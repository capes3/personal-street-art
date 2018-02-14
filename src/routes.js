import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Admin from './components/Admin'
import Featured from './components/Featured'
import Explore from './components/Explore'
import Gallery from './components/Gallery'
import Login from './components/Login/Login'
import Saved from './components/Saved'


export default (
    <Switch>

      <Route component={ Login } exact path="/" />
      {/* <Route component={ Gallery } path="/Gallery"/> */}
      <Route component={ Admin } path="/Admin" />
      <Route component={ Featured } path="/Featured" />
      <Route component={ Explore } path="/Explore" />
      <Route component={ Saved } path="/Saved" />

    </Switch>
  )