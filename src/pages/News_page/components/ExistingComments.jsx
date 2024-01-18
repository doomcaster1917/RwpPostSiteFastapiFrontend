import React from 'react';
import Comment from "./Comment";
import CommentMaker from "./CommentMaker/CommentMaker";
// import '../article.css'
import '../components/Comment.css'
const ExistingComments = ({data, setNewCommentText, setCreatedComment, post_id, setMessage}) => {
    return (
        <div id={'existingComments'}>
            {data?.comments.length?<div className={'CommentContainer'}>
                {data?.comments?.map(element => <Comment text={element.comment_text} datetime={element.date_made} owner_name={element.nickname}
                                                         owner_avatar={element.avatar_path} owner_id={element.owner_id} is_owner_locked={element.is_owner_locked} comment_id={element.comment_id}
                                                         setNewCommentText={setNewCommentText} setMessage={setMessage} key={element.comment_id}> </Comment>)}

            </div>:''}
            {/**/}
            <CommentMaker setCreatedComment={setCreatedComment} post_id={post_id}></CommentMaker>
      </div>
    );
};

export default ExistingComments;