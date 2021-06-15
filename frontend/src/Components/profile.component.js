import React, { Component } from "react";
import AuthService from "../services/auth.service";
import './PlatformList.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="ProfileContainer">
                <div className="ProfileimageContainer">
                    <img src={"../pictures/user.png"} alt="" />
                </div>
                <div className="titleContainer">
                    <h4>
                        <strong>{currentUser.username}</strong> Profile
                    </h4>
                <br/>
                <p>
                    <p>Email:{" "}{currentUser.email} </p>

                </p>
                <p>
                    <p>Token:{" "}
                        {currentUser.token.substring(0, 20)} ...{" "}
                        {currentUser.token.substr(currentUser.token.length - 20)}</p>
                </p>
                </div>
            </div>
        );
    }
}
