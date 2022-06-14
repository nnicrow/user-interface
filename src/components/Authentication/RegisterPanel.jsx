import React  from 'react'

import axios from 'axios';

import './../../media/css/Modal/Modal.css';


export default class RegisterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: '',
            password: '',
            password2: '',
            email: '',
            first_name: '',
            last_name: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.password2Change = this.password2Change.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.first_nameChange = this.first_nameChange.bind(this);
        this.last_nameChange = this.last_nameChange.bind(this);
    }
    usernameChange(event) { this.setState({username: event.target.value}); }
    emailChange(event) { this.setState({email: event.target.value}); }
    passwordChange(event) { this.setState({password: event.target.value}); }
    password2Change(event) { this.setState({password2: event.target.value}); }
    first_nameChange(event) { this.setState({first_name: event.target.value}); }
    last_nameChange(event) { this.setState({last_name: event.target.value}); }

    inputCheck() {
        if (this.state.password !== this.state.password2) {
            this.setState({
                error: "Пароли не совпадают"
            });
            return false;
        }
        if (this.state.password.length < 8) {
            this.setState({
                error: "Пароли слишком короткий"
            });
            return false;
        }
        if (!isNaN(this.state.password)) {
            this.setState({
                error: "Пароль должен содержать символы"
            });
            return false;
        }
        return true
    }

    handleSubmit() {
        if (this.inputCheck()){
            axios.post(
                'http://127.0.0.1:8000/',
                {"query": 'mutation {registration (username: "' + this.state.username + '"' +
                        ' password: "'+ this.state.password + '"' +
                        ' email: "' + this.state.email + '"' +
                        ' first_name: "' + this.state.first_name + '"' +
                        ' last_name: "' + this.state.last_name + '") {status token err}}'}
            ).then(res => res)
                .then(
                    (result) => {
                        if (result.data.data.registration.status) {
                            localStorage.setItem('token', result.data.data.registration.token);
                            this.props.unmountMe()
                        }
                        else {
                            this.setState({
                                error: result.data.data.registration.err
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
    }
    render() {

        return (
            <div className="login-panel-block">
                <div className="login-panel-header">Регистрация</div>
                <div className="login-error">{this.state.error}</div>
                <div className="wrap-input validate-input" data-validate="Enter username">
                    <input className="input" type="text" value={this.state.username} onChange={this.usernameChange} name="логин" placeholder="Логин"/>
                </div>

                <div className="wrap-input validate-input" data-validate="Enter email">
                    <input className="input" type="text" value={this.state.email} onChange={this.emailChange} name="Электронная почта" placeholder="Электронная почта"/>
                </div>

                <div className="wrap-input validate-input" data-validate="Enter password">
                    <input className="input" type="password" value={this.state.password} onChange={this.passwordChange} name="пароль" placeholder="Пароль"/>
                </div>

                <div className="wrap-input validate-input" data-validate="Enter password2">
                    <input className="input" type="password" value={this.state.password2} onChange={this.password2Change} name="Повторите пароль" placeholder="Повторите пароль"/>
                </div>

                <div className="wrap-input validate-input" data-validate="Enter first_name">
                    <input className="input" type="text" value={this.state.first_name} onChange={this.first_nameChange} name="Имя" placeholder="Имя"/>
                </div>

                <div className="wrap-input validate-input" data-validate="Enter last_name">
                    <input className="input" type="text" value={this.state.last_name} onChange={this.last_nameChange} name="Фамилия" placeholder="Фамилия"/>
                </div>
                <div className="container-login-form-btn">
                    <button className="login-form-btn" onClick={this.handleSubmit}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        )
    }
}