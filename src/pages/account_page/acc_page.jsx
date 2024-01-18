import React, {useContext, useEffect} from 'react';
import {useState} from 'react'
import "./acc_page.css"
import UserCommentBox from "./components/UserCommentBox";
import ApearingWindow from "../ExceptionWindows/ApearingWindow";
import UIButton from "../UIkit/Button/UIButton";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import CommentService from "../../services/CommentService";
import ChangePasswordForm from "./components/ChangePasswordForm/ChangePasswordForm";
import ChangeNameForm from "./components/ChangeNameForm/ChangeNameForm";

const AccPage = () => {

    const {store} = useContext(Context)
    const [notification, setNotification] = useState('');
    const [AvatarChanged, setAvatarChanged] = useState()
    const [changeNicknameState, setChangeNicknameState] = useState()
    const [changePassState, setChangePassState] = useState()
    const [webSockTimeout, setWebSocketTimeout] = useState()
    const [userComments, setUserComments] = useState([])
    const [file, setFile] = useState(null)
    const userId = localStorage.getItem("user_id")
    const navigate = useNavigate()

    async function ChangeAvatar(){
        await store.changeAvatar(file, setAvatarChanged, setNotification)
    }

    async function change_name_starter(){
        setChangeNicknameState(true)
        await store.openWS(store.User.id, setWebSocketTimeout)
    }

    useEffect(() => {
        async function fetching() {
            const comments = await CommentService.getUserComments(userId)
            setUserComments(comments)
        }
        fetching()

    }, [AvatarChanged, notification]);

    return (
        <div className={'accountPage'}>
            {notification&&<ApearingWindow>{notification}</ApearingWindow>}
            <div className={'avatarWrapper'}>
                <div className={'avatar'}>
                    <img src={store.User.avatar_path? store.User.avatar_path : require('../../static/media/empty_user_avatar.png')}/>
                    <div id={'add_avatar_btn'}>
                        <input onChange={e => setFile(e.target.files[0])} type="file"/>
                    </div>
                </div>
                {file && <UIButton onClick={ChangeAvatar}>Загрузить</UIButton>}
            </div>

            <div className={'info_wrapper'}>
                <div id={'name'}>{store.User.nickname}</div>
                <div id={'email'}>{store.User.email}</div>
                {changeNicknameState&&<ChangeNameForm setWebSocketTimeout={setWebSocketTimeout}
                                                      changeNicknameState={changeNicknameState}
                                                      webSockTimeout={webSockTimeout}
                                                      setChangeNicknameState={setChangeNicknameState}/>}
                <UIButton width={'70%'} height={'10%'} onClick={change_name_starter}>Изменить имя(логин)</UIButton>
                {changePassState&&<ChangePasswordForm setChangePassState={setChangePassState} setNotification={setNotification}/>}
                <UIButton width={'70%'} height={'10%'} onClick={() => setChangePassState(true)}>Изменить пароль</UIButton>
                <UIButton width={'70%'} height={'10%'} onClick={() => {store.logout(); navigate("/home")}}>Выйти</UIButton>
            </div>


            <div className={'UserCommentBoxesContainer'}>
               {userComments?.map(element => <UserCommentBox articleName={element.title} commentText={element.comment_text}
                                                             comment_date={element.comment_date} post_img={element.post_img}
                                                             post_id={element.post_id} key={element.comment_id}> </UserCommentBox>)}
           </div>
        </div>


    )

};

export default observer(AccPage);