import $api from "../../api/axios";

export default class ChangeUserService {
    static async changeAvatar(file, user_id, setMessage) {
        const allowed_types = ['jpeg', 'png', 'JPG', 'jpg']
        if (!allowed_types.map((frmt) => {
            ((file.name.includes(frmt)))
        })) {
            setMessage('Неверный формат файла')
        } else {
            const formData = new FormData()
            formData.append("file", file)
            formData.append('user_id', user_id)
            const response = await $api.patch('/users/change_avatar', formData).catch((error) => {
                setMessage("Неизвестная ошибка")
            })
            return response?.data
        }

    }

    static async changePassword(user_password, new_password) {
        try{
        const data = {old_password: user_password, new_password: new_password}
        const response = await $api.patch(`/users/change_password`, data)

        if (response?.status === 200) {
            return true
        }

    } catch(error) {throw error}
    }

}