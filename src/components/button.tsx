"use client"

import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Button({children, className, onClick} : {children:React.ReactNode, className?:string, onClick?: () => void}) {
    return (
        <div className={`bg-black w-full max-w-[170px] text-white cursor-pointer flex items-center justify-center h-[40px] rounded-[5px] font-semiBold min-w-[160px] ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

export function CodeInput({placeholder, className, token} : {placeholder:string, className?: string, token: string}) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [confCode, setConfCode] = useState<string>("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setConfCode(event.target.value)
    }

    const handleButtonConnect = async () => {
        toast.remove()
        const sendData ={
            token: token,
            conferenceId: confCode
        }
        const response = await axios.post(`${API_URL}conference/find`, sendData)
        const data = response.data

        console.log(data)

        if(confCode.length === 10 && data.success){
            window.location.assign("/conference/" + confCode)
        }else{
            toast.error("Некорректный код конференции")
        }
    }

    return (
        <div className='h-[40px] s:h-[95px] w-full flex s:flex-col gap-[15px] items-center'>
            <input 
                type="text" 
                placeholder={placeholder} 
                className={`h-full w-full s:h-[40px] text-center min-w-[160px] rounded-[5px] focus:outline-none ${className}`}
                value={confCode}
                onChange={handleChange}
            />
            <div className={`text-[#A8A8A8] s:h-[40px] s:w-full s:flex s:items-center s:justify-center px-0 transition-all font-semiBold select-none rounded-[5px] ${confCode && "text-blue-800 cursor-pointer hover:bg-blue-200 h-full flex items-center !px-[10px]"}`} onClick={handleButtonConnect}>Присоединиться</div>
        </div>
    );
}