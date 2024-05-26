"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { IDataProfile } from "@/interfaces/profileData.interface"
import Cookies from "js-cookie"
import axios from "axios"
import Link from "next/link"

interface IAccountInfo {
    username: string
    avatar: string
    jwtToken: string
}

const AccountInfo = ({ username, avatar, jwtToken } : IAccountInfo) =>{
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [openAccountSettings, setOpenAccountSettings] = useState<boolean>(false)
    const [userData, setUserData] = useState<IDataProfile>()
    const [loading, setLoading] = useState<boolean>(true)
    const openSettings = () =>{
        setOpenAccountSettings(!openAccountSettings)
    }

    const signOut = () => {
        Cookies.remove("token")
        window.location.reload()
    }

    useEffect(() =>{
        const fetchData = async () => {
            const resData = {
                token: jwtToken
            }
          try {
            const response = await axios.post<IDataProfile>(`${API_URL}profile`,resData)
            const data = response.data
            setUserData(data)
            setLoading(false)
          } catch (error) {
            console.log(error)
          }
        }
        jwtToken && fetchData()
    },[])


    return(
        !loading ?
        <div className="relative flex items-center gap-[10px]">
            <Link href={"/profile"} className="flex gap-[10px] items-center">
                <Image
                    src={`data:image/png;base64, ${userData?.avatar}`}
                    alt="avatar"
                    width={38}
                    height={43}
                />
                <div className={`font-black tracking-[1.12px] w-[100px] overflow-ellipsis overflow-hidden select-none`}><span>{userData?.username}</span></div>
            </Link>
            <div 
                className={`border-[6px] border-transparent border-t-[9px] border-t-[#0F0E0E] mt-[8px] transition-all ${openAccountSettings ? "rotate-180 mt-0 mb-[12px]" : ""}`}
                onClick={openSettings}
            ></div>
            <div className={`${openAccountSettings ? "flex" : "hidden"} flex-col gap-[5px] pl-[6px] absolute bg-peach w-[130px] h-auto pt-[11px] pb-[14px] rounded-[15px] top-[135%] right-[-65px]`}>
                <div className="flex border-black border-b-[1px] pl-[4px] max-w-[120px] gap-[10px] font-robotoRegular text-[14px] text-black cursor-pointer select-none">
                    <Image
                        src={"/images/accountSettings/user.png"}
                        alt="user"
                        width={18}
                        height={18}
                        className="w-full max-w-[18px] max-h-[18px]"
                    />
                    Аккаунт
                </div>
                <div className="flex border-black border-b-[1px] pl-[4px] max-w-[120px] gap-[10px] font-robotoRegular text-[14px] text-black cursor-pointer select-none">
                    <Image
                        src={"/images/accountSettings/friends.png"}
                        alt="user"
                        width={18}
                        height={18}
                        className="w-full max-w-[18px] max-h-[18px]"
                    />
                    Друзья
                </div>
                <div className="flex border-black border-b-[1px] pl-[4px] max-w-[120px] gap-[10px] font-robotoRegular text-[14px] text-black cursor-pointer select-none">
                    <Image
                        src={"/images/accountSettings/settings.png"}
                        alt="user"
                        width={18}
                        height={18}
                        className="w-full max-w-[18px] max-h-[18px]"
                    />
                    Настройки
                </div>
                <div className="flex pl-[4px] max-w-[120px] gap-[10px] font-robotoBlack text-[14px] text-black cursor-pointer select-none" onClick={signOut}>
                    <Image
                        src={"/images/accountSettings/exit.png"}
                        alt="user"
                        width={18}
                        height={18}
                        className="w-full max-w-[18px] max-h-[18px]"
                    />
                    Выход
                </div>
            </div>
        </div>
        :
        <div className="loader">
           
        </div>
    )
}

export default AccountInfo