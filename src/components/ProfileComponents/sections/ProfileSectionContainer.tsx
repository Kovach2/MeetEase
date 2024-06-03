import React from 'react'

interface IProfileSectionContainer{
    children: React.ReactNode
    classname?: string
}

export default function ProfileSectionContainer({ children, classname = "" } : IProfileSectionContainer) {
  return (
    <div className={`mt-[35px] w-full max-w-[960px] bg-[#5D7581] rounded-[15px] px-[30px] pt-[30px] shadow-[-5px_5px_4px_0px_rgba(0,0,0,0.25)] ${classname}`}>
        {children}
    </div>
  )
}
