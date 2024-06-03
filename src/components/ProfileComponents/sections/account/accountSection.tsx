"use client"

import React, { useEffect, useState } from 'react'
import ProfileSectionContainer from '../ProfileSectionContainer'
import Avatar from './Avatar'
import AccountInfo from './AccountInfo'
import Loader from '../../loader'
import axios from 'axios'
import { IDataProfile } from '@/interfaces/profileData.interface'


interface IAccountSection{
  token: string | undefined
}

export default function AccountSection( { token } : IAccountSection) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [loader, setLoader] = useState<boolean>(true)
  const [accountData, setAccountData] = useState<IDataProfile>()
 
  useEffect(()=>{
    const fetchData = async () => {
      const sendData = {
        token: token
      }
      try {
        const response = await axios.post(`${API_URL}profile`, sendData)
        const data = response.data
        setAccountData(data)
        setLoader(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])


  return (
    <ProfileSectionContainer classname='pb-[20px] h-[315px]'>
      {
        loader && !accountData ?
        ( <Loader/> )
        :
        (
          <div className='flex w-full h-full gap-[30px]'>
            <Avatar avatar={accountData?.avatar} token={token}/>
            <AccountInfo data={accountData}/>
          </div>
        )
      }
    </ProfileSectionContainer>
  )
}
