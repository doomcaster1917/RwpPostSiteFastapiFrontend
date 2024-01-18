import React, {useState} from 'react';
import './registration'
import UIButton from "../UIkit/Button/UIButton";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ApearingWindow from "../ExceptionWindows/ApearingWindow";
import {AxiosResponse, AxiosError} from 'axios'

const CodeConfirmation = () => {

    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [confirmException, setconfirmException] = useState('')


    function sendCode() {

        axios.post('http://127.0.0.1:8000/registration/input_secure_code', {
            secure_code: code
        }).then(response => {
            if (response?.status === 200) {
                setconfirmException('Успешная регистрация. Войдите в ваш аккаунт.')
                setTimeout(() => navigate('/authentication'), 5000)
            }
        }).catch(function (error) {
            if (error.response.status === 406) {
                console.log(error.response.status)
                setconfirmException('Введён неправильный')
            } else if (error.response.status === 404) {
                setconfirmException('Время высланного кода истекло, зарегистрируйтесь заново')
            }
            else {
                setconfirmException('Неизвестная ошибка')
            }
        })
    }

    return (
        <div className={'regForm'}>
            {confirmException && <ApearingWindow>{confirmException}</ApearingWindow>}
            <input value={code} onChange={e => setCode(e.target.value)} type="text"
                   placeholder="Введите полученный на почту код"/>
            <UIButton width={'43%'} onClick={sendCode}>Подтвердить</UIButton>
        </div>
    );
};

export default CodeConfirmation;