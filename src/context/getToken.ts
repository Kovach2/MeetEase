import { cookies } from "next/headers";

export default function getToken (){
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")
    return token
}