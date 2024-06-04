"use client"

import React, { useEffect, useState } from 'react'
import ProfileNavbar from './profileNavbar'
import AccountSection from './sections/account/accountSection'
import FriendsSections from './sections/friends/friendsSections'
import SettingsSection from './sections/settings/settingsSection'
import axios from 'axios'
import { IDataProfile } from '@/interfaces/profileData.interface'

interface IProfileContainer{
    token: string | undefined
}

export default function ProfileContainer( { token } : IProfileContainer ) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const sections = ['Аккаунт', "Друзья", "Настройки"]
    const [activeSection, setActiveSection] = useState<string>(sections[0])
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
        <div className='pt-[120px]'>
            <div className='w-full bg-[#384B52] h-auto rounded-[12px] py-[30px] px-[90px]'>
                <ProfileNavbar setActiveSection={setActiveSection}/>
                {
                    activeSection === sections[0] &&
                    <AccountSection token={token} profileData={accountData} loader={loader}/>
                }
                {
                    activeSection === sections[1] &&
                    <FriendsSections token={token} friendList={accountData?.friends} ownLogin={accountData?.username}/>
                }
                {
                    activeSection === sections[2] &&
                    <SettingsSection token={token}/>
                }
            </div>
        </div>
    )
}
