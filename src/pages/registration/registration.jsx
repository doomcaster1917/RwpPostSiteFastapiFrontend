import React, {createContext, useContext, useEffect} from 'react';
import './registration.css'
import {useState} from "react";
import ApearingWindow from "../ExceptionWindows/ApearingWindow";
import UIButton from "../UIkit/Button/UIButton";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Registration = () => {

    const navigate = useNavigate()
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [acceptPassword, setacceptPassword] = useState('')
    const [Exception, setException] = useState()
    const {store} = useContext(Context)

    function validate() {
        if (password !== acceptPassword) {
            setException('Пароли не сходятся')
        } else if (!email.match(/.+@.+/)) {
            setException('Ввведённая в поле информация \n не является электронной почтой')
        } else if((!password)||(!email)||(!nickname)){
            setException('Не все поля заполнены')
        } else {
            return true
        }
    }
    async function EventWrapper(event){
        event.preventDefault()
        // if(validate()){
            if (await store.registration(nickname, email, password, setException, navigate)) navigate("/confirmation_code")

        // }
    }

    return (
        <form className={'regForm'} method="post" action="/registration">
            {Exception&&<ApearingWindow>{Exception}</ApearingWindow>}
            <h2 id={'regH'}>Регистрация</h2>
            <input value={nickname} onChange={e => setNickname(e.target.value)} type="text" maxLength={20} placeholder="Введите ваш логин" />
            <input value={email} onChange={e => {setEmail(e.target.value); setException('')}} type="email" maxLength={25} placeholder="Введите ваш e-mail" />
            <input value={password} onChange={e => {setPassword(e.target.value); setException('')}} type="text" maxLength={35} placeholder="Придумайте пароль" />
            <input value={acceptPassword} onChange={e =>{setacceptPassword(e.target.value); setException('')}} type="text" maxLength={35} placeholder="Повторите ввод пароля" />
            <UIButton width={'43%'} onClick={EventWrapper}>Зарегистрироваться</UIButton>

        </form>
    );
};

export default Registration;