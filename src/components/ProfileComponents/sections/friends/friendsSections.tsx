import React from 'react'
import ProfileSectionContainer from '../ProfileSectionContainer'
import FriendsList from './FriendsList'

export default function FriendsSections() {
  return (
    <ProfileSectionContainer classname='pb-[30px] h-[500px]'>
      <FriendsList/>
    </ProfileSectionContainer>
  )
}
