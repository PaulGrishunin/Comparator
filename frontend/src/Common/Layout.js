import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { HomeOutlined, HeartOutlined,
    UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;

class CustomLayout extends Component{
    constructor () {
        super();
        this.iconPath = '/';
        this.state = {
            registred: "",
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/registred", {credentials:"include"})
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("registred")
                    this.setState({registred: "ok"})
                },
                (error) => {
                    console.log("error")
                    this.setState({registred: "not"})
                }
            )
    }

    signOut() {
        fetch("http://localhost:8000/signOut", {credentials:"include"})
        setTimeout(() => {
            window.location.reload(false);
        }, 100)
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
                    <Link to="/platform"><HomeOutlined />Home</Link>
                </Menu.Item>

                <Menu.Item
                    key="register"
                    style={{float: 'right'}}>
                    <Link to="/register"><UserAddOutlined />Registration</Link>
                </Menu.Item>
                <Menu.Item
                    key="login"
                    style={{float: 'right'}}>
                    <Link to="/login"><UserOutlined />Login</Link>
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
                    <Link to="/platform"><HomeOutlined />Home</Link>
                </Menu.Item>

                <Menu.Item
                    key="favorites"
                    style={{float: 'center', marginLeft: '2%'}}>
                    <Link to="/favorites">< HeartOutlined />Favorites</Link>
                </Menu.Item>

                <Menu.Item
                    key="signout"
                    style={{float: 'right'}}>
                    <a href="#"  onClick={this.signOut}>< LogoutOutlined />Sign out</a>
                </Menu.Item>
                <Menu.Item
                    key="userpage"
                    style={{float: 'right'}}>
                    <Link to="/user" >< UserOutlined />Profile</Link>
                </Menu.Item>
            </Menu>
        );
    }

    renderMenu = () => {
        if ( this.state.registred === "ok" )
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