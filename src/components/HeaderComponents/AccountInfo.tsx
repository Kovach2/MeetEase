"use client"

import Image from "next/image"
import { useState } from "react"

interface IAccountInfo {
    username: string
    avatar: string
}

const AccountInfo = ({username, avatar} : IAccountInfo) =>{
    const [openAccountSettings, setOpenAccountSettings] = useState<boolean>(false)

    const openSettings = () =>{
        setOpenAccountSettings(!openAccountSettings)
    }

    return(
        <div className="relative flex items-center gap-[10px]">
            <Image
                src={avatar}
                alt="avatar"
                width={38}
                height={43}
            />
            <div className="font-black tracking-[1.12px]">{username}</div>
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
                <div className="flex pl-[4px] max-w-[120px] gap-[10px] font-robotoBlack text-[14px] text-black cursor-pointer select-none">
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
    )
}

export default AccountInfo