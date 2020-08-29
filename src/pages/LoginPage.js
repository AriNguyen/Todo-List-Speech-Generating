import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../App.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      cPassword: '',
      display: "hide",
      redirect: null,
    }
  }
  handleClick() {
    if (this.state.display === "hide"){
      this.setState({
        display: this.state.display = "show"
      })
    }else{
      this.setState({
        display: this.state.display = "hide"
      })
    }
  }

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.target.value})
  }

  handleLogin = e => {
    e.preventDefault();
    // fetch to /user to create new account, to /auth to verify login info
    fetch('/auth', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': window.localStorage.getItem("token")
      },
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password,
      }),
    })
    .then( res => {
      console.log(`Status: ${res.status}`);
      if( res.status === 302 ){
        console.log("Logging in");
        window.location.href = `/dashboard?user=${this.state.username}`;
      }else{
        console.log("Invalid username/password");
      }
      return res.json();
    })
    .then( data => {
      console.log(data);
      if (data.token) {
         window.localStorage.setItem("token", data.token);
      }
    })
    .catch(err => console.error(err));
  }

  handleSignup = e => {
    e.preventDefault();

    if( this.state.newPassword != this.state.cPassword ){
      console.log("Password doesn't match");
      return;
    }

    fetch("/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': window.localStorage.getItem("token")
      },
      body: JSON.stringify({
        'username': this.state.newUsername,
        'password': this.state.newPassword,
      })
    })
    .then( res => {
      console.log(res.status);
      if( res.status === 401 ){
        console.log("Invalid username/password or user already existed");
      }
    })
    .catch( err => console.error(err));
  }

  render(){

    return (
      <div className="form">
        <form name="authinfo" className="container" onSubmit={this.handleLogin}>
          <div className="auth">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter Username (1-20)"
              id="user"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter Password (5-30)"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button id="login" type="submit" className="button">
              Log in
            </button>
            <button className="button" onClick={ () => this.handleClick() }>
              Sign up
        </button>
          </div>
        </form>

        <form name="register" className={this.state.display} onSubmit={this.handleSignup}>
          <div className="auth">
            <label htmlFor="username">Username</label>
            <input
              name="newUsername"
              type="text"
              placeholder="Enter Username (1-20)"
              id="newUser"
              value={this.state.newUsername}
              onChange={this.handleChange.bind(this)}
            />

            <label htmlFor="password">Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="Enter Password (5-30)"
              id="newPassword"
              value={this.state.newPassword}
              onChange={this.handleChange.bind(this)}
            />

            <label htmlFor="confirm">Confirm Password</label>
            <input
              name="cPassword"
              type="password"
              placeholder="Re-enter Password (5-30)"
              id="cPassword"
              value={this.state.cpassword}
              onChange={this.handleChange}
            />
            <button className="button">
              Sign up
            </button>
          </div>
        </form>
  </div>
    );
  }
}

export default LoginPage;
