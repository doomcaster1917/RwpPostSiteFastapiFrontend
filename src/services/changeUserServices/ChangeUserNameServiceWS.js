import axios from "axios";
import {CURRENT_WS_URL} from "../../url_config";
import {CURRENT_URL} from "../../url_config";
import {useContext} from "react";
import {Context} from "../../index";
import {useRef} from "react";
import $api from "../../api/axios";


export default class ChangeUserNameServiceWS {

    constructor(user_id, setWsTimeout) {
        setWsTimeout(false)
        this.ws = new WebSocket(`ws://${CURRENT_WS_URL}/users/check_name/${user_id}/ws`)
        this.ws.onopen = () => console.log('ws on id opened')
        this.ws.onclose = () => {console.log('websocket closed'); setWsTimeout(true)}
    }

    async CheckExistingName(NewName, setMessage, setWsTimeout) {
        this.ws.send(NewName)
        this.ws.onmessage = (event) => {
            const data = event.data ? event.data : ''
            console.log(data)
            if ((data)&&(data !== 'timeout')){
                setMessage(`Имя ${NewName} уже существует`)
             } else if (data === 'timeout'){
                setWsTimeout(true)
            }
        }
    }
    async changeNickName(NewName) {
        try{
            const response= await $api.patch(`/users/change_name`, {new_name: NewName}, {'Content-Type':
                    'application/json'})
            if(response.status === 200) {
                return response.data
                this?.ws?.send('Name changed')
            }
        } catch(error){

            console.log(error)
        }}

    async websoketClose(){
        try{
            this.ws?.close()
            return true
        } catch(error){
            throw error
        }
    }
}

