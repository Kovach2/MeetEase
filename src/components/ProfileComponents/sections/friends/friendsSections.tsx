import React from 'react'
import ProfileSectionContainer from '../ProfileSectionContainer'
import FriendsList from './FriendsList'

interface IFriendsSections{
  friendList: {
    username: string
    avatar: string
  }[] | undefined
}

export default function FriendsSections({friendList} : IFriendsSections) {
  return (
    <ProfileSectionContainer classname='pb-[30px] h-[500px]'>
      <FriendsList friendList={friendList}/>
    </ProfileSectionContainer>
  )
}
