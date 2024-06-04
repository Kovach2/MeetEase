import React from 'react'

interface ISettingItemChange{
    title: string
    openModal: (isOpen: boolean) => void
}

export default function SettingItemChange( {title, openModal} : ISettingItemChange) {
  return (
    <div className='h-[30px] border-b border-b-black flex justify-between items-center'>
        <div className='text-white text-[14px] font-bold'>{title}</div>
        <div className='rounded-full h-[24px] w-[24px] bg-[#D8E6EF] flex items-center justify-center cursor-pointer' onClick={() => openModal(true)}>
            <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 9.5H3.2125L8.1 4.6125L7.3875 3.9L2.5 8.7875V9.5ZM1.5 10.5V8.375L8.1 1.7875C8.2 1.69583 8.31042 1.625 8.43125 1.575C8.55208 1.525 8.67917 1.5 8.8125 1.5C8.94583 1.5 9.075 1.525 9.2 1.575C9.325 1.625 9.43333 1.7 9.525 1.8L10.2125 2.5C10.3125 2.59167 10.3854 2.7 10.4313 2.825C10.4771 2.95 10.5 3.075 10.5 3.2C10.5 3.33333 10.4771 3.46042 10.4313 3.58125C10.3854 3.70208 10.3125 3.8125 10.2125 3.9125L3.625 10.5H1.5ZM7.7375 4.2625L7.3875 3.9L8.1 4.6125L7.7375 4.2625Z" fill="black"/>
            </svg>
        </div>
    </div>
  )
}
