import React from 'react'

interface IConferenceContainer{
    children: React.ReactNode
}

export default function ConferenceContainer({children} : IConferenceContainer) {
  return (
    <div className='p-[40px] border'>
        {children}
    </div>
  )
}
