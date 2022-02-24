export interface IUser {
    isActive: boolean,
    _id: string
    username: string
    password: string
    name: string
    createdAt: string
}

export class UserInsertObject {
    username: string = ""
    password?: string
    name: string = ""
    _id?: string
}