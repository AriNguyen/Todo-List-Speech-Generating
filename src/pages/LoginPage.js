import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../App.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      display: "hide",
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleClick() {
    if (this.state.show === "hide"){
      this.setState({
        display: this.state.show = "show"
      })
    }else{
      this.setState({
        display: this.state.show = "hide"
      })
    }
  }


  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    // fetch to /user to create new account, to /auth to verify login info
    fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password,
      }),
    })
    .then( res => {
      console.log(res.status);
      let msg;
      if( res.status === 200 ){
        msg = (<p>Logging in</p>);
      }else{
        msg = (<p>Invalid username/password</p>);
      }
      ReactDOM.render(msg, this.refs.message);
    })
    .catch(err => console.error(err));
  }

  render(){

    return (
      <div className="form">
        <button class="button" onClick={ () => this.handleClick() }>
              Sign up
        </button>
        <form name="authinfo" className="container" onSubmit={this.handleSubmit}>
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
            <button id="login" type="submit" class="button">
              Log in
            </button>
          </div>
          <div ref="message" className="auth"/>
        </form>



          <form name="register" className={this.state.show} onSubmit={this.handleSubmit}>
            <div className="auth">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Enter Username (1-20)"
                id="newUser"
  //              value={this.state.username}
  //              onChange={this.handleChange}
              />

              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter Password (5-30)"
                id="newPassword"
  //              value={this.state.password}
  //              onChange={this.handleChange}
              />

              <label htmlFor="confirm">Confirm Password</label>
              <input
                name="cPassword"
                type="password"
                placeholder="Re-enter Password (5-30)"
                id="cPassword"
  //              value={this.state.password}
  //              onChange={this.handleChange}
              />
              <button class="button">
                Sign up
              </button>
            </div>
            <div ref="message" className="auth"/>
          </form>

    </div>
    );
  }
}

export default LoginPage;
