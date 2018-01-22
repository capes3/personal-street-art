import React from 'react'
import {Switch, Route} from 'react-router-dom'

import NYC from './components/NYC'
import PHI from './components/PHI'
import LA from './components/LA'
import Gallery from './components/Gallery'
import Login from './components/Login/Login'


export default (
    <Switch>

      <Route component={ Gallery } path="/Gallery" />
      <Route component={ NYC } path="/NYC" />
      <Route component={ PHI } path="/PHI" />
      <Route component={ LA } path="/LA" />

    </Switch>
  )