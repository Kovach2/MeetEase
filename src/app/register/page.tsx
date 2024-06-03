import React from 'react'
import Container from '@/components/container'
import MyToaster from '@/components/toaster'
import RegisterForm from '@/components/RegisterPageComponents/registerForm'
import getToken from '@/context/getToken'
import Header from '@/components/header'
import { redirect } from 'next/navigation'

export default function Register() {
  const token = getToken()
  token && redirect("/")

  return (
    <>
      <Header/>
      <Container>
        <MyToaster/>
        <RegisterForm/>  
      </Container>
    </>
  )
}
