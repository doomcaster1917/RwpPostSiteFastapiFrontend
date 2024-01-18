import React, {useContext} from 'react';
import UIAvatar from "../Avatar/UIAvatar";
import {Link} from "react-router-dom";
import './NotMainUserProfile.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {CURRENT_URL} from "../../../url_config";

const NotMainUserProfile = ({UIwidth, UIheight, UImargin, owner_id, nickName, image_path}) => {

    let link = `users/${owner_id}`
    return (
        <Link to={`${CURRENT_URL}/users/${owner_id}`} className={'userProfile'}>
            <div className={'userProfile'}  style={{
                background: '#01395e',
                width: UIwidth,
                height: UIheight,
                margin: UImargin,
                cursor: link ? "pointer" : "auto"
            }}>
                <img src={image_path}/>
                <div id={'nickname'} >{nickName}</div>
            </div>
        </Link>
    )
};

export default observer(NotMainUserProfile);