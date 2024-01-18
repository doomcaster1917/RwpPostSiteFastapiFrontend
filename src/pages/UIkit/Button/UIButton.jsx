import React from 'react';
import '../Button/UIbutton.css'

const UIButton = ({children, width, height, onClick, color='#FF0000'}) => {


    const UIwidth = width ? width : '185px'
    const UIheight = height ? height : '50px'
    const UIcolor = color ? color:'#FF0000'
    return (
        <button onClick={onClick} className={'UIbutton'} style={{width: UIwidth, height: UIheight, background:UIcolor}}>
            {children}
        </button>
    );
}
export default UIButton;