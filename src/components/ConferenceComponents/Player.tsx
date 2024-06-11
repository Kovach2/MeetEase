import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player'

interface Player{

    width?: string
    lastWidth?: string
    isCamOn?: boolean
    isMicOn?: boolean
    avatar?: string
    username?: string
    url?: MediaStream | undefined
    playerId?: string
    playing?: boolean
    // setStream: (stream: MediaStream) => void
}

export default function Player(props : any) {
    const { width, lastWidth, isCamOn, isMicOn, avatar, username, url, playerId, playing } = props
    return (
        <div className={`${width} h-[500px] p-[20px] mx-auto ${lastWidth}`}>
            <div className='relative bg-gray h-full flex items-center justify-center rounded-[20px]'>
                    <ReactPlayer key={playerId} url={url} muted={isMicOn} width={500} playing={playing}  style={{display: `${isCamOn ? "block" : "none"}`}}/>
                    {/* <video ref={videoRef} muted={isMicOn} width={500} autoPlay style={{display: `${isCamOn ? "block" : "none"}`}}/> */}
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
