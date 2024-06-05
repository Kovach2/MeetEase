"use client";

import React, { useEffect, useState } from 'react';
import VideoConferenceButtons from './VideoConferenceButtons';
import VideoConferenceUser from './VideoConferenceUser';
import ScreenLoader from './ScreenLoader';

interface IVideoConferenceScreen {
  token: string;
}

export interface IConferenceUsers{
  username: string
  avatar: string
  isMicroOn: boolean
  isVideoOn: boolean
}

export default function VideoConferenceScreen({ token }: IVideoConferenceScreen) {
  const API_SOCKET_URL = process.env.NEXT_PUBLIC_API_SOCKET_URL;
  const [loader, setLoader] = useState<boolean>(true)
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState<IConferenceUsers[]>([])
  const [userWidth, setUserWidth] = useState<string>("w-full")
  const [lastUserWidth, setLastUserWidth] = useState<string>("")
  const [confId, setConfId] = useState<string>("")
  const [microOn, setMicroOn] = useState<boolean>(false)
  const [camOn, setcamOn] = useState<boolean>(false)

  useEffect(() => {
    const conferenceId = window.location.href.slice(-10);
    setConfId(conferenceId)
    const socketInstance = new WebSocket(`${API_SOCKET_URL}conference/connect`);
    setSocket(socketInstance);

    socketInstance.onopen = () => {
      if(conferenceId){
        const dataMessage = JSON.stringify({
          event: 'joinConference',
          data: {
            token: token,
            conferenceId: conferenceId
          }
        });
        socketInstance.send(dataMessage);
      }else{
        console.log("Нет id")
      }
    };

    socketInstance.onmessage = (event) => {
      console.log(event)
      const data = JSON.parse(event.data);
      if (data.event === 'joinConference') {
        if(data.success){
          setUsers(data.conference.users);
        }else{
          console.log(data.message)
        }
      }else if(data.event === 'updateConference'){
        if(data.success){
          setUsers(data.conference.users);
        }else{
          console.log(data.message)
        }
      }else if(data.event === 'disconnectConference'){
        if(data.success){
          setUsers(data.conference.users);
        }else{
          console.log(data.message)
        }
      }
    };
  }, [API_SOCKET_URL, token]);

  useEffect(()=>{
    if(users.length > 0){
      setLoader(false)
    }
    if(users.length >= 2){
      setUserWidth("w-[50%]")
    }
    if(users.length % 2 === 1 && users.length !== 1){
      setLastUserWidth("last:w-full")
    }
  },[users])

  return (
    <div className='w-full h-full bg-peach rounded-[30px]'>
      {
        !loader ? 
          <>
            <div className='flex flex-[1_1_50%] flex-wrap'>
              {
                users &&
                users.map((user, index) => {
                  return(
                    <VideoConferenceUser key={index} username={user.username} avatar={user.avatar} socket={socket} width={userWidth} lastWidth={lastUserWidth} isCamOn={camOn} isMicOn={microOn}/>
                  )
                })
              }
            </div>
            <VideoConferenceButtons socket={socket} token={token} conferenceId={confId} setMicro={setMicroOn} setCam={setcamOn}/>
          </>
        :
        <ScreenLoader />
      }
    </div>
  );
}