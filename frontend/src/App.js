import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './App.css';
import BaseRouter from './routes';
import Layout from './Common/Layout.js';
import 'antd/dist/antd.css';
import QueueAnim from 'rc-queue-anim';
import { OverPack } from 'rc-scroll-anim';

class App extends Component {

    contactUsDiv = () => {
        return (

                <QueueAnim style={{ backgroundColor: "#ffffff" }}>
                    <div key="a" style={{ marginTop: "80vh", align: "bottom", padding: "2%", fontWeight: "bold", fontSize: "large" }}>
                        Contact us
                    </div>
                    <div key="b" style={{ paddingLeft: "10%", paddingRight: "10%", display: "flex" }}>
                        <div style={{ float: "right", fontSize: "larger", textAlign: "center", width: "60vw"}} >
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
                               <BaseRouter />
                              </div>
                      </div>
                      <this.contactUsDiv />
                      </Layout>
                </Router>

            </div>);
    }

}
export default App;