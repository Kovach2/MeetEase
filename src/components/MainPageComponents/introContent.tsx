"use client"

import axios from "axios";
import Button, {CodeInput} from "../button";

interface IIntroContent{
    token: string
}


export default function IntroContent({token} : IIntroContent) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const handleButtonCreateConference = async () => {
        const response = await axios.post(`${API_URL}conference/create`, {token: token})
        const data = response.data

        if(data.success){
            window.location.assign(`/conference/${data.roomId}`)
        }
    }


    return (
        <div className={`w-full max-w-[45%] lg:max-w-full flex flex-col lg:border-b lg:border-b-gray-400 lg:pb-[20px] ${!token && "justify-center"}`}>
            <div>
                <div className="text-[20px] w-full font-semiBold mb-[20px] lg:mx-auto lg:text-center lg:text-[28px] lg:max-w-[400px] s:text-[16px]">Общайся по средствам веб-конференций</div>
                <div className="mb-[25px] max-w-[500px] font-regular lg:mx-auto lg:text-center lg:text-[18px] lg:max-w-[700px] s:text-[14px]">MeetEase предлагает видеосвязь для работы и развлечений, где бы вы ни находились. Наслаждайтесь надежной связью и кристально чистым изображением в любой точке мира.</div>
            </div>
            <div className="w-full flex lg:justify-center gap-[15px]">
                {
                    token ?
                    <div className="flex gap-[15px] sm:flex-wrap sm:w-full">
                        <Button className="sm:max-w-full" onClick={handleButtonCreateConference}>Новая встреча</Button>
                        <CodeInput placeholder="Код встречи" token={token}/>
                    </div>
                    :
                    <div className="font-robotoBlack">Войдите в аккаунт для только чтобы создать или присоединиться к конференции</div>
                }

            </div>
        </div>
    );
}