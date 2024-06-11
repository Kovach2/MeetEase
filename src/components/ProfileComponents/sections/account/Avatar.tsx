import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast';
import axios from 'axios';


interface IAvatar{
  avatar: string | undefined
  token: string | undefined
}

export default function Avatar({ avatar, token } : IAvatar) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const oldAvatar = avatar
  const [newAvatar, setNewAvatar] = useState<string | undefined>(avatar)
  const [saveAvatar, setSaveAvatar] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validFormats = ['image/png', 'image/jpeg'];
      if (!validFormats.includes(file.type)) {
        toast.error('Пожалуйста, выберите файл в формате PNG или JPEG.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        setNewAvatar(base64Content)
        setSaveAvatar(true)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClickCancel = () => {
    setNewAvatar(oldAvatar)
    setSaveAvatar(false)
  }

  const handleButtonClickSaveAvatar = async () =>{
    try{
      const sendData = {
        avatar: newAvatar,
        token: token
      }

      const response = await axios.post(`${API_URL}profile/change/avatar`, sendData)
      const data = response.data
      if(data){
        toast.success("Аватар умпешно изменен")
        window.location.reload()
      }
    }catch(error){
      console.log(error)
      toast.error("Не удалось изменить аватар")
    }
      
  }

  return (
    <div className='w-full max-w-[200px] md:flex md:flex-col md:items-center'>
      <Image
        width={200}
        height={220}
        alt='avatar'
        src={"data:image/png;base64," + newAvatar}
        className='w-full max-w-[200px] h-full max-h-[220px] md:max-w-[150px] bg-center bg-no-repeat bg-cover block'
      />
      {
        !saveAvatar ? 
        (
          <>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}  
              className='hidden'/>
            <button 
              className='bg-black w-full h-[30px] flex items-center justify-center text-white font-semiBold text-[14px] rounded-full mt-[15px] hover:text-gray-300 transition-colors'
              onClick={handleButtonClick}>
                Сменить аватар
            </button>
          </>
        )
        :
        (
          <div className='flex gap-[10px]'>
            <button 
            className='bg-black w-full h-[30px] flex items-center justify-center text-white font-semiBold text-[14px] rounded-full mt-[15px] hover:text-gray-300 transition-colors'
            onClick={handleButtonClickSaveAvatar}>
              Сохранить
            </button>
            <button 
            className='bg-black w-full h-[30px] flex items-center justify-center text-white font-semiBold text-[14px] rounded-full mt-[15px] hover:text-gray-300 transition-colors'
            onClick={handleButtonClickCancel}>
              Отмена
            </button>
          </div>
        )
      }
      
    </div>
  )
}
