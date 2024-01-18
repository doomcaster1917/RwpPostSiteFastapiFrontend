import React from 'react';
import './userCommentBox.css'
import {Link} from "react-router-dom";

const UIUserCommentBox = ({articleName, commentText, articleLink, forAdmin}) => {

    return (
        <Link to={articleLink} className={'UserCommentBox'}>

            <div id={'articleName'}>{articleName}</div>
            <div id={'commentText'}>{commentText}</div>
            {forAdmin ? <div></div> : <button id={'edit'}>Редактикровать</button>}
            <button id={'delete'}>Удалить</button>
        </Link>
    );
};

export default UIUserCommentBox;