import React from 'react';
import './UIAvatar.css'

const UIAvatar = ({width, height, src}) => {

    const UIwidth = width ? width : '8vw'
    const UIheight = height ? height : '8vh'
    return (
        <div className={'UIAvatar'}>
            <img src={src} style={{width: UIwidth, height: UIheight}}/>
        </div>
    );
};

export default UIAvatar;