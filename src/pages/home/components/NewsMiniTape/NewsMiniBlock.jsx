import React from 'react';
import './NewsMiniTape.css'
import {Link} from "react-router-dom";

const NewsMiniBlock = ({title, text, image_path, post_id}) => {
    return (
        <Link className={'NewsMiniBlock'} to={`/news/${post_id}`} state={{ post_id: post_id }}>
            <div>
                <h4>{title}</h4>
                <p>{text}</p>

            </div>
            <img src={image_path} alt=""/>
        </Link>
    );
};

export default NewsMiniBlock;