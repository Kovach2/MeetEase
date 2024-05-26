import React from 'react'
import Container from '@/components/container'
import getToken from '@/context/getToken'
import Unauthorized from '@/context/privatePage'


export default function page() {
    const token = getToken()
    Unauthorized()

    return (
        <Container>
            <div className='pt-[100px]'>
                Профиль
            </div>
        </Container>
    )
}
