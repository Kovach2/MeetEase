import React from 'react'
import Header from '@/components/header'
import Container from '@/components/container'
import Footer from '@/components/footer'


export default function page() {
  return (
    <>
    <Header/>
    <Container>
        <div className=' pt-[100px] mb-[215px]'>
            <div className='pb-[30px] border-b border-b-black'>
                <div className='text-[20px] font-bold'>
                    Что такое MeetEase?
                </div>
                <div className='text-[18px] font-medium mt-[20px]'>
                    MeetEase – это платформа для проведения и организации веб-конференций, предназначенная для упрощения коммуникации и взаимодействия между людьми в цифровом формате. Мы предлагаем инструменты для видеоконференций, вебинаров и виртуальных мероприятий.
                </div>
            </div>
            <div className='pb-[30px] border-b border-b-black'>
                <div className='text-[20px] font-bold  mt-[10px]'>
                    Как зарегистрироваться на MeetEase?
                </div>
                <div className='text-[18px] font-medium mt-[20px]'>
                    Чтобы зарегистрироваться на MeetEase, нажмите кнопку &quot;Регистрация&quot; на главной странице нашего сайта и следуйте инструкциям. Вам понадобится указать адрес электронной почты, лоигн и создать пароль.
                </div>
            </div>
            <div className='pb-[30px] border-b border-b-black'>
                <div className='text-[20px] font-bold  mt-[10px]'>
                    Как подключится к существующей конференции?
                </div>
                <div className='text-[18px] font-medium mt-[20px]'>
                    Для того чтобы подключится к существующей конференции необходимо зайти в аккаунт. После в поле &quot;Код встречи&quot; ввести уникальный код комнаты и нажать на кнопку &quot;Присоедениться&quot;.
                </div>
            </div>
            <div>
                <div className='text-[20px] font-bold  mt-[10px]'>
                    Как начать новую конференцию?
                </div>
                <div className='text-[18px] font-medium mt-[20px]'>
                    Для начала новой конференции войдите в свой аккаунт, нажмите кнопку &quot;Новая встреча&quot; и у вас запуститься конференция.
                </div>
            </div>
        </div>
    </Container>
    <Footer/>
</>
  )
}
