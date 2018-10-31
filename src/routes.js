import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Featured from './components/Featured'
import Explore from './components/Explore'
import News from './components/News'
import Login from './components/Login/Login'
import Saved from './components/Saved'


export default (
    <Switch>

      <Route component={ Login } exact path="/" />
      <Route component={ News } path="/News"/>
      <Route component={ Featured } path="/Featured" />
      <Route component={ Explore } path="/Explore" />
      <Route component={ Saved } path="/Saved" />

    </Switch>
  )