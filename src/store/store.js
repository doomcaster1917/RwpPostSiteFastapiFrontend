import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import $refresh from "../api/axiosRefresh";
import {createContext} from 'react';
import AuthService from "../services/AuthService";
import ChangeUserNameServiceWS from "../services/changeUserServices/ChangeUserNameServiceWS";
import CommentService from "../services/CommentService";
import ChangeUserService from "../services/changeUserServices/ChangeUserService";
import AdminService from "../services/adminServices/AdminService";


export default class Store {

    User = IUser
    isAuth = false
    errorText = ''

    constructor() {
        makeAutoObservable(this)
    }

    setErrorText(text) {
        this.errorText = text;
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(...args) {
        const data = args[0]
        this.User = new IUser(data.id, data.nickname, data.email,
             data.avatar_path, data.is_admin, data.is_locked)
        localStorage.setItem("user_id", data.id)
    }

    setNewUsername(name){
        this.User.nickname = name
    }

    async registration(nickname, email, password, setException, navigate){
        console.log(setException)
        try{
        const response = await AuthService.registration(nickname, email, password)
            if(response.status === 200){
                return true
            };
        } catch (error) {
            console.log(error)
            if (error?.response?.status === 406) {
                setException('Неправильный пароль или email')
            } else {
                setException('Неизвестная ошибка')
            }
        }

    }


    async login(email, password, setNotification, navigate, event) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response?.data?.access_token)
            console.log(response?.data?.refresh_token)
            localStorage.setItem('access_token', response?.data?.access_token)
            localStorage.setItem('refresh_token', response?.data?.refresh_token)
            this.setUser(response?.data)
            this.setAuth(true)
            if (response.status === 200) {
                navigate('/account')
            }

        } catch (error) {
            console.log(error)
            if (error?.response?.status === 401) {
                setNotification('Неправильный пароль или email')
            } else {
                setNotification('Неизвестная ошибка')
            }


        }
    }

    async logout(){
        localStorage.clear()
        this.setUser([])
        this.setAuth(false)
    }
    async openWS(user_id, setWsTimeout){
        this.NickChanger = new ChangeUserNameServiceWS(user_id, setWsTimeout)
    }

    async closeWS(setNotification){
        try {
            await this.NickChanger.websoketClose()
        } catch (error) {
            console.log(error)
            setNotification("Неизвестная ошибка")
        }
    }

    async checkNickname(NewName, setException, setWsTimeout){
        try {
             await this.NickChanger.CheckExistingName(NewName, setException, setWsTimeout)
        } catch (error) {
            console.log(error)
        }
    }

    async changeNickName(NewName) {
        try{
        const changed_name = await this.NickChanger.changeNickName(NewName)
            if(changed_name) {
                this.setNewUsername(changed_name)
                return true
            }
        } catch(error){
        console.log(error)
    }}

    async changeAvatar(file, setAvatarChanged, setException){
        this.User.avatar_path = await ChangeUserService.changeAvatar(file, this.User.id, setException)
        setAvatarChanged(true)
    }

    async createComment(comment_text, post_id){
        const result = await CommentService.createComment(comment_text, this.User.id, post_id)
        return result
    }

    async checkIsAdmin(){
        return await AdminService.checkIsAdmin()
    }
    async checkAuth(){
        const response = await $refresh.post(`/authentication/refresh`).catch((e)=> console.log(e))

        if(response?.status === 200) {
            localStorage.setItem('access_token', response?.data?.access_token)
            this.setAuth(true)
            console.log(response?.data)
            this.setUser(response?.data?.user)
        }
        else{
            this.setAuth(false)
        }
    }
}
export const NavigateContext = createContext(null)