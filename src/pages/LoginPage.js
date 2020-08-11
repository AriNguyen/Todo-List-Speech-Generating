import React from 'react';
import "../App.css";
function LoginPage(props) {

    return (
        <div>
            <form class="container">
                <label>Username</label>
                <input type="text" placeholder="Enter Username" id="user"></input>
                <label>Password</label>
                <input type="password" placeholder="Enter Password" id="password"></input>
            </form>
            <button id="login">
                Sign in
            </button>
        </div>
    );
}

export default LoginPage;