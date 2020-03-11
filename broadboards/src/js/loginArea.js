// This react component will show the login and signup
// buttons if not logged in, or, will notify the user
// that they are logged in.

import React from "react";

// API routes
const checkSessionAPI = '/checkSession'

class LoginArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: [],
        };
    }

    fetchUserSession = async() => {
        console.log("@fetchUserSession");
        const response = await fetch(checkSessionAPI);
        // console.log(response)
        console.log(response)
        const body = await response.json();
        // console.log(body)

        console.log(body)
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body['user'];
    };

    componentDidMount() {
        this.fetchUserSession()
            .then(res => {
                // console.log(res)
                this.setState({user: res})
                if (res != null) {
                    this.setState({
                        loggedIn: true,
                    })
                }
            })
            .catch(err => console.log(err));

    }

    render() {
        if (this.state.loggedIn === true){
            console.log('here')
            return (
                <h4>Logged in as {this.state.user}</h4>
            );
        }
        else {
            console.log('else')
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="./login.html"><span class="glyphicon glyphicon-user"></span>
                            <b>Login</b> or</a>
                    </li>
                    <li>
                        <a href="./signup.html"><span class="glyphicon glyphicon-log-in"></span>
                            Sign Up!</a>
                    </li>
                </ul>
            );
        }
    }
}

export default LoginArea;

