import React, { useEffect, useState } from 'react'
import { IDataProfile } from '@/interfaces/profileData.interface'
import axios from 'axios'
import toast from 'react-hot-toast'

interface IConference {
  conferenceId: string
  users: number
}


const ConfItem = ({conferenceId, users} : {conferenceId: string, users: number}) => {
  const [userData, setUserData] = useState<IConference>({
    conferenceId: conferenceId,
    users: users,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelConf = async() =>{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conference/delConference`, {conferenceId: conferenceId})
    const data = response.data
    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }


  return(
    <div className='flex gap-[10px]'>
      <div className='w-1/2'>
        <div className='mb-[5px] pl-[5px] font-bold text-white'>
          Id конференции
        </div>
        <input 
          name='conferenceId'
          type="text" 
          className='w-full bg-black text-white font-semiBold px-[10px] rounded-[12px] h-[35px] focus:outline-none'
          value={userData.conferenceId}
          onChange={handleInputChange}
        />
      </div>
      <div className='w-1/2'>
        <div className='mb-[5px] pl-[5px] font-bold text-white'>
          Кол-во пользователей
        </div>
        <input 
          name='users'
          type="text" 
          className='w-full bg-black text-white font-semiBold px-[10px] rounded-[12px] h-[35px] focus:outline-none'
          value={userData.users}
          onChange={handleInputChange}
        />
      </div>
     
      <div className='h-[61px] flex items-end justify-center gap-[10px]'>
        <div className='h-[35px] bg-red-600 flex items-center justify-center rounded-[12px] px-[5px] text-white cursor-pointer font-bold' onClick={handleDelConf}>Удалить</div>
      </div>
    </div>
  )
}

export default function Conferences() {
  const [conferences, setConferences] = useState<{conferenceId: string, users:[any]}[]>()

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}conference/allConference`)
        const data = response.data
        setConferences(data.conferences)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    
  },[])

  return (
    <div className='mt-[20px]'>
      <div className='font-bold px-[7px] py-[4px] mx-auto bg-white w-full max-w-[250px] text-center rounded-[10px]'>Всего конференций: <span>{conferences?.length}</span></div>
      <div className='mt-[20px]'>
        <div className='flex h-[430px]  overflow-y-auto flex-col gap-[10px]'>
          {
            conferences &&
            conferences.map((conf, index) => {
              return(
                <ConfItem key={index} conferenceId={conf.conferenceId} users={conf.users.length}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
