import React from 'react';
import UIAvatar from "../../UIkit/Avatar/UIAvatar";
import './UserPageFromAdmin.css'
import UIUserCommentBox from "../../UIkit/UserCommentBox/UIUserCommentBox";

const UserPageFromAdmin = (props) => {
    return (
        <div className={'UserPageFromAdmin'}>
            <div id={'infowrapper'}>
                <UIAvatar src={require('../../../static/media/Sid.png')} height={'99%'} width={'99%'}></UIAvatar>
                <h3>Username</h3>
            </div>
            <div id={'commentsArea'}>
                <UIUserCommentBox commentText={'Да вы суки ебаные'} articleName={'Общество потребрения'}
                                  forAdmin={true}></UIUserCommentBox>
                <UIUserCommentBox commentText={'Да вы суки ебаные'} articleName={'Общество потребрения'}
                                  forAdmin={true}></UIUserCommentBox>
            </div>
        </div>
    );
};

export default UserPageFromAdmin;