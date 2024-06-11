import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface VideoConferenceUser{
  username: string
  avatar: string
  socket: WebSocket | null
  width: string
  lastWidth: string
  isMicOn: boolean
  isCamOn: boolean
}

export default function VideoConferenceUser({ username, avatar, socket, width, lastWidth, isMicOn, isCamOn } : VideoConferenceUser) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ws = useRef<WebSocket | null>(socket);

  useEffect(() => {
    const currentWs = ws.current;

    navigator.mediaDevices.getUserMedia({ video: isCamOn, audio: isMicOn })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Ошибка при получении доступа к камере:', err);
      });

    if (currentWs) {
      currentWs.onopen = () => {
        console.log('WebSocket connected');
      };

      currentWs.onmessage = (event) => {
        console.log('received:', event.data);
      };
    }

    return () => {
      if (currentWs) {
        currentWs.close();
      }
    };
  }, [isCamOn, isMicOn]);


  return (
    <div className={`${width} h-[400px] p-[20px] ${lastWidth}`}>
        <div className='relative bg-gray w-full h-full flex items-center justify-center rounded-[20px]'>
          {
            isCamOn ? 
            <video className='h-full p-[20px] w-[500px]' ref={videoRef} autoPlay />
            :
            <Image
              src={`data:image/png;base64, ${avatar}`}
              alt={"UserAvatar"}
              width={60}
              height={60}
              className='rounded-full border-black border'
            />
          }
          <div className='absolute bottom-[15px] left-[15px] font-bold text-white'>{username}</div>
        </div>
    </div>
  )
}
