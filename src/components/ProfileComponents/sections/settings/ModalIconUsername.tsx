import React, { useState } from 'react'
import { ContainerInput, ContainerButton } from '@/components/signInsignUpContainer'
import axios from 'axios'
import toast from 'react-hot-toast'

interface IModalIconUsername{
  title: string
  openModal: boolean
  setOpenModal: (isOpen: boolean) => void
  token: string | undefined
}

export default function ModalIconUsername({ title, openModal, setOpenModal, token } : IModalIconUsername) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const [changeData, setChangeData] = useState({
        newUsername: "",
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setChangeData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleButtonChange = async () => {
        const userNameRegex = /^[a-zA-Z0-9_-]+$/;
        if(changeData.newUsername.length < 4 || changeData.newUsername.length > 24){
        toast.error("Логин должен быть не менее 4 символов и до 24 символов")
        }else if(!userNameRegex.test(changeData.newUsername)){
        toast.error("Логин должен содержать только цифры и буквы латинского алфавита")
        }else{
            const sendData = {
                token: token,
                newUsername: changeData.newUsername
            }
            const response = await axios.post(`${API_URL}profile/change/username`, sendData)
            const data = response.data

            if(data.success){
                toast.success(data.message)
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
                    <ContainerInput name={"newUsername"} value={changeData.newUsername} onChange={handleInputChange} placeholder={"Новое имя пользователя"} type={"text"} inputImgUrl={"/images/inputsIcons/user.png"}/>
                    </div>
                    <div className='flex items-center'>
                    <ContainerButton text={"Изменить"} handleClick={handleButtonChange}/>
                    </div>
                </div>
            </div>
        </div>
  )
}
