import React from 'react';
import "../App.css";
function LoginPage(props) {

    return (
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
    );
}

export default LoginPage;