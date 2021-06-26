import React, {Component} from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { HomeOutlined, HeartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

class AuthorizedMenu extends Component {
    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}

export default withRouter(AuthorizedMenu);