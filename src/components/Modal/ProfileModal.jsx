import React  from 'react'

import axios from 'axios';
import dateFormat  from "dateformat";

import {NoLogin} from './../Authentication/index'
import './../../media/css/Modal/Modal.css';
import profile from './../../media/images/avatars.svg'


export default class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            response: [],
        };
    }
    handleSubmit() {
        localStorage.removeItem('token');
        this.props.unmountMe();
    }
    componentDidMount() {
        if (this.props.tokenValid) {
            axios.post(
                'http://127.0.0.1:8000/',
                {"query":'{user(token: "' + localStorage.getItem('token') + '"){ id email username discount date_joined first_name last_name } }'}
            ).then(res => res)
                .then(
                    (result) => {
                        console.log(result)
                        this.setState({
                            isLoaded: true,
                            response: result.data.data.user
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                        return null
                    }
                )
        }
    }

    render() {
        if (!this.props.tokenValid) {
            return (
                <NoLogin unmountMe={this.props.unmountMe}/>
            )
        } else {
            const {error, isLoaded, response} = this.state;
            if (error) {
                return <div>Ошибка: {error.message}</div>;
            } else if (!isLoaded) {
                return (<div className="loader-container"><div className="loader">Загрузка...</div></div>);
            } else {
                return (
                    <div className="modal-form-base profile">
                        <div className="modal-form-header">Профиль</div>
                        <img src={profile} className="profile-avatars" alt="profile-avatars"></img>
                        <ul className="profile-description">
                            <li className="profile-name">{response.first_name} {response.last_name}</li>
                            <li>@{response.username}</li>
                            <li>{response.email}</li>
                            {response.discount === 0 ? (<li>У вас нет персональной скидки</li>) : (<li>Ваша персональная скидка {response.discount} %</li>)}
                            <li>Дата регистрации {dateFormat(response.date_joined, "dd mmm yyyy hh:MMtt")}</li>
                        </ul>
                        <div className="container-login-form-btn">
                            <button className="login-form-btn" onClick={this.handleSubmit}>
                                Выйти
                            </button>
                        </div>
                    </div>
            );
        }
        }
    }
}