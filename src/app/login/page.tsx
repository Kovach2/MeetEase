import React from 'react'
import Container from '@/components/container'
import MyToaster from '@/components/toaster'
import getToken from '@/context/getToken'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginPageComponents/loginForm'


export default function Login() {
  const token = getToken()
  token && redirect("/")
  return (
    <Container>
        <MyToaster/>
        <LoginForm/>
    </Container>
  )
}
