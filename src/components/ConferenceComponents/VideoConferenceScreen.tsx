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
import useMediaStream from '@/hooks/setupMediaStream';

interface IVideoConferenceScreen {
  token: string;
}

export interface IConferenceUsers{
  userId: string
  username: string
  avatar: string
  isMicroOn: boolean
  isVideoOn: boolean
}

interface IPlayer {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
}

type PlayersState = {
  [key: string]: IPlayer;
};

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
  const [newUserPeerId, setNewUserPeerId] = useState<string>("")
  const { stream } = useMediaStream()
  const [players, setPlayers] = useState<{[key:string] : IPlayer}>()

  useEffect(() => {
    if(stream && peer && newUserPeerId){
      const call = peer.call(newUserPeerId, stream)
      
      call.on('stream', (incomingStream) => {
        setPlayers((prev) => ({
          ...prev,
          [newUserPeerId]:{
            url: incomingStream,
            muted: false,
            playing: true
          }
        }))
      })
    }else{
      return
    } 
  },[stream, peer, newUserPeerId])

  useEffect(() => {
    if(!stream || !myId) return
    setPlayers((prev) => ({
      ...prev,
      [myId]:{
        url: stream,
        muted: false,
        playing: true
      }
    }))
  },[myId, stream])


  useEffect(() => {
    if(!peer) return
    try{
      peer.on('call', (call) =>{
        const {peer: callerId} = call;
        call.answer(stream)
        call.on('stream', (incomingStream) =>{
          setPlayers((prev) => ({
            ...prev,
            [callerId]:{
              url: incomingStream,
              muted: false,
              playing: true
            }
          }))
        })
      })
    }catch(e){
      console.log(e)
    }

  },[peer, stream])

  useEffect(() => {
    const conferenceId = window.location.href.slice(-10);
    setConfId(conferenceId)
    const socketInstance = new WebSocket(`${API_SOCKET_URL}conference/connect?token=${token}&conferenceId=${conferenceId}`);
    setSocket(socketInstance);
    if(conferenceId && myId && peer){
      socketInstance.onopen = () => {
        const dataMessage = JSON.stringify({
          event: 'joinConference',
          data: {
            userId: myId,
            token: token,
            conferenceId: conferenceId
          }
        });
        socketInstance.send(dataMessage);
      };
    }else{
      return
    }

    socketInstance.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === 'joinConference') {
        if(data.success){
          setUsers(data.conference.users)
          setConfExist(true)
        }else{
          toast.error("Такой конференции не существует")
          setLoader(false)
          console.log(data.message)
        }
      }else if(data.event === 'updateConference'){
        if(data.success){
          const users = data.conference.users
          setUsers(users);
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
      }else if(data.event === 'userJoinToConference'){
        if(data.success){
          if(data.newUser.userId !== myId){
            const newUserId = data.newUser.userId
            setNewUserPeerId(newUserId)
          }
        }
      }
    };
  }, [token, myId, peer, API_SOCKET_URL]);

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
  },[users])

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
                  users && players &&
                  users.map((user, index) => {
                    const userStream : IPlayer = players[user.userId]
                    return(
                      <Player 
                      key={index} 
                      username={user.username} 
                      avatar={user.avatar} 
                      width={userWidth} 
                      lastWidth={lastUserWidth} 
                      isCamOn={user.isVideoOn} 
                      isMicOn={!user.isMicroOn}
                      url={userStream?.url}
                      playing={true}
                      />
                      // <Player key={index} username={"Kovach"} avatar={"none"} width={userWidth} lastWidth={lastUserWidth} isCamOn={true} isMicOn={true}/>
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