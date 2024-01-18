import React, {useContext, useState} from 'react';
import UiUserProfile from "../../../UIkit/UserProfile/UIUserProfile";
import UIButton from "../../../UIkit/Button/UIButton";
import '../../article.css'
import {Context} from "../../../../index";
import {useRef} from "react";

const CommentMaker = ({setCreatedComment, post_id}) => {

    const commentData = useRef()
    const [commentText, setCommentText] = useState()
    const {store} = useContext(Context)

    async function createComment(){
        const comment_text = commentData.current.value
        const result = await store.createComment(comment_text, post_id)
        if(result){
            setCreatedComment(result)
            commentData.current.value = ''
        }
        return result
    }

    return (
        <div id={'commentMaker'}>
        {store.isAuth&&!store.User.is_locked?<div id={'commentMaker'}>
            <div id={'userBox'}>
                <UiUserProfile></UiUserProfile>
                <UIButton onClick={createComment} width={'100%'}>Опубликовать</UIButton>
            </div>

            <textarea onChange={e => setCommentText(e.target.value)}></textarea>
        </div>:''}
        </div>
    );
};

export default CommentMaker;