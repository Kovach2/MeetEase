'use client'

import Container from "./container";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface IAccountInfo {
    username: string
    avatar: string
}


const Logo = () => {
    return(
        <Link href={"/"} className="w-[175px] h-[45px] flex items-center justify-center bg-peach rounded-[30px]">
            <div className="font-JotiOne text-[30px]">MeetEase</div>
        </Link>
    )
}

const Nav = () => {
    return(
        <div className="flex justify-between w-full max-w-[300px] font-robotoBlack tracking-[1px]">
            <Link href={"/about"} className="relative text-[16px] hover:before:w-full before:absolute before:content-[''] before:h-[2px] before:bg-black before:bottom-0">О нас</Link>
            <Link href={"/"} className="relative text-[16px] hover:before:w-full before:absolute before:content-[''] before:h-[2px] before:bg-black before:bottom-0">Главная</Link>
            <Link href={"/faq"} className="relative text-[16px] hover:before:w-full before:absolute before:content-[''] before:h-[2px] before:bg-black before:bottom-0">FAQ</Link>
        </div>
    )
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

const SignUpSingIn = () =>{
    return(
        <div className="flex gap-[20px] w-[215px] items-center">
            <Link href={"/login"} className="w-1/2 text-white text-[16px] font-bold py-[8px] bg-[#0F0E0E] transition-all flex items-center justify-center rounded-[5px]">
                Войти
            </Link>
            <Link href={"/register"} className="w-1/2 max-w-[130px] text-[16px] font-robotoBlack">
                Зарегистрироваться
            </Link>
        </div>    
    )
}

export default function Header() {
    const jwtToken = Cookies.get("token")
    const [session, setSession] = useState<boolean>(false)


    useEffect(()=>{
        if(jwtToken){
            setSession(true)

        }
    },[jwtToken])

    return (
        <header className="w-full h-[70px] bg-yellow fixed">
            <Container className="h-full">
                <div className="flex h-full items-center justify-between">
                    <Logo />
                    <Nav />
                    {
                        session ?
                        <AccountInfo username={"Kovach"} avatar={"/images/accountIcon.png"}/>
                        :
                        <SignUpSingIn />
                    }
                </div>
            </Container>
        </header>
    )
}