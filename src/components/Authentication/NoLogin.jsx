import React, { useState }  from 'react'

import {LoginPanel, RegisterPanel} from './index'
import './../../media/css/Modal/Modal.css';


export default function NoLogin(props) {
    const [сhoice_panel, setСhoice] = useState(true);
    const [login_panel, setLoginPanel] = useState(false);
    const [register_panel, setRegisterPanel] = useState(false);
    return (
        <div className="modal-form-base">
            { сhoice_panel ? (
                <>
                    <div className="modal-form-header header-profile">Вы не вошли в ситему</div>
                    <div className="buttons-block">
                        <button className="profile-buttin-login" onClick={() => {setLoginPanel(true); setСhoice(false); setRegisterPanel(false);}}>Войти</button>
                        <button className="profile-buttin-register" onClick={() => {setLoginPanel(false); setСhoice(false); setRegisterPanel(true);}}>Зарегистрироваться</button>
                    </div>
                </>
            ) : null}
            {login_panel ? (<LoginPanel unmountMe={props.unmountMe}/>) : null}
            {register_panel ? <RegisterPanel unmountMe={props.unmountMe}/> : null}
        </div>
    )
};