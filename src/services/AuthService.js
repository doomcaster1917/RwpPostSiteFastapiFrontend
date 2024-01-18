import $api from "../api/axios";
import axios from "axios";
import {CURRENT_URL} from "../url_config";

export default class AuthService {
    static async login(email, password) {
        try{
        return await $api.post('authentication/login', {email: email, password: password}, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        })
        } catch (error){throw error}
    }

    static async registration (nickname, email, password){
            return await axios.post(`${CURRENT_URL}/registration`, {nickname: nickname, email: email, password:password})
    }

    static async logout(){
        localStorage.clear()
    }

}