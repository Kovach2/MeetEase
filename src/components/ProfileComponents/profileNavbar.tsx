"use client"

import React, { useEffect, useState } from 'react'

interface IProfileNavbarItem{
    text: string
    activeItem: string
    setActiveItem: (text: string) => void
}

interface IProfileNavbar{
    setActiveSection: (text: string) => void
    activeSection: string
}

const ProfileNavbarItem = ({text, activeItem, setActiveItem} : IProfileNavbarItem) =>{
    return(
        <div 
            className={`${text === activeItem && "bg-white"} border-r-[1px] sm:text-[13px] border-black last:border-none w-1/3 h-[38px] flex items-center justify-center first:rounded-l-[15px] last:rounded-r-[15px] hover:bg-white transition-all cursor-pointer font-semiBold text-[16px] select-none`}
            onClick={() => setActiveItem(text)}
        >
            {text}
        </div>
    )
}


export default function ProfileNavbar({setActiveSection, activeSection} : IProfileNavbar) {
    const items = ['Аккаунт', "Друзья", "Настройки"]
    const [activeItem, setActiveItem] = useState<string>(activeSection)

    useEffect(() =>{
        setActiveSection(activeItem)
    },[activeItem, setActiveSection])

  return (
    <div className='bg-[#5D7581] w-full max-w-[960px] rounded-[15px] flex shadow-[-5px_5px_4px_0px_rgba(0,0,0,0.25)]'>
        {
            items.map((item, index) => {
                return(
                    <ProfileNavbarItem key={index} text={item} activeItem={activeItem} setActiveItem={setActiveItem}/>
                )
            })
        }
    </div>
  )
}
