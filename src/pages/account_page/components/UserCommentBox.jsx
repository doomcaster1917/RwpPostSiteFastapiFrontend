import React from 'react';
import './userCommentBox.css'
import {Link} from "react-router-dom";

const UserCommentBox = ({articleName, commentText, post_img, comment_date, post_id}) => {

    return (
        <div className={'UserCommentBox'}>
            <div id={'articleName'}><img src={post_img} alt=""/>{articleName}</div>
            <div id={'commentText'}>{commentText}, {comment_date}</div>
            <button id={'edit'}>Редактикровать</button>
            <button id={'delete'}>Удалить</button>
            <Link to={`/news/${post_id}`} id={'toArticle'}>Перейти к статье</Link>
        </div>
    );
};

export default UserCommentBox;