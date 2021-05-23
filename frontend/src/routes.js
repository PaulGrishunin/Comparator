import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PlatformList from './PlatformList'

import './App.css';

const BaseRouter = () => (
   <Switch>

       <Route exact path="/platform" component={PlatformList}/>

   </Switch>

);

export default BaseRouter;