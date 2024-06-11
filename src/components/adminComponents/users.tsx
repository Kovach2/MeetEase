import React, { useEffect, useState } from 'react'
import { IDataProfile } from '@/interfaces/profileData.interface'
import axios from 'axios'
import toast from 'react-hot-toast'

interface IUser {
  username: string
  email: string
  conferences: number
  isAdmin: string 
}


const UserItem = ({username, email, conferences, isAdmin} : {username: string, email: string, conferences: number, isAdmin: string}) => {
  const [userData, setUserData] = useState<IUser>({
    username: username,
    email: email,
    conferences: conferences,
    isAdmin: isAdmin
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelUser = async() =>{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}profile/delUser`, {username: username})
    const data = response.data

    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }

  const handleChangeUser = async() =>{

    if(userData.isAdmin === "true" || userData.isAdmin === "false" || userData.username.length >= 4 || userData.email.includes("@mail.ru") || userData.email.length >= 9){
      const sendData = {
        username: userData.username,
        email: userData.email,
        conferences: userData.conferences,
        isAdmin: Boolean(userData.isAdmin),
      }
  
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}profile/changeUser`, sendData)
      const data = response.data
  
      if(data.success){
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    }else{
      toast.error("Не кореектные данные")
    }
  }


  return(
    <div className='flex gap-[10px]'>
      <div className='w-1/4'>
        <div className='mb-[5px] pl-[5px] font-bold text-white'>
          Имя пользователя
        </div>
        <input 
          name='username'
          type="text" 
          className='w-full bg-black text-white font-semiBold px-[10px] rounded-[12px] h-[35px] focus:outline-none'
          value={userData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className='w-1/4'>
        <div className='mb-[5px] pl-[5px] font-bold text-white'>
          Почта
        </div>
        <input 
          name='email'
          type="text" 
          className='w-full bg-black text-white font-semiBold px-[10px] rounded-[12px] h-[35px] focus:outline-none'
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className='w-1/4'>
        <div className='mb-[5px] pl-[5px] font-bold text-white'>
          Конференции
        </div>
        <input 
          name='conferences'
          type="text" 
          className='w-full bg-black text-white font-semiBold px-[10px] rounded-[12px] h-[35px] focus:outline-none'
          value={userData.conferences}
          onChange={handleInputChange}
        />
      </div>
      <div className='w-1/4'>
        <div className='mb-[5px] pl-[5px] font-bold text-white'>
          Права администратора
        </div>
        <input 
          name='isAdmin'
          type="text" 
          className='w-full bg-black text-white font-semiBold px-[10px] rounded-[12px] h-[35px] focus:outline-none'
          value={userData.isAdmin}
          onChange={handleInputChange}
        />
      </div>
      <div className='h-[61px] flex items-end justify-center gap-[10px]'>
        <div className='h-[35px] bg-blue-600 flex items-center justify-center rounded-[12px] px-[5px] text-white cursor-pointer font-bold' onClick={handleChangeUser}>Изменить</div>
        <div className='h-[35px] bg-red-600 flex items-center justify-center rounded-[12px] px-[5px] text-white cursor-pointer font-bold' onClick={handleDelUser}>Удалить</div>
      </div>
    </div>
  )
}

export default function Users() {
  const [users, setUsers] = useState<IDataProfile[]>()

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}profile/allUsers`)
        const data = response.data
        setUsers(data.users)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    
  },[])

  return (
    <div className='mt-[20px]'>
      <div className='font-bold px-[7px] py-[4px] mx-auto bg-white w-full max-w-[250px] text-center rounded-[10px]'>Всего пользователей: <span>{users?.length}</span></div>
      <div className='mt-[20px]'>
        <div className='flex h-[430px] overflow-y-auto flex-col gap-[10px]'>
          {
            users &&
            users.map((user, index) => {
              return(
                <UserItem key={index} username={user.username} email={user.email} conferences={user.conferences} isAdmin={String(user.isAdmin)}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
