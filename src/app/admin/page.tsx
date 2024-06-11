import React from 'react'
import Header from '@/components/header'
import Container from '@/components/container'
import Footer from '@/components/footer'
import AdminContainer from '@/components/adminComponents/adminContainer'
import Unauthorized from '@/context/privatePage'
import MyToaster from '@/components/toaster'
import getToken from '@/context/getToken'


export default function page() {

    Unauthorized()

    return (
        <>
            <MyToaster/>
            <Header/>
            <Container>
                <div className='h-screen pt-[70px]'>
                    <AdminContainer/>
                </div>
            </Container>
            <Footer/>
        </>
    )
}
