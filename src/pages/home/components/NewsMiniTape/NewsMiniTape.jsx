import React from 'react';
import "./NewsMiniTape.css";
import NewsMiniBlock from "./NewsMiniBlock";

const NewsMiniTape = ({news_objects_arr}) => {
    return (
        <div className={'NewsMiniTape'}>
            {news_objects_arr?.slice(0, 3).map(element => <NewsMiniBlock title={element.title} text={element.text}
                                                             image_path={element.img_path} post_id={element.id}
                                                             key={element.id}> </NewsMiniBlock>)}
        </div>
    );
};

export default NewsMiniTape;