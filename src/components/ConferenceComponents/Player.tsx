import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ReactPlayer from 'react-player'

interface Player{
    width: string
    lastWidth: string
    isCamOn: boolean
    isMicOn: boolean
    avatar: string
    username: string
    setStream: (stream: MediaStream | null) => void
}

export default function Player(props : Player) {
    const { width, lastWidth, isCamOn, isMicOn, avatar, username, setStream } = props

    const videoRef = useRef<HTMLVideoElement>(null);

    // useEffect(() =>{
    //     async function initSteam(){
    //         try{
    //             const stream = await navigator.mediaDevices.getUserMedia({
    //                 audio: isMicOn,
    //                 video: isCamOn
    //             })
    //             setState(stream)
    //         }catch(e){
    //             console.log(e)
    //         }
    //     }
    //     initSteam()
    //     console.log("SDfsdf")
    //     console.log(state)
    // },[isCamOn])

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: isCamOn, audio: isMicOn})
          .then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => {
            console.error('Ошибка при получении доступа к камере:', err);
          });
        // navigator.mediaDevices.getUserMedia({ video: isCamOn, audio: isMicOn})
        //   .then((stream) => {
        //     if (videoRef.current) {
        //       videoRef.current.srcObject = stream;
        //     }
        //   })
        //   .catch((err) => {
        //     console.error('Ошибка при получении доступа к камере:', err);
        //   });
    
        // ws.current && (ws.current.onopen = () => {
        //   console.log('WebSocket connected');
        // })
    
        // ws.current && (ws.current.onmessage = (event) => {
        //   console.log('received:', event.data);
        // })
    
        // return () => {
        //   if (ws.current) {
        //     ws.current.close();
        //   }
        // };
      }, [isCamOn,isMicOn]);



    return (
        <div className={`${width} h-[500px] p-[20px] ${lastWidth}`}>
            <div className='relative bg-gray h-full flex items-center justify-center rounded-[20px]'>
                    <video ref={videoRef} muted={isMicOn} width={500} autoPlay style={{display: `${isCamOn ? "block" : "none"}`}}/>
                    <Image
                        src={`data:image/png;base64, ${avatar}`}
                        alt={"UserAvatar"}
                        width={60}
                        height={60}
                        className={`rounded-full border-black border ${isCamOn && "hidden"}`}
                    />
                <div className='absolute bottom-[15px] left-[15px] font-bold text-white'>{username}</div>
            </div>
        </div>
    )

}
