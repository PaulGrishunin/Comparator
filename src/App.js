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
import ContactUsDiv from "./ContactUsDiv";
import AuthorizedMenu from "./AuthorizedMenu";
import NonAuthorizedMenu from "./NonAuthorizedMenu";
import { Link, withRouter } from 'react-router-dom';
import authHeader from './services/auth-header';
import AuthService from './services/auth.service';

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
        fetch("http://localhost:8000/user",{ headers: authHeader() })
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

    logOut() {
        AuthService.logout();
        setTimeout(() => {
            window.location.reload(false);
        }, 300)
    }

    renderMenu = () => {
        if ( this.state.registred === true)
            return <AuthorizedMenu/>;
        else
            return <NonAuthorizedMenu />;
    }

    render() {
        return (
                <Router>
                    <Layout className="layout">
                        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#ffffff' }}>
                            <div style={{color: "black", float: "left", width: "200px"}}>
                                <Link style={{paddingLeft: '50px', color: "green", float: 'left', fontWeight: "bold", fontSize: "x-large"}} to={this.iconPath}> <b><i>LOGO</i></b> </Link>
                            </div>
                            <this.renderMenu />
                        </Header>
                        <Content >
                            <Switch>

                                <Route exact path="/" component={PlatformList}/>
                                <Route exact path="/auth/login" component={Login}/>
                                <Route exact path="/auth/register" component={Register}/>
                                <Route exact path="/auth/user" component={Profile}/>
                                <Route exact path="/favorites" component={Favorites}/>

                            </Switch>
                            <ContactUsDiv />
                        </Content>
                    </Layout>
                </Router>);
    }

}
export default App;