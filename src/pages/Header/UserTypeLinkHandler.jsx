// Produce cabinet link for each type/status of user. Pass jwt token (hash||null if not authenticated) to backend -> backend return
//type of user -> produce Link in header for this type. For example: admin panel link is user is admin or login/reg page user haven't jwt
//or jwt_refresh is older than 30-days period.
import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const UserTypeLinkHandler = () => {
    const {store} = useContext(Context)
    return (
        <div>
            {store.isAuth&&!store.User.is_admin ? <Link to="/account"><img src={require('../../static/media/authentication_img.png')}></img></Link>:
                store.User.is_admin?<Link to="/admin"><img src={require('../../static/media/authentication_img.png')}></img></Link>:
                    <Link to="/login"><img src={require('../../static/media/authentication_img.png')}></img></Link>}
        </div>
    );
};

export default observer(UserTypeLinkHandler);