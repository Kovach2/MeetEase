import React, { useState } from 'react'
import ProfileSectionContainer from '../ProfileSectionContainer'
import SettingItemChange from './settingItemChange'
import ModalIconEmail from './ModalIconEmail'
import ModalIconPassword from './ModalIconPassword'
import MyToaster from '@/components/toaster'

export default function SettingsSection({token} : {token: string | undefined}) {

  const [changeEmailOpenModal, setChangeEmailOpenModal] = useState<boolean>(false)
  const [changePasswordOpenModal, setChangePasswordOpenModal] = useState<boolean>(false)

  return (
    <ProfileSectionContainer classname='pb-[30px]'>
      <MyToaster/>
      <ModalIconEmail title='Сменить почту' openModal={changeEmailOpenModal} setOpenModal={setChangeEmailOpenModal} token={token}/>
      <ModalIconPassword title='Сменить пароль' openModal={changePasswordOpenModal} setOpenModal={setChangePasswordOpenModal} token={token}/>
      <div className='w-full h-full bg-[#D8E6EF] bg-opacity-[.41] rounded-[10px] pt-[15px] pb-[18px] px-[30px]'>
        <div className='flex flex-col gap-[20px]'>
          <SettingItemChange title='Изменить адрес электронной почты' openModal={setChangeEmailOpenModal}/>
          <SettingItemChange title='Изменить пароль' openModal={setChangePasswordOpenModal}/>
        </div>
      </div>
    </ProfileSectionContainer>
  )
}
