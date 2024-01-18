import React, {createContext, useEffect} from 'react';
import "./ParentObjcsStyles/App.css"
import {useState, useContext} from "react";
import AppRouter from "./AppRouter";
import $refresh from "./api/axiosRefresh";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import MainModal from "./pages/UIkit/ModalWindows/MainModal";
import ApearingWindow from "./pages/ExceptionWindows/ApearingWindow";


const App = () => {

    const {store} = useContext(Context)
    const [modalActive, setModalActive] = useState(false)


    async function refresh() {
        try {
            const response = await $refresh.post('/authentication/particalar_refresh')

            if (response.status === 200) {

                store.setAuth(true)
                localStorage.setItem('access_token', response?.data?.access_token)
                store.setUser(response?.data)

            }
        } catch (error) {
            console.log(error)
        }
    }
        useEffect(() => {
            refresh()
        }, [])

        return (
            <div className={'App'}>

            <AppRouter/>
            </div>
        );
    ;
}
export default observer(App);