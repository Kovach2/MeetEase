"use client"

import React, { useState } from 'react'
import ProfileNavbar from './profileNavbar'
import AccountSection from './sections/account/accountSection'
import FriendsSections from './sections/friends/friendsSections'
import SettingsSection from './sections/settings/settingsSection'

interface IProfileContainer{
    token: string | undefined
}

export default function ProfileContainer( { token } : IProfileContainer ) {
    const sections = ['Аккаунт', "Друзья", "Настройки"]
    const [activeSection, setActiveSection] = useState<string>(sections[0])

  return (
    <div className='pt-[120px]'>
        <div className='w-full bg-[#384B52] h-auto rounded-[12px] py-[30px] px-[90px]'>
            <ProfileNavbar setActiveSection={setActiveSection}/>
            {
                activeSection === sections[0] &&
                <AccountSection token={token}/>
            }
            {
                activeSection === sections[1] &&
                <FriendsSections/>
            }
            {
                activeSection === sections[2] &&
                <SettingsSection/>
            }
        </div>
    </div>
  )
}
