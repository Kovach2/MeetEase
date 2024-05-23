"use client"

import React, { useState } from 'react'
import Container from '@/components/container'
import SignInsignUpContainer, { ContainerInput, ContainerButton } from '@/components/signInsignUpContainer'
import MyToaster from '@/components/toaster'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import axios from 'axios'



export default function Login() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const LoginButtonClick = async () =>{
    toast.remove()
    try {
      const response = await axios.post(API_URL + "auth/login",loginData)
      const data = response.data
      Cookies.set("token", data.access_token)

      toast.success("Успешный вход")
      setTimeout(() =>{
        window.location.assign("/")
      },1500)

    } catch (error) {
      console.log(error)
      toast.error("Не верный логин или пароль")
    }
}

  return (
    <Container>
        <MyToaster/>
        <div className='w-full h-screen flex items-center justify-center'>
            <SignInsignUpContainer titleText={"Вход"}>
                <ContainerInput name={"username"} value={loginData.username} onChange={handleInputChange} placeholder={"Логин"} type={"text"} inputImgUrl={"/images/inputsIcons/user.png"}/>
                <ContainerInput name={"password"} value={loginData.password} onChange={handleInputChange} placeholder={"Пароль"} type={"password"} inputImgUrl={"/images/inputsIcons/padlock.png"}/>
                <ContainerButton text={"Войти"} handleClick={LoginButtonClick}/>
            </SignInsignUpContainer>
        </div>
    </Container>
  )
}
