import $api from "../api/axios";
import axios from "axios";
import {CURRENT_URL} from "../url_config";

export default class CommentService {
    static async createComment(comment_text, owner_id, post_id){
        const data = {text: comment_text, owner_id: owner_id, post_id: post_id}
        const response = await $api.post('/comments/create_comment', data).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.message)
        })
        if(response?.status === 200) return comment_text
    }


    static async editComment(new_comment_text, comment_id){
        const data = {new_comment_text: new_comment_text, comment_id: comment_id}
        const response = await $api.patch('/comments/edit_comment', data).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.message)
        })
        if(response?.status === 200) return response
    }

    static async getUserComments(user_id){
        const response = await $api.get(`/users/get_comments/${user_id}`).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.message)
        })
        if(response?.status === 200) return response.data
    }

    static async deleteComment(comment_id){
        const response = await $api.delete(`/comments/delete_comment/${comment_id}`).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.message)
        })
        if(response?.status === 200) return true
    }

}