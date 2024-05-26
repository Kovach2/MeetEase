import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Unauthorized(){
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")
    !token && redirect("/")
}