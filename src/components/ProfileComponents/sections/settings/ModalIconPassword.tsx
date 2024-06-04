import React, { useState } from 'react'
import { ContainerInput, ContainerButton } from '@/components/signInsignUpContainer'
import toast from 'react-hot-toast'
import axios from 'axios'

interface IModalIconPassword{
  title: string
  openModal: boolean
  setOpenModal: (isOpen: boolean) => void
  token: string | undefined
}




export default function ModalIconPassword({ title, openModal, setOpenModal, token } : IModalIconPassword) {
  const [changeData, setChangeData] = useState({
    newPassword: "",
    repNewPassword: ""
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    setChangeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleButtonChange = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const password = changeData.newPassword
        if(password.length < 8 || password.length > 32){
            toast.error("Пароль должен быть не менее 8 символов и до 32 символов")
        }else if(!passwordRegex.test(password)){
            toast.error("Пароль должен содержать хотя бы одну латинскую букву, одну заглавную букву, одну цифру и один специальный символ:")
        }else if(password !== changeData.repNewPassword){
            toast.error("Пароли не совпадают")
        }else{
            const sendData = {
                token: token,
                newPassword: password
            }
            const response = await axios.post(`${API_URL}profile/change/password`, sendData)
            const data = response.data
            if(data.success){
                toast.success(data.message)
                window.location.reload()
            }
        }
    }

  return (
    <div className={`${openModal ? "block" : "hidden"} absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-65`}>
        <div className='flex items-center justify-center h-full'>
              <div className='w-[400px] bg-peach rounded-[12px] px-[20px] py-[10px] relative'>
              <div className='bg-black w-[25px] h-[25px] absolute right-[7px] top-[7px] flex rounded-xl cursor-pointer' onClick={() => setOpenModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="red"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
              </div>
                <div className='font-robotoBlack text-center text-[18px]'>
                  {title}
                </div>
                <div className='mt-[10px] flex flex-col w-full gap-[10px]'>
                  <ContainerInput name={"newPassword"} value={changeData.newPassword} onChange={handleInputChange} placeholder={"Новый пароль"} type={"password"} inputImgUrl={"/images/inputsIcons/padlock.png"}/>
                  <ContainerInput name={"repNewPassword"} value={changeData.repNewPassword} onChange={handleInputChange} placeholder={"Повторите новый пароль"} type={"password"} inputImgUrl={"/images/inputsIcons/security.png"}/>
                </div>
                <div className='flex items-center'>
                  <ContainerButton text={"Изменить"} handleClick={handleButtonChange}/>
                </div>
            </div>
        </div>
    </div>
  )
}
