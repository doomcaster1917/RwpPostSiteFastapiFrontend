import React, {useEffect, useState} from 'react';
import UIButton from "../../../UIkit/Button/UIButton";
import ChangeUserService from "../../../../services/changeUserServices/ChangeUserService";

const ChangePasswordForm = ({setChangePassState, setNotification}) => {

    const [oldPassword, setOldPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)

    async function change_password(){
        try {
            await ChangeUserService.changePassword(oldPassword, newPassword)
            setNotification("Пароль изменён")
        }catch (err){
            setNotification('Пароль не подходит')
        }
    }

    return (
        <div className={'EditForm'}>
            {<input type="text" onChange={e => {
                setOldPassword(e.target.value)
                setNotification('')
            }} placeholder="Введите старый пароль"/>}
            {<input type="text" onChange={e => {
                setNewPassword(e.target.value)
                setNotification('')
            }} placeholder="Введите новый пароль"/>}
            {<UIButton width={'85%'} height={'18%'} color={'green'} onClick={change_password}>Изменить пароль</UIButton>}
            {<UIButton width={'85%'} height={'18%'} color={'green'} onClick={() => setChangePassState(false)}>Отмена</UIButton>}
       </div>
    );
};

export default ChangePasswordForm;