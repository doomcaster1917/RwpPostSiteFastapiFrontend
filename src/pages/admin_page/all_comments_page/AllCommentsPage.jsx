import React, {useEffect, useState} from 'react';
import './allCommentsPage.css'
import Commentbox from "./Components/Commentbox";
import AdminService from "../../../services/adminServices/AdminService";



const AllCommentsPage = () => {

    const [comments, setComments] = useState([])
    const [deleted, setDeleted] = useState('')

    async function getAllComments(){
        const response = await AdminService.getAllComments()
        setComments(response)
        setDeleted('')
    }

    console.log(comments)

    useEffect(() => {
        getAllComments()
    }, [deleted]);

    return (
        <div className={'AllCommentsPage'}>
            {comments?.length>0? comments.map(element =>
            <div id={'wrapper'}>
            <Commentbox articleName={element.post_title}
                        commentText={element.comment_text}
                        avatar_path={element.owner_avatar} nickname={element.owner_nickname}
                        commentDate={element.comment_date} commentId={element.comment_id}
                        setDeleted={setDeleted} postId={element.post_id}
                        ownerId={element.owner_id}></Commentbox>
            </div>):null
            }
        </div>
    );
};

export default AllCommentsPage;