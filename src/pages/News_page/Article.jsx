import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './article.css'
import Comment from "./components/Comment";
import UIButton from "../UIkit/Button/UIButton";
import UiUserProfile from "../UIkit/UserProfile/UIUserProfile";
import NewsService from "../../services/NewsService";
import {useLocation} from "react-router-dom";
import {Context} from "../../index";
import {useContext} from "react";
import {useRef} from "react";
import {observer} from "mobx-react-lite";
import AddNews from "../admin_page/AddNews";
import MainModal from "../UIkit/ModalWindows/MainModal";
import CommentMaker from "./components/CommentMaker/CommentMaker";
import ExistingComments from "./components/ExistingComments";
import ApearingWindow from "../ExceptionWindows/ApearingWindow";

const Article = () => {

    const {store} = useContext(Context)
    const [data, setData] = useState()
    const [postIsOnUpdate, setPostIsOnUpdate] = useState(false)
    const [createdComment, setCreatedComment] = useState('')
    const [newCommentText, setNewCommentText] = useState('')
    const [message, setMessage] = useState('')
    const {post_id} = useParams()

    async function takeData(){
        const data = await NewsService.FetchPost(post_id).catch((error) =>{
            console.log(error?.response.message)
        })

        return data
    }

    async function updatePost(){
        setPostIsOnUpdate(true)
        //all function work happens in modal window from pages/admin_page/AddNews with overloading
        //ready component not to make new component
    }

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })

        async function getData(){
            const res = await takeData()

            setData(res)
            setMessage('')
            setNewCommentText('')
        }
        getData()
        }, [createdComment, newCommentText, message, postIsOnUpdate]);


    return (

        <div className={'article'}>
            {message&&<ApearingWindow>{message}</ApearingWindow>}
            {postIsOnUpdate&&<MainModal><AddNews fromModalText={data?.text} fromModalTitle={data?.title}
                                                 post_idFromModal={post_id} fromModal={true}
                                                 setPostIsOnUpdate={setPostIsOnUpdate} imageFromModal={data.img_path}></AddNews>
                <UIButton onClick={() => setPostIsOnUpdate(false)}>Выйти</UIButton>
            </MainModal>}

                    <div className={'picContainer'}>
                    <img id={'mainPic'} src={data?.img_path}/>
                    </div>


                    <div className={'p-wrapper'}>
                        <h1>{data?.title}</h1>
                        {data?.text}
                        <div className={'comment-wrapper'}>
                            <ExistingComments data={data} setNewCommentText={setNewCommentText}
                                              setCreatedComment={setCreatedComment} post_id={post_id} setMessage={setMessage}></ExistingComments>
                        </div>
                    </div>
            {store.User.is_admin?<UIButton color={'red'} onClick={updatePost}>Редактировать пост</UIButton>:''}

        </div>
    );
};

export default observer(Article);