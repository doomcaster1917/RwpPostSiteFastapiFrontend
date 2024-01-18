import React from 'react';
import "./NewsMain.css";
import NewsMainBlock from "./NewsMainBlock";

const NewsMain = ({ref_obj, news_objects_arr}) => {
    return (
        <div ref={ref_obj} className={'HomeMainNews'}>
            <h2>Новости:</h2>
            {news_objects_arr?.map(element => <NewsMainBlock title={element.title} text={element.text} image_path={element.img_path}
                                                 date={element.date_made} post_id={element.id} key={element.id}> </NewsMainBlock>)}

        </div>
    );
};

export default NewsMain;