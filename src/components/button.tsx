"use client"

import React, { useState } from 'react';

export default function Button({children, className} : {children:React.ReactNode, className?:string}) {
    return (
        <div className={`bg-black w-full max-w-[170px] text-white cursor-pointer flex items-center justify-center h-[40px] rounded-[5px] font-semiBold ${className}`}>
            {children}
        </div>
    );
}

export function CodeInput({placeholder, className} : {placeholder:string, className?: string}) {

    const [confCode, setConfCode] = useState<string>("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setConfCode(event.target.value)
    }


    return (
        <div className='h-[40px] w-full flex gap-[15px] items-center'>
            <input 
                type="text" 
                placeholder={placeholder} 
                className={`h-full w-full text-center rounded-[5px] focus:outline-none ${className}`}
                value={confCode}
                onChange={handleChange}
            />
            <div className={`text-[#A8A8A8] px-0 transition-all font-semiBold select-none rounded-[5px] ${confCode && "text-blue-800 cursor-pointer hover:bg-blue-200 h-full flex items-center !px-[10px]"}`}>Присоединиться</div>
        </div>
    );
}