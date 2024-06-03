import React from 'react'
import Container from '@/components/container'
import MyToaster from '@/components/toaster'
import getToken from '@/context/getToken'
import Header from '@/components/header'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginPageComponents/loginForm'


export default function Login() {
  const token = getToken()
  token && redirect("/")
  return (
    <>
      <Header/>
      <Container>
          <MyToaster/>
          <LoginForm/>
      </Container>
    </>

  )
}
