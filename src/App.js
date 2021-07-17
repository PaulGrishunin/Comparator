import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import PlatformList from "./Components/PlatformList";
import Login from "./Components/login.component";
import Register from "./Components/register.component";
import Profile from "./Components/profile.component";
import Favorites from "./Components/Favorites";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import ContactUsDiv from "./Components/ContactUsDiv";
import AuthorizedMenu from "./Components/AuthorizedMenu";
import NonAuthorizedMenu from "./Components/NonAuthorizedMenu";
import {Link} from 'react-router-dom';
import authHeader from './services/auth-header';


const { Header, Content } = Layout;

class App extends Component {

    constructor (props) {
        super(props);
        this.iconPath = '/';
        this.state = {
            registred: false,
        };
    }


    componentDidMount() {
        fetch("https://compar.herokuapp.com/user",{ headers: authHeader() })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.user.email){
                        console.log("registred Ok")
                        this.setState({registred: true})
                    } else{
                        console.log("Not registered")
                        this.setState({registred: false})
                    }
                }
            )
    }

    renderMenu = () => {
        if ( this.state.registred === true)
            return <AuthorizedMenu/>;
        else
            return <NonAuthorizedMenu />;
    }

    render() {
        return (
            <div className="App" style={{height: "100%"}}>
            <Router>
                <Layout className="layout">
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#ffffff' }}>
                        <div style={{color: "black", float: "left", width: "200px"}}>
                            <Link style={{paddingLeft: '50px', color: "green", float: 'left', fontWeight: "bold", fontSize: "x-large"}} to={this.iconPath}> <b><i>LOGO</i></b> </Link>
                        </div>
                        <this.renderMenu />
                    </Header>
                    <Content >
                        <div className="Base" >
                            <div className="BaseInfo">
                        <Switch>

                            <Route exact path="/" component={PlatformList}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route exact path="/favorites" component={Favorites}/>

                        </Switch>
                            </div>
                        </div>
                        <ContactUsDiv />
                    </Content>
                </Layout>
            </Router>
            </div>);
    }

}
export default App;
