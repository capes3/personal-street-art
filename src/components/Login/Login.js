import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


export default class Login extends Component {
    render() {
        return (
            <div className="login-background">  
                <div className="login-title">Welcome</div>
                 <a href={ process.env.REACT_APP_LOGIN }><Button style={{fontSize:'70%'}} variant="contained" color="primary">Login</Button></a>
                <div className="login-wrapper">
               

                </div>
                
            </div> 
        )
    }
}