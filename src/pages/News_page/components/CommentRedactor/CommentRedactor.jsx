import React, {useRef} from 'react';
import UIButton from "../../../UIkit/Button/UIButton";
import CommentService from "../../../../services/CommentService";

const CommentRedactor = ({lasttext, setEditingComment, comment_id, setNewCommentText}) => {

    const textValue = useRef('')
    async function saveEditedComment(){
        const newCommentText = textValue.current.value
        const result = await CommentService.editComment(newCommentText, comment_id)
        if(result) {
            setEditingComment(false)
            setNewCommentText(newCommentText)
        }
        }

    return (
        <div className={'CommentRedactor'}>
            <textarea ref={textValue} defaultValue={lasttext}></textarea>
            <UIButton onClick={saveEditedComment}>Сохранить</UIButton>
            <UIButton onClick={() => setEditingComment(false)}>Отмена</UIButton>
        </div>
    );
};

export default CommentRedactor;