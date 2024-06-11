import React from 'react'
import Header from '@/components/header'
import Container from '@/components/container'
import Footer from '@/components/footer'

export default function page() {
  return (
    <>
        <Header/>
        <Container>
            <div className='h-auto pt-[100px] mb-[100px]'>
                <div className='pb-[30px] border-b border-b-black'>
                    <div className='text-[20px] font-bold'>
                        Добро пожаловать в MeetEase
                    </div>
                    <div className='text-[18px] font-medium mt-[20px]'>
                        В современном мире, где расстояния перестали быть преградой, мы в MeetEase создаем платформу, которая объединяет людей, делая взаимодействие проще, эффективнее и удобнее. Мы понимаем, что успешная коммуникация – это ключ к продуктивной работе, и наша миссия заключается в предоставлении инновационных решений для организации веб-конференций, которые помогут вам достигать новых вершин.
                    </div>
                </div>
                <div className='pb-[30px] border-b border-b-black'>
                    <div className='text-[20px] font-bold mt-[10px]'>
                        Наши ценности
                    </div>
                    <div className='text-[18px] font-medium mt-[20px]'>
                        <ul className='list-disc pl-[15px]'>
                            <li className='text-[18px]'><span className='font-semiBold text-[18px]'>Простота: </span>Интуитивно понятный интерфейс и легкость использования – это то, что выделяет нашу платформу. Мы делаем все возможное, чтобы ваш опыт использования MeetEase был максимально комфортным.</li>
                            <li className='text-[18px]'><span className='font-semiBold text-[18px]'>Надежность: </span>Мы обеспечиваем стабильное соединение и высокое качество связи, чтобы вы могли быть уверены в каждом своем шаге.</li>
                            <li className='text-[18px]'><span className='font-semiBold text-[18px]'>Инновации: </span>Мы постоянно совершенствуем нашу платформу, добавляя новые функции и возможности, чтобы соответствовать вашим растущим потребностям.</li>
                            <li className='text-[18px]'><span className='font-semiBold text-[18px]'>Безопасность: </span>Мы заботимся о защите ваших данных и конфиденциальности, применяя передовые технологии для обеспечения максимальной безопасности.</li>
                        </ul>
                    </div>
                </div>
                <div className='pb-[30px] border-b border-b-black'>
                    <div className='text-[20px] font-bold  mt-[10px]'>
                        Наша миссия
                    </div>
                    <div className='text-[18px] font-medium mt-[20px]'>
                        Мы стремимся обеспечить легкость и доступность в проведении онлайн-встреч, позволяя нашим пользователям сосредоточиться на важном – содержании и результатах. С MeetEase вы можете забыть о технических сложностях и наслаждаться качественной связью, будь то деловая встреча, учебный вебинар или международная конференция.
                    </div>
                </div>
                <div>
                    <div className='text-[20px] font-bold  mt-[10px]'>
                        Наша команда
                    </div>
                    <div className='text-[18px] font-medium mt-[20px]'>
                        В MeetEase работает команда профессионалов, увлеченных своим делом. Наши разработчики, дизайнеры и специалисты работают сообща, чтобы предоставлять вам лучший продукт и сервис.
                    </div>
                </div>
            </div>
        </Container>
        <Footer/>
    </>
  )
}
