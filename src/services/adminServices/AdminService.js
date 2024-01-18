import $api from "../../api/axios";

export default class AdminService {
   static async blockUser(userId, setMessage) {
        const response = await $api.patch(`/rwp_panel/block_user/${userId}`)
        if (response?.status === 200) {
            return
        }
    }

    static async unBlockUser(userId, setMessage) {
        const response = await $api.patch(`/rwp_panel/unblock_user/${userId}`)
        if (response?.status === 200) {
            return
        }
    }

    static async checkIsAdmin(){
        const response = await $api.post(`/rwp_panel/check_is_admin`)
        return response?.status === 200;
    }

    static async getAllUsersPages(){
        const response = await $api.get(`/rwp_panel/get_all_users`)
        return response?.status === 200?response.data:null;
    }

    static async getAllComments(){
        const response = await $api.get(`/comments/get_all_comments`)
        return response?.status === 200?response.data:null;
    }
}