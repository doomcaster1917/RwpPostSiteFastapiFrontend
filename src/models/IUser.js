export class IUser {
    constructor (id, nickname, email, avatar_path, is_admin, is_locked)  {
        this.id =  id
        this.email =  email
        this.nickname =  nickname
        this.avatar_path =  avatar_path
        this.is_admin = is_admin
        this.is_locked =  is_locked
    }

}