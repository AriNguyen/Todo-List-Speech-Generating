import React from 'react';
import "../App.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange = e => {
    console.log(e.currentTarget.name);
    this.setState({ [e.currentTarget.name]: e.target.value})
    console.log(this.state);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(`${this.state.username} ${this.state.password}`);
    fetch('/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password
      }),
    })
    .then( res => {
      console.log(res.status);
      return res.json();
    })
    .then( function (data) {
      console.log(data);
    })
    .catch(err => console.error(err));
  }

  render(){

    return (
<<<<<<< HEAD
      <div>
        <form class="container" onSubmit={this.handleSubmit}>
          <label for="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter Username"
            id="user"
            value={this.state.username}
            onChange={this.handleChange}
          ></input>

          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          ></input>
          <button id="login" type="submit">
          Sign in
          </button>
        </form>
      </div>
=======
        <div class="form">
            <form name="authinfo">
                <div class="container">
                    <div class="auth">
                        <label>Username</label>
                        <input type="text" placeholder="Enter Username" id="user"></input>
                    </div>
                    <div class="auth">
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" id="password"></input>
                        <button type="submit" id="login">Sign in</button>
                    </div>               
                </div>
            </form>
        </div>
>>>>>>> dccaeb6533c2db9c115a7b2484a4fe2c419b2b68
    );
    console.log(this);
  }
}



export default LoginPage;
