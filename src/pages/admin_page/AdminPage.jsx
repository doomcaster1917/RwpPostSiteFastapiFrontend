import React, {useContext, useEffect, useRef, useState} from 'react';
import UIAvatar from "../UIkit/Avatar/UIAvatar";
import UIButton from "../UIkit/Button/UIButton";
import {useNavigate} from "react-router-dom";
import './AdminPage.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import $api from "../../api/axios";
import ApearingWindow from "../ExceptionWindows/ApearingWindow";
import AddNews from "./AddNews";

const AdminPage = () => {

    const {store} = useContext(Context)
    const navigate = useNavigate();
    const [exception, setException] = useState()
    const avatarFile = useRef(null)
    const [avatarFiletaken, setAvatarFileTaken] = useState(false)
    const [AvatarChanged, setAvatarChanged] = useState()
    const [newName, setNewName] = useState()
    const [wsTimeOut, setWsTimeout] = useState()
    const [nicknameChanged, setNicknameChanged] = useState()
    const [changeNameField, setChangeNameField] = useState()

    async function changeAvatar(){
        const allowed_types = ['jpeg', 'png', 'JPG', 'jpg']
        if (!allowed_types.map( (frmt) => {(avatarFile.current.files[0]?.name.includes(frmt))})) {
           setException('Неверный формат файла')
        }else {
            const formData = new FormData()
            formData.append("file", avatarFile.current.files[0])
            formData.append('user_id', store.User.id)
            $api.post('/users/change_avatar', formData).then(response => {
                store.User.avatar_path = response?.data
                setAvatarChanged(true)
            })
        }

    }

    async function event_wrapper(event){
        setNewName(event)
        await store.checkNickname(event,  setException, setWsTimeout)
    }

    async function change_name_wrapper(){
        if (await store.changeNickName(newName)){
            setNicknameChanged(true)
        }
    }

    async function checkIsAdmin(){
        if(!await store.checkIsAdmin()){
            navigate("/home")
        }
    }


    useEffect(() => {
        checkIsAdmin()

        if(AvatarChanged) {
            setAvatarFileTaken(null)
            setAvatarChanged(null)
        }
        if(nicknameChanged){
            setNicknameChanged(null)
            setChangeNameField(false)
        }
        if (wsTimeOut){
            setNicknameChanged(null)
            setChangeNameField(false)
        }

    }, [wsTimeOut, nicknameChanged, AvatarChanged, exception]);


    return (
        <div className={'AdminPage'}>
            {exception&&<ApearingWindow>{exception}</ApearingWindow>}
            <div className={'leftWrappper'}>
                <div className={'avatarWrapper'}>
                    <div className={'avatar'}>
                    <img src={store.User.avatar_path?store.User.avatar_path:require('../../static/media/empty_user_avatar.png')}/>
                    <div id={'addAvatar'}>
                        <input ref={avatarFile}  onChange={() => setAvatarFileTaken(true)} type="file"/>
                        </div>
                    </div>
                    {avatarFiletaken&&<UIButton onClick={changeAvatar}>Загрузить</UIButton>}
                </div>

                <UIButton width={'75%'} onClick={() => navigate("/admin/all_comments_page")}>Смотреть все
                    комментарии</UIButton>
                <UIButton width={'75%'} onClick={() => navigate("/admin/all_users_page")}>Смотреть все страницы
                    пользователей</UIButton>
            </div>
            <div className={'rightWrapper'}>
                <div class={'info'}>
                    <div id={'nameField'}>{store.User.nickname}</div>
                    {changeNameField&&<input onChange={e => {event_wrapper(e.target.value); exception&&setException('')}} type="text" placeholder="Введите новое имя" />}
                    {!changeNameField&&<UIButton width={'30%'} height={'30%'} onClick={() =>{setChangeNameField(true); store.openWS(store.User.id, setWsTimeout)}}>Изменить имя(логин)</UIButton>}
                    {changeNameField&&<UIButton width={'30%'} height={'30%'} color={'green'} onClick={change_name_wrapper}>Изменить имя(логин)</UIButton>}
                    {changeNameField&&<UIButton width={'30%'} height={'30%'} color={'green'} onClick={() => setChangeNameField(false)}>Отмена</UIButton>}

                </div>
                <div className={'News'}>
                    <AddNews setException={setException}></AddNews>
                </div>


            </div>

        </div>
    );
};

export default observer(AdminPage);