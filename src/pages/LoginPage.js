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
    );
    console.log(this);
  }
}



export default LoginPage;
