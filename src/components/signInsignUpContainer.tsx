import React from 'react'
import Image from 'next/image'

interface IContainerTitle{
    titleText: string
}

interface ISignInsignUpContainer{
    titleText: string
    children:  React.ReactNode
}

interface IContainerInput{
    placeholder: string
    type: string
    inputImgUrl: string
    value: string
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface IContainerButton{
    text: string
    handleClick: () => void
}

const ContainerTitle = ({titleText} : IContainerTitle) =>{
    return(
        <div className='font-robotoBlack text-[20px] w-full text-center mt-[15px] mb-[25px]'>
            {titleText}
        </div>
    )
}

export const ContainerInput = ({placeholder, type, inputImgUrl, value, name, onChange }:IContainerInput) =>{
    return(
        <div className='relative w-full max-w-[75%] mx-auto'>
            <input 
                name={name}
                type={type} 
                placeholder={placeholder} 
                className='block h-[35px] w-full pl-[40px] pr-[25px] font-regular text-[16px] py-[5px] rounded-[5px] focus:outline-none placeholder:text-[14px]'
                value={value}
                onChange={onChange}
            />
            <Image
                src={inputImgUrl}
                alt="Login"
                width={24}
                height={24}
                className='absolute top-[50%] left-2 translate-y-[-50%] w-[24px] h-[24px]'
            />
        </div>

    )
}

export const ContainerButton = ({text, handleClick} : IContainerButton) => {
    return(
        <button className='bg-black w-full max-w-[60%] mx-auto my-[15px] py-[10px] hover:translate-y-[-2px] transition-all text-white text-[16px] font-robotoBlack rounded-[5px]' onClick={handleClick}>{text}</button>
    )
}


export default function SignInsignUpContainer({children, titleText} : ISignInsignUpContainer) {

  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className='bg-peach h-auto w-full max-w-[320px] rounded-[12px]'>
            <ContainerTitle titleText={titleText}/>
            <div className='flex flex-col gap-[10px]'>
                {children}
            </div>
        </div>
    </div>
  )
}
