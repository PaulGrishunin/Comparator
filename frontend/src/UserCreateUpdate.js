import React, { Component } from 'react';
import UsersService from './UsersService';

const usersService = new UsersService();

class UserCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          usersService.getUser(params.pk).then((c)=>{
            this.refs.userName.value = c.username;
            this.refs.email.value = c.email;
            this.refs.password.value = c.password;
          })
        }
      }

      handleCreate(){
        usersService.createUser(
          {
            "username": this.refs.userName.value,
            "email": this.refs.email.value,
            "password": this.refs.password.value,

        }
        ).then((result)=>{
          alert("User created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        usersService.updateUser(
          {
            "pk": pk,
            "username": this.refs.userName.value,
            "email": this.refs.email.value,
            "password": this.refs.password.value,
        }
        ).then((result)=>{
          console.log(result);
          alert("User updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              First Name:</label>
              <input className="form-control" type="text" ref='userName' />


            <label>
              Email:</label>
              <input className="form-control" type="text" ref='email' />

            <label>
              Password:</label>
              <input className="form-control" type="text" ref='password' />

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default UserCreateUpdate;