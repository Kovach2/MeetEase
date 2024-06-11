"use client"

import React, { useEffect, useState } from 'react'
import ProfileSectionContainer from '../ProfileSectionContainer'
import Avatar from './Avatar'
import AccountInfo from './AccountInfo'
import Loader from '../../loader'
import { IDataProfile } from '@/interfaces/profileData.interface'


interface IAccountSection{
  token: string | undefined
  profileData: IDataProfile | undefined
  loader: boolean
}

export default function AccountSection( { token, profileData, loader } : IAccountSection) {

  const accountData : IDataProfile | undefined = profileData || undefined

  return (
    <ProfileSectionContainer classname='pb-[20px] h-[315px] 920:h-auto'>
      {
        loader && !accountData ?
        ( <Loader/> )
        :
        (
          <div className='flex w-full h-full gap-[30px] 920:flex-col 920:items-center'>
            <Avatar avatar={accountData?.avatar} token={token}/>
            <AccountInfo data={accountData}/>
          </div>
        )
      }
    </ProfileSectionContainer>
  )
}
