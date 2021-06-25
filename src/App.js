import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import BaseRouter from './routes';
import Layout from './Common/Layout.js';
import 'antd/dist/antd.css';
import QueueAnim from 'rc-queue-anim';
import PlatformList from "./Components/PlatformList";
import Login from "./Components/login.component";
import Register from "./Components/register.component";
import Profile from "./Components/profile.component";
import Favorites from "./Components/Favorites";
// import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {

    contactUsDiv = () => {
        return (
                <QueueAnim style={{ backgroundColor: "#ffffff" }}>
                    <div key="a" style={{ marginTop: "80vh", align: "bottom", padding: "2%", fontWeight: "bold", fontSize: "medium" }}>
                        Contact us
                    </div>
                    <div key="b" style={{ paddingLeft: "10%", paddingRight: "10%", display: "flex" }}>
                        <div style={{ float: "right", fontSize: "small", textAlign: "center", width: "60vw"}} >
                            Phone: XXX-XXX-XXX
                            <br />
                            Email: xxx@email.com
                            <br />
                        </div>
                    </div>
                </QueueAnim>
        );
    }

    render() {

        return (
            <div className="App" style={{height: "100%"}}>
                <Router>
                      <Layout {...this.props}>
                      <div className="Base" >
                              <div className="BaseInfo">
                               <Switch>

                                   <Route exact path="/" component={PlatformList}/>
                                   <Route exact path="/auth/login" component={Login}/>
                                   <Route exact path="/auth/register" component={Register}/>
                                   <Route exact path="/auth/user" component={Profile}/>
                                   <Route exact path="/favorites" component={Favorites}/>

                               </Switch>
                              </div>
                      </div>
                      <this.contactUsDiv />
                      </Layout>
                </Router>

            </div>);
    }

}
export default App;