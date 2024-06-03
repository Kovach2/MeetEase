import React, { useEffect } from 'react'
import Image from 'next/image'



interface IFriendItem {
    notUserFriend?: boolean
}

interface IFriendsList{
    friendList: {
        username: string
        avatar: string
    }[] | undefined
}

const FriendSeacrh = () =>{
    return(
        <div className='flex justify-center items-center mb-[15px]'>
            <div className='relative'>
                <input 
                    type="text" 
                    className='block bg-inherit focus:outline-none border-b-[1px] placeholder:text-opacity-[.46] placeholder:text-[#000000] placeholder:text-[14px] border-b-black w-[250px] pl-[10px] pb-[2px] pr-[30px] font-bold text-[#000000]' 
                    placeholder='Поиск...'
                />
                <svg className='cursor-pointer block absolute bottom-[3px] right-0' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#E8EAED"/>
                </svg>
            </div>
        </div>
    )
}

const FriendItem = ( { notUserFriend } : IFriendItem) => {
    return(
        <div className='flex justify-between items-center border p-[5px] rounded-2xl'>
            <div className='flex items-center gap-[15px] select-none'>
                <Image
                    width={40}
                    height={45}
                    alt='avatar'
                    src={"/images/accountIcon.png"}
                />
                <div className='text-[16px] font-bold text-[#0F0E0E]'>Kovach</div>
            </div>
            <div className='flex justify-center items-center w-[30px] h-[30px] bg-[#C6D6E0] rounded-full cursor-pointer'>
                {
                    notUserFriend ?
                    <svg width="24" height="24" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.44175 13.0625L9.50008 11.0042L11.5584 13.0625L12.6667 11.9542L10.6084 9.89583L12.6667 7.8375L11.5584 6.72917L9.50008 8.7875L7.44175 6.72917L6.33341 7.8375L8.39175 9.89583L6.33341 11.9542L7.44175 13.0625ZM5.54175 16.625C5.10633 16.625 4.73359 16.47 4.42352 16.1599C4.11345 15.8498 3.95841 15.4771 3.95841 15.0417V4.75H3.16675V3.16667H7.12508V2.375H11.8751V3.16667H15.8334V4.75H15.0417V15.0417C15.0417 15.4771 14.8867 15.8498 14.5766 16.1599C14.2666 16.47 13.8938 16.625 13.4584 16.625H5.54175ZM13.4584 4.75H5.54175V15.0417H13.4584V4.75Z" fill="black"/>
                    </svg>
                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="black"/>
                    </svg>
                }
               
            </div>
        </div>
    )
}

export default function FriendsList( { friendList } : IFriendsList ) {
    return (
        <div className='w-full h-full bg-[#D8E6EF] bg-opacity-[.41] rounded-[10px] pt-[20px] px-[15px]'>
            <FriendSeacrh/>
            {
                friendList &&
                <div className={`flex flex-col h-full max-h-[356px] gap-[15px] pr-[5px] ${friendList.length > 0 && "overflow-y-scroll"} scrollbar-h-[10px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 py-[10px]`}>
                    {
                        friendList.length > 0 ?
                        <div>У тебя есть друзья</div>
                        :
                        <div className='font-bold text-black text-[18px] text-center'>
                            У тебя нет друзей. Скорее найди их!
                        </div>
                    }
                </div>
            }
            
        </div>
    )
}
