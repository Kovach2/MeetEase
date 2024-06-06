"use client";

import React, { useEffect, useState } from 'react';
import VideoConferenceButtons from './VideoConferenceButtons';
import VideoConferenceUser from './VideoConferenceUser';
import ScreenLoader from './ScreenLoader';
import Player from './Player';
import toast from 'react-hot-toast';
import MyToaster from '../toaster';
import NoConference from './noConference';
import usePeer from '@/context/usePeer';
import Unauthorized from '@/context/privatePage';

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

  const { peer, myId } = usePeer()
  const API_SOCKET_URL = process.env.NEXT_PUBLIC_API_SOCKET_URL;
  const [loader, setLoader] = useState<boolean>(true)
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState<IConferenceUsers[]>([])
  const [userWidth, setUserWidth] = useState<string>("w-full")
  const [lastUserWidth, setLastUserWidth] = useState<string>("")
  const [confId, setConfId] = useState<string>("")
  const [confExist, setConfExist] = useState<boolean>(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    if(!peer || !stream) return
    peer.on('call', (call) => {
      const {peer: callerId} = call
      call.answer(stream)

      call.on('stream', (incomingStream) => {
        console.log(`incoming stream from ${callerId}`)
      })
    })
  }, [peer, stream])

  useEffect(() => {
    const conferenceId = window.location.href.slice(-10);
    setConfId(conferenceId)
    const socketInstance = new WebSocket(`${API_SOCKET_URL}conference/connect?token=${token}&conferenceId=${conferenceId}`);
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
      const data = JSON.parse(event.data);
      if (data.event === 'joinConference') {
        console.log(data)
        if(data.success){
          setUsers(data.conference.users);
          setConfExist(true)
        }else{
          toast.error("Такой конференции не существует")
          setLoader(false)
          console.log(data.message)
        }
      }else if(data.event === 'updateConference'){
        console.log(data)
        if(data.success){
          setUsers(data.conference.users);
        }else{
          console.log(data.message)
        }
      }else if(data.event === 'disconnectConference'){
        if(data.success){
          if(data.conference.users){
            setUsers(data.conference.users);
          }
        }else{
          console.log(data.message)
        }
      }
    };
  }, [token]);

  useEffect(()=>{
    if(users.length > 0){
      setLoader(false)
    }
    if(users.length === 1){
      setUserWidth("w-full")
    }
    if(users.length >= 2){
      setUserWidth("w-[50%]")
    }
    if(users.length % 2 === 1 && users.length !== 1){
      setLastUserWidth("last:w-full")
    }
  },[users, stream])

  return (
    <div>
      <MyToaster/>
      {
        !loader ? 
        (
          confExist ? 
          (
            <div className='w-full h-full bg-peach rounded-[30px]'>
              <div className='flex flex-[1_1_50%] flex-wrap'>
                {
                  users &&
                  users.map((user, index) => {
                    return(
                        <Player key={index} username={user.username} avatar={user.avatar} width={userWidth} lastWidth={lastUserWidth} isCamOn={user.isVideoOn} isMicOn={!user.isMicroOn} setStream={setStream}/>
                    )
                  })
                }
              </div>
              <VideoConferenceButtons socket={socket} token={token} conferenceId={confId}/>
            </div>
          )
          :
          (<NoConference socket={socket}/>)
        )
          :
          <ScreenLoader />
      }
    </div>
    
  );
}