"use client"

import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import SignInsignUpContainer, { ContainerButton, ContainerInput } from '../signInsignUpContainer'

export default function RegisterForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const [newUserData, setNewUserData] = useState({
      username: "",
      email: "",
      password: "",
      repeatPassword: ""
    })

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUserData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };


    const RegisterButtonClick = async () =>{
        const userNameRegex = /^[a-zA-Z0-9_-]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const username = newUserData.username
        const email = newUserData.email
        const password = newUserData.password
        const repeatPassword = newUserData.repeatPassword
    
        toast.remove()
        if(username.length < 4 || username.length > 24){
          toast.error("Логин должен быть не менее 4 символов и до 24 символов")
        }else if(!userNameRegex.test(username)){
          toast.error("Логин должен содержать только цифры и буквы латинского алфавита")
        }else if(password.length < 8 || password.length > 32){
          toast.error("Пароль должен быть не менее 8 символов и до 32 символов")
        }else if(!passwordRegex.test(password)){
          toast.error("Пароль должен содержать хотя бы одну латинскую букву, одну заглавную букву, одну цифру и один специальный символ:")
        }else if(!email.includes("@mail.ru") || email.includes("@gmail.ru")){
          toast.error("Почта введена не верно")
        }else if(password !== repeatPassword){
          toast.error("Пароли не совпадают")
        }else{
            const response = await axios.post(API_URL + "register", newUserData)
            const data : {code: number, success: boolean, message: string} = response.data
            if(data.success){
              toast.success(data.message)
              setTimeout(() =>{
                window.location.assign("/login")
              },1500)
            }else{
              toast.error(data.message)
            }
        }
      }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <SignInsignUpContainer titleText={"Регистрация"}>
                <ContainerInput name={'username'} value={newUserData.username} placeholder={"Логин"} type={"text"} inputImgUrl={"/images/inputsIcons/user.png"} onChange={handleInputChange}/>
                <ContainerInput name={'email'} value={newUserData.email} placeholder={"Почта"} type={"email"} inputImgUrl={"/images/inputsIcons/email.png"} onChange={handleInputChange}/>
                <ContainerInput name={'password'} value={newUserData.password} placeholder={"Пароль"} type={"password"} inputImgUrl={"/images/inputsIcons/padlock.png"} onChange={handleInputChange}/>
                <ContainerInput name={'repeatPassword'} value={newUserData.repeatPassword} placeholder={"Потдверждение пароля"} type={"password"} inputImgUrl={"/images/inputsIcons/security.png"} onChange={handleInputChange}/>
                <ContainerButton text={"Зарегистрироваться"} handleClick={RegisterButtonClick}/>
            </SignInsignUpContainer>
        </div>
    )
}
