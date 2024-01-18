import $api from "../api/axios";
import axios from "axios";
import {CURRENT_URL} from "../url_config";

export default class NewsService {
    static async CreatePost(title, text, image, setException) {
        const allowed_types = ['jpeg', 'png', 'JPG', 'jpg']
        if (!allowed_types.map((frmt) => {
            ((image.current.files[0]?.name.includes(frmt)))
        })) {
            setException('Неверный формат файла')
        } else {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('full_text', text)
            formData.append("file", image.current.files[0])
            const response = await $api.post('/posts/create_post', formData).catch((error) => {
                console.log(error.response.status)
                console.log(error.response.message)
            })
            if(response?.status === 200) return true
        }

    }

    static async UpdatePost(title, text, image, setException, post_id, currentImage){
        const allowed_types = ['jpeg', 'png', 'JPG', 'jpg']
        if (!allowed_types.map((frmt) => {
            ((image.current.files[0]?.name.includes(frmt)))
        })) {
            setException('Неверный формат файла')
        } else {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('text', text)
            formData.append("file", image.current.files[0]?image.current.files[0]:currentImage)
            console.log(`/posts/update_post/${post_id}`)
            const response = await $api.patch(`/posts/update_post/${post_id}`, formData).catch((error) => {
                console.log(error.response.status)
                console.log(error.response.message)
            })
            if(response?.status === 200) return true
        }

    }

    static async DeletePost(post_id){
        const response =  await $api.delete(`/posts/delete_post/${post_id}`).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.message)
        })
        if(response?.status === 200) return true
    }

    static async FetchPosts(){
        const response = await $api.get('/posts').catch((error) => {
            console.log(error?.response)
        })
        return response?.data
    }

    static async FetchPost(post_id){
        const response = await $api.get(`/posts/${post_id}`).catch((error) => {
            console.log(error?.response)
        })
        return response?.data
    }
}