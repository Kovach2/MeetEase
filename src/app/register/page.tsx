"use client"

import React from 'react'
import Container from '@/components/container'
import MyToaster from '@/components/toaster'
import RegisterForm from '@/components/RegisterPageComponents/registerForm'
import getToken from '@/context/getToken'
import { redirect } from 'next/navigation'

export default function Register() {
  const token = getToken()
  token && redirect("/")

  return (
    <Container>
      <MyToaster/>
      <RegisterForm/>  
    </Container>
  )
}
