import React from 'react'
import ProfileSectionContainer from '../ProfileSectionContainer'
import SettingItemChange from './settingItemChange'

export default function SettingsSection() {
  return (
    <ProfileSectionContainer classname='pb-[30px]'>
      <div className='w-full h-full bg-[#D8E6EF] bg-opacity-[.41] rounded-[10px] pt-[15px] pb-[18px] px-[30px]'>
        <div className='flex flex-col gap-[20px]'>
          <SettingItemChange title='Изменить имя пользователя'/>
          <SettingItemChange title='Изменить адрес электронной почты'/>
          <SettingItemChange title='Изменить пароль'/>
        </div>
      </div>
    </ProfileSectionContainer>
  )
}
