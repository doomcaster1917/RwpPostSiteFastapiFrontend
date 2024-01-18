import React, {useContext} from 'react';
import UIAvatar from "../Avatar/UIAvatar";
import {Link} from "react-router-dom";
import './UIUserProfile.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const UiUserProfile = ({UIwidth, UIheight, UImargin, link}) => {

    const {store} = useContext(Context)

    return (
        <Link to={link} className={'userProfile'}>
            <div className={'userProfile'} style={{
                background: '#01395e',
                width: UIwidth,
                height: UIheight,
                margin: UImargin,
                cursor: link ? "pointer" : "auto"
            }}>
                <img src={store.User?.avatar_path}/>
                <div id={'nickname'}>{store.User?.nickname ? store.User.nickname: ''}</div>
            </div>
        </Link>
    )
};

export default observer(UiUserProfile);