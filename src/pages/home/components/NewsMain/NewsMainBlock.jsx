import React from 'react';
import './NewsMain.css'
import {Link} from "react-router-dom";

const NewsMainBlock = ({title, text, image_path, date, post_id}) => {
    const converted_date = date.slice(0,10).split("-")
    return (

        <Link className={'NewsMainBlock'} to={`/news/${post_id}`} state={{ post_id: post_id }}>

            <div>
                <h4>{title}</h4>
                <p>{text}</p>
                <p>{`${converted_date[2]}.${converted_date[1]}.${converted_date[0]}`}</p>
            </div>
            <img src={image_path} alt=""/>

        </Link>
    );
};

export default NewsMainBlock;