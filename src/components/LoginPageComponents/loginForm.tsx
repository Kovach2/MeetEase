"use client"
import React, { useState } from 'react'
import SignInsignUpContainer, { ContainerButton, ContainerInput } from '../signInsignUpContainer'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import axios from 'axios'

export default function LoginForm() {
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
      let token = ""
      toast.remove()
      try {
        const response = await axios.post(API_URL + "auth/login",loginData)
        const data = response.data

        token = data.access_token

        if(token.length > 0){
          try{
            Cookies.set("token", token)
          }catch(error){
            console.log(error)
          }

          toast.success("Успешный вход")
          setTimeout(() =>{
              window.location.assign("/")
          },1500)
        }

  
      } catch (error) {
        console.log(error)
        toast.error("Не верный логин или пароль")
      }
    }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <SignInsignUpContainer titleText={"Вход"}>
            <ContainerInput name={"username"} value={loginData.username} onChange={handleInputChange} placeholder={"Логин"} type={"text"} inputImgUrl={"/images/inputsIcons/user.png"}/>
            <ContainerInput name={"password"} value={loginData.password} onChange={handleInputChange} placeholder={"Пароль"} type={"password"} inputImgUrl={"/images/inputsIcons/padlock.png"}/>
            <ContainerButton text={"Войти"} handleClick={LoginButtonClick}/>
        </SignInsignUpContainer>
    </div>
  )
}
