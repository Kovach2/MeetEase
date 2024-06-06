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
    setStream: (stream: MediaStream) => void
}

export default function Player(props : Player) {
    const { width, lastWidth, isCamOn, isMicOn, avatar, username, setStream } = props

    const [state, setState] = useState<MediaStream>()
    useEffect(() =>{

        async function initSteam(){
            try{
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: isMicOn,
                    video: isCamOn
                })
                setState(stream)
                setStream(stream)
            }catch(e){
                console.log(e)
            }
        }
        initSteam()
    },[isCamOn,isMicOn])

    console.log(state)

    if(state){
        return (
            <div className={`${width} h-[500px] p-[20px] ${lastWidth}`}>
                <div className='relative bg-gray h-full flex items-center justify-center rounded-[20px]'>
                        <ReactPlayer url={state} muted={isMicOn} playing={true} style={{display: `${isCamOn ? "block" : "none"}`}}/>
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
   
}
