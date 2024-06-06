import React from 'react'
import VideoConferenceScreen from '@/components/ConferenceComponents/VideoConferenceScreen'
import ConferenceContainer from '@/components/ConferenceComponents/ConferenceContainer'
import getToken from '@/context/getToken'
import Unauthorized from '@/context/privatePage'


export default function Conference() {

  const token = getToken() || ""
  Unauthorized()
  return (
    <ConferenceContainer>
      <VideoConferenceScreen token={token}/>
    </ConferenceContainer>
  )
}
