import React from 'react';
import UIUserProfile from "../../../UIkit/UserProfile/UIUserProfile";
import {Link} from "react-router-dom";
import './CommentBox.css'
import UIButton from "../../../UIkit/Button/UIButton";
import NotMainUserProfile from "../../../UIkit/NotMainUserProfile/NotMainUserProfile";
import CommentService from "../../../../services/CommentService";

const Commentbox = ({nickname, avatar_path, articleName, commentText, commentDate, commentId, setDeleted, postId, ownerId}) => {

    async function deleteComment(){
        const deleted = await CommentService.deleteComment(commentId)
        if(deleted){
            setDeleted(commentText)
        }
    }

    return (
        <div className={'CommentBox'}>
            <div className={'user'}>
                <NotMainUserProfile nickName={nickname} image_path={avatar_path} UIwidth={'95%'}
                               UIheight={'95%'} owner_id={ownerId}></NotMainUserProfile>
                <UIButton width={'6vw'} onClick={deleteComment}>Удалить</UIButton>
            </div>

            <Link className={'TextsBox'} to={`/news/${postId}`} state={{ postId: postId }}>
                <div id={'articleName'}>{articleName}</div>
                <div id={'commentText'}>{commentText}<br/><br/>{commentDate}</div>
            </Link>

        </div>
    )
};

export default Commentbox;