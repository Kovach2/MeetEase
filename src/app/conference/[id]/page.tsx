import React from 'react'
import VideoConferenceScreen from '@/components/ConferenceComponents/VideoConferenceScreen'
import ConferenceContainer from '@/components/ConferenceComponents/ConferenceContainer'
import getToken from '@/context/getToken'


export default function Conference() {

  const token = getToken() || ""

  return (
    <ConferenceContainer>
      <VideoConferenceScreen token={token}/>
    </ConferenceContainer>
  )
}
