import React, {Component} from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { HomeOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

class NonAuthorizedMenu extends Component {
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
            </React.Fragment>
        )
    }
}

export default withRouter(NonAuthorizedMenu);