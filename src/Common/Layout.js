import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service'
import { HomeOutlined, HeartOutlined,
    UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

class CustomLayout extends Component{
    constructor (props) {
        super(props);
        this.iconPath = '/';
        this.state = {
            registred: false,
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/user",{ headers: authHeader() })
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

    nonAuthorizedMenu = () => {
        return(
            <Menu
                theme="light"
                mode="horizontal"
                style={{lineHeight: '64px'}} >
                <Menu.Item
                    key="home"
                    style={{float: 'center', marginLeft: '10%'}}>
                    <Link to="/"><HomeOutlined />Home</Link>
                </Menu.Item>

                <Menu.Item
                    key="register"
                    style={{float: 'right'}}>
                    <Link to="/auth/register"><UserAddOutlined />Registration</Link>
                </Menu.Item>
                <Menu.Item
                    key="login"
                    style={{float: 'right'}}>
                    <Link to="/auth/login"><UserOutlined />Login</Link>
                </Menu.Item>
            </Menu>
        );
    }

    authorizedMenu = () => {
        return(
            <Menu
                theme="light"
                mode="horizontal"
                style={{lineHeight: '64px'}} >
                <Menu.Item
                    key="home"
                    style={{float: 'center', marginLeft: '10%'}}>
                    <Link to="/"><HomeOutlined />Home</Link>
                </Menu.Item>

                <Menu.Item
                    key="favorites"
                    style={{float: 'center', marginLeft: '2%'}}>
                    <Link to="/favorites">< HeartOutlined />Favorites</Link>
                </Menu.Item>

                <Menu.Item
                    key="signout"
                    style={{float: 'right'}}>
                    <a href="/logout"  onClick={this.logOut}>< LogoutOutlined />Log out</a>
                </Menu.Item>
                <Menu.Item
                    key="userpage"
                    style={{float: 'right'}}>
                    <Link to="/auth/user" >< UserOutlined />Profile</Link>
                </Menu.Item>
            </Menu>
        );
    }

    renderMenu = () => {
        if ( this.state.registred === true)
            return <this.authorizedMenu/>;
        else
        return <this.nonAuthorizedMenu />;
    }

    render(){
        return (
        <Layout className="layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#ffffff' }}>
                <div style={{color: "black", float: "left", width: "200px"}}>
                    <Link style={{paddingLeft: '50px', color: "green", float: 'left', fontWeight: "bold", fontSize: "x-large"}} to={this.iconPath}> <b><i>LOGO</i></b> </Link>
                </div>
                <this.renderMenu />
            </Header>
            <Content >
                                <div>
                                    {this.props.children}
                                </div>
            </Content>
        </Layout>
    );
    }
}

export default withRouter(CustomLayout);