import React, {useContext, useEffect, useState} from 'react';
import UIButton from "../../../UIkit/Button/UIButton";
import {Context} from "../../../../index";
import ApearingWindow from "../../../ExceptionWindows/ApearingWindow";
import "../ChangeForms.css"

const ChangeNameForm = ({webSockTimeout, setWebSockTimeout, changeNicknameState, setChangeNicknameState}) => {

    const [notificationMessage, setNotificationMessage] = useState('');
    const {store} = useContext(Context)
    const [newName, setNewName] = useState()

    useEffect(() => {
        if (webSockTimeout){
            changeNicknameState(false)
        }
    }, [changeNicknameState, webSockTimeout, notificationMessage]);

    async function event_wrapper(event){
        setNewName(event)
        await store.checkNickname(event, setNotificationMessage, setWebSockTimeout)
    }

    async function changeNameCansellation(){
        setChangeNicknameState(false)
        await store.closeWS(setNotificationMessage)
    }
    async function change_name_accepter(){
        const changed = await store.changeNickName(newName)
        if (changed) setChangeNicknameState(false)
    }

    return (
        <div className={'EditForm'}>
            {notificationMessage&&<ApearingWindow>{notificationMessage}</ApearingWindow>}
            <input onChange={e => {event_wrapper(e.target.value); notificationMessage&&setNotificationMessage('')}}
                   type="text" placeholder="Введите новое имя" />
            <UIButton width={'85%'} height={'25%'} color={'green'} onClick={change_name_accepter}>Изменить имя(логин)</UIButton>
            <UIButton width={'85%'} height={'25%'} color={'green'} onClick={() => changeNameCansellation()}>Отмена</UIButton>
        </div>
    );
};

export default ChangeNameForm;