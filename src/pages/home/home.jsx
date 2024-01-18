import React, {createContext, useContext, useRef, useState} from 'react';
import "./home.css"
import NewsService from "../../services/NewsService";
import {NavigateContext} from "../../store/store";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import HomePageText from "./components/static_part_of_page/HomePageText/HomePageText";
import MainPage from "./components/static_part_of_page/MainPage/MainPage";
import NewsMain from "./components/NewsMain/NewsMain";
import NewsMiniTape from "./components/NewsMiniTape/NewsMiniTape";


const Home = ({setFromHeader}) => {
    let fromHeader = useContext(NavigateContext)
    const NewsRef = useRef()
    const MainTextRef = useRef()
    const scrollView = (fromHeader?.fromHeader === 'News') ? NewsRef : MainTextRef
    const [newsArr, setNewsArr] = useState([])


    useEffect(() => {
        async function fetching() {
            const news = await NewsService.FetchPosts()
            setNewsArr(news)
        }
        fetching()

        if (fromHeader?.fromHeader) {

                window.scroll({
                    top: scrollView.current.offsetTop,
                    left: 0,
                    behavior: 'smooth',
                })
        }

        function clearState(Ypos) {
            if (Ypos > 500) {
                setFromHeader('')
            }
        }

       window.addEventListener("scroll", (event) => {
            clearState(window.scrollY);
        })
        return () => {
            window.removeEventListener("scroll", clearState);
        }
    }, [fromHeader])

    return (
        <div className={'home_page'}>
            <MainPage/>
            <NewsMiniTape news_objects_arr={newsArr}/>
            <HomePageText ref_obj={MainTextRef}/>
            <NewsMain ref_obj={NewsRef} news_objects_arr={newsArr}/>
        </div>
    );
};

export default observer(Home);