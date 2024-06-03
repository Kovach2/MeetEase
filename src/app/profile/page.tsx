import React from 'react'
import Container from '@/components/container'
import getToken from '@/context/getToken'
import Unauthorized from '@/context/privatePage'
import Header from '@/components/header'
import ProfileContainer from '@/components/ProfileComponents/profileContainer'
import MyToaster from '@/components/toaster'

export default function Profile() {
    const token = getToken()
    Unauthorized()

    return (
        <>
            <MyToaster/>
            <Header/>
            <Container>
                <ProfileContainer token={token}/>
            </Container> 
        </>
    )
}
