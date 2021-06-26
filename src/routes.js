import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlatformList from './Components/PlatformList';
import Login from './Components/login.component';
import Register from './Components/register.component';
import Profile from './Components/profile.component';
import Favorites from './Components/Favorites';

import './App.css';

const BaseRouter = () => (
   <Switch>

       <Route exact path="/platform" component={PlatformList}/>
       <Route exact path="/auth/login" component={Login}/>
       <Route exact path="/auth/register" component={Register}/>
       <Route exact path="/auth/user" component={Profile}/>
       <Route exact path="/favorites" component={Favorites}/>

   </Switch>

);

export default BaseRouter;