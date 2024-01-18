import React, {createContext, useContext, useEffect, useState} from 'react';
import ApearingWindow from "../ExceptionWindows/ApearingWindow";
import {useNavigate} from "react-router-dom";
import UIButton from "../UIkit/Button/UIButton";
import './login..css'
import {Context} from "../../index";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Notification, setNotification] = useState()
    const {store} = useContext(Context)

    async function event_wrapper(event){
        event.preventDefault()
        await store.login(email, password, setNotification, navigate)
    }

    return (

        <form className={'authForm'} method="post" action="/auth">
            {Notification&&<ApearingWindow>{Notification}</ApearingWindow>}
            <h2 id={'regH'}>Авторизация</h2>
            <input value={email} onChange={e => {setEmail(e.target.value); setNotification('')}} type="text" placeholder="Введите ваш email" />
            <input value={password} onChange={e => {setPassword(e.target.value); setNotification('')}} type="password" placeholder="Введите ваш пароль" />
            <div id={'buttons'}>
            <UIButton width={'14vw'} height={'100%'} onClick={event_wrapper}>Войти</UIButton>
            <UIButton width={'13vw'} height={'100%'} onClick={() => navigate("/registration")}>Зарегистрироваться</UIButton>
            </div>
        </form>
    );
}

export default Login;