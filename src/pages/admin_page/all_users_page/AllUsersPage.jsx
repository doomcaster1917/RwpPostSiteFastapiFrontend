import React, {useEffect, useState} from 'react';
import UIUserProfile from "../../UIkit/UserProfile/UIUserProfile";
import './AllUsersPage.css'
import AdminService from "../../../services/adminServices/AdminService";
import NotMainUserProfile from "../../UIkit/NotMainUserProfile/NotMainUserProfile";

const AllUsersPage = () => {

    const [usersPages, setUsersPages] = useState([])
    async function getAllUsersPages(){
        const response = await AdminService.getAllUsersPages()

        setUsersPages(response)
    }

    useEffect(() => {
        getAllUsersPages()
    }, []);


    return (
        <div className={'AllUsersPage'}>
            {usersPages.length>0?usersPages.map(element =>
                <div id={'wrapper'}>
                <NotMainUserProfile nickName={element.nickname} UIheight={'12vh'}
                                    image_path={element.avatar_path} owner_id={element.id}></NotMainUserProfile>
                </div>
            ):null}
        </div>
    );
};

export default AllUsersPage;