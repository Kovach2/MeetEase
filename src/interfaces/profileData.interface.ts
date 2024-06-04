export interface IDataProfile {
    username: string
    email: string
    avatar: string
    friends: {
        username: string
        avatar: string
    }[]
    conferences: string[]
}