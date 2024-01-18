import UIButton from "../UIkit/Button/UIButton";
import React, {useContext, useEffect, useRef, useState} from 'react';
import NewsService from "../../services/NewsService";
import './AdminPage.css'
import ApearingWindow from "../ExceptionWindows/ApearingWindow";
import {redirect} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const AddNews = ({setException, fromModalText, fromModalTitle, post_idFromModal, fromModal, setPostIsOnUpdate, imageFromModal}) => {

    const title = useRef(null)
    const fulltext = useRef(null)
    const file = useRef(null)
    const [filename, setFilename] = useState(null)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    async function changeArticle(e) {
        e.preventDefault()
        setMessage('')
            const changed = await NewsService.UpdatePost(title.current.value, fulltext.current.value, file, setException, post_idFromModal, imageFromModal)
            if (changed) {
                console.log('updated')
                setPostIsOnUpdate(false)
            }
        }


    async function sendArticle(e){
        e.preventDefault()
        const created = await NewsService.CreatePost(title.current.value, fulltext.current.value, file, setException)
        if (created) {
            console.log('Пост опубликован')
            setMessage('Пост опубликован')
            title.current.value = ''
            fulltext.current.value = ''
            setFilename('')
        }
    }

    async function deleteArticle(e){
        e.preventDefault()
        const deleted = await NewsService.DeletePost(post_idFromModal)
        if (deleted){
            setPostIsOnUpdate(false)
            navigate('/home')
        }
    }


    return (
        <form className={'AddNews'} onSubmit={fromModal?null:sendArticle}>
            {message&&<ApearingWindow>{message}</ApearingWindow>}
            <input ref={title} type="text" defaultValue={fromModalTitle?fromModalTitle:''} maxLength="250"
                   placeholder="Заголовок"/>
            <textarea ref={fulltext} defaultValue={fromModalText?fromModalText:''} placeholder="Введите текст статьи"></textarea>
            {fromModal?<UIButton width={'25%'} height={'8%'} onClick={changeArticle}>Изменить новость</UIButton>:
                <UIButton width={'25%'} height={'8%'} onClick={sendArticle}>Добавить новость</UIButton>}
            {fromModal&&<UIButton width={'25%'} height={'8%'} onClick={deleteArticle}>Удалить новость</UIButton>}
            <div id={'addPic'}>
                <input ref={file}  type='file' accept="image/png, image/JPG, image/jpeg"
                       onChange={() => setFilename(file.current.files[0]?.name)}></input>
            </div>
            <div id={'infoBlock'}>{filename}</div>

        </form>
    );
};

export default AddNews;