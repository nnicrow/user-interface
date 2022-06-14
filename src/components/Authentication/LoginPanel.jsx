import React  from 'react'

import axios from 'axios';

import './../../media/css/Modal/Modal.css';


export default class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }
    usernameChange(event) {
        this.setState({username: event.target.value});
    }
    passwordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        axios.post(
            'http://127.0.0.1:8000/',
            {"query": 'mutation {login (username: "'+this.state.username+'"' +
                    ' password: "'+this.state.password+'") {status token err}}'}
        ).then(res => res)
            .then(
                (result) => {
                    if (result.data.data.login.status) {
                        localStorage.setItem('token', result.data.data.login.token);
                        this.props.unmountMe()
                    }
                    else {
                        this.setState({
                            error: result.data.data.login.err
                        });
                    }
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className="login-panel-block">
                <div className="login-panel-header">Авторизация</div>
                <div className="login-error">{this.state.error}</div>
                <div className="wrap-input validate-input" data-validate="Enter username">
                    <input className="input" type="text" value={this.state.username} onChange={this.usernameChange} name="логин" placeholder="Логин"/>
                </div>

                <div className="wrap-input validate-input" data-validate="Enter password">
                    <input className="input" type="password" value={this.state.password} onChange={this.passwordChange} name="пароль" placeholder="Пароль"/>
                </div>

                <div className="container-login-form-btn">
                    <button className="login-form-btn" onClick={this.handleSubmit}>
                        Войти
                    </button>
                </div>
            </div>
        )
    }
}
