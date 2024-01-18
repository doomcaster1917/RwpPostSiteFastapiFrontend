import React, {useContext, useEffect, useState} from 'react';
import './Comment.css'
import NotMainUserProfile from "../../UIkit/NotMainUserProfile/NotMainUserProfile";
import {Context} from "../../../index";
import CommentRedactor from "./CommentRedactor/CommentRedactor";
import AdminService from "../../../services/adminServices/AdminService";
import CommentService from "../../../services/CommentService";

const Comment = ({text, datetime, owner_name, owner_avatar,
                     owner_id, comment_id, setNewCommentText, is_owner_locked, setMessage}) => {

    const {store} = useContext(Context)
    const [editingComment, setEditingComment] = useState(false)
    async function deleteComment(){
        await CommentService.deleteComment(comment_id)
        setNewCommentText('1')
    }

    async function blockUser(){
        await AdminService.blockUser(owner_id)
        setMessage('Пользователь заблокирован')
    }

    async function unBlockUser(){
        await AdminService.unBlockUser(owner_id, setMessage)
        setMessage('Пользователь разблокирован')
    }

    return (
        <div className={'Comment'}>
            <div id={'userPart'}>
            <NotMainUserProfile nickName={owner_name} UIheight={'12vh'}
                           image_path={owner_avatar} owner_id={owner_id}></NotMainUserProfile>
            <p>{datetime}</p>
            </div>
            {editingComment?<CommentRedactor lasttext={text} setEditingComment={setEditingComment} comment_id={comment_id} setNewCommentText={setNewCommentText} ></CommentRedactor>:
                <div id={'comment_text'}>{text}
                {(store.User.id==owner_id)||(store.User.is_admin)?
                    <div id={'editButton'}>
                    <div id={'appearingList'}>
                        <button onClick={deleteComment} className={'appearingButton'}>Удалить</button>
                        {store.User.id==owner_id?<button onClick={() => setEditingComment(true)} className={'appearingButton'}>Редактировать</button>:''}
                        {store.User.is_admin&&store.User.id!=owner_id&&!is_owner_locked?<button onClick={blockUser} className={'appearingButton'}>Заблокировать</button>:''}
                        {store.User.is_admin&&is_owner_locked?<button onClick={unBlockUser} className={'appearingButton'}>Разблокировать</button>:''}
                    </div>
                    </div>:''}
            </div>}
        </div>
    );
};

export default Comment;