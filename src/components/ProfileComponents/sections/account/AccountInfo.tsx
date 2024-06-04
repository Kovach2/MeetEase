import React from 'react'
import { IDataProfile } from '@/interfaces/profileData.interface'

interface IAccountInfoText{
    title: string
    subtitle: string | string[] | {username: string, avatar:string}[]
}

interface IAccountInfo{
    data: IDataProfile | undefined
}

const AccountInfoText = ({ title, subtitle } : IAccountInfoText) =>{
    return(
        <div>
            <span className='mr-[5px] font-medium text-white text-[16px]'>{title}</span>
            {
                Array.isArray(subtitle) ?
                (
                    <span className='text-white font-bold text-[16px]'>{subtitle.length}</span>
                )
                :
                (
                    <span className='text-white font-bold text-[16px]'>{subtitle}</span>
                )
            }

        </div>
    )
}

export default function AccountInfo({ data } : IAccountInfo) {

  return (
    <div className='w-full px-[20px] pt-[25px] bg-[#D8E6EF] bg-opacity-40 rounded-[10px] h-[200px]'>
        <div className='flex flex-col gap-[15px]'>
            {
                data &&
                <>
                    <AccountInfoText title='Имя пользователя:' subtitle={data.username}/>
                    <AccountInfoText title='Почта:' subtitle={data.email}/>
                    <AccountInfoText title='Количество друзей:' subtitle={data.friends}/>
                    <AccountInfoText title='Количество созданных веб-конференций:' subtitle={data.conferences}/>
                </>
            }
        </div>
    </div>
  )
}
