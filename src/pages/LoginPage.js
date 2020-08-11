import React from 'react';
import "../App.css";
function LoginPage(props) {

    return (
        <div>
            <div>Login
                <form>
                  <label>Username</label>
                  <input type="text" placeholder="Enter Username" id="user"></input>
                  <label>Password</label>
                  <input type="password" placeholder="Enter Password" id="password"></input>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
