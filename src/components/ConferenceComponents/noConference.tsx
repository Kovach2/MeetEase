import React from 'react'
import Button from '../button'
import Link from 'next/link'


export default function NoConference({socket} : {socket: WebSocket | null}) {

    const handleButton = () =>{
        socket && socket.close()
        window.location.assign("/")
    }

  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex items-center justify-center'>
        <div className='bg-peach flex flex-col items-center justify-center w-[400px] h-[250px] rounded-[16px]'>
            <div className='font-bold text-black text-[18px] mb-[20px]'>Конференция не найдена</div>
            <Button onClick={handleButton}>Назад на главную</Button>
        </div>
    </div>
  )
}
