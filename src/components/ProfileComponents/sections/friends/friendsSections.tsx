import React from 'react'
import ProfileSectionContainer from '../ProfileSectionContainer'
import FriendsList from './FriendsList'

interface IFriendsSections{
  token: string | undefined
  friendList: {
    username: string
    avatar: string
  }[] | undefined
  ownLogin: string | undefined
}

export default function FriendsSections({friendList, token, ownLogin} : IFriendsSections) {
  return (
    <ProfileSectionContainer classname='pb-[30px] h-[500px]'>
      <FriendsList token={token} friendList={friendList} ownLogin={ownLogin}/>
    </ProfileSectionContainer>
  )
}
