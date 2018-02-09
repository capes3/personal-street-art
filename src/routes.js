import React from 'react'
import {Switch, Route} from 'react-router-dom'

import NYC from './components/NYC'
import PHI from './components/PHI'
import Explore from './components/Explore'
import Gallery from './components/Gallery'
import Login from './components/Login/Login'
import Saved from './components/Saved'


export default (
    <Switch>

      <Route component={ Login } exact path="/" />
      {/* <Route component={ Gallery } path="/Gallery"/> */}
      <Route component={ NYC } path="/NYC" />
      <Route component={ PHI } path="/PHI" />
      <Route component={ Explore } path="/Explore" />
      <Route component={ Saved } path="/Saved" />

    </Switch>
  )