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
        <div className={`w-full max-w-[45%] flex flex-col ${!token && "justify-center"}`}>
            <div className="text-[20px] w-full font-semiBold mb-[20px]">Общайся по средствам веб-конференций</div>
            <div className="mb-[25px] max-w-[500px] font-regular">MeetEase предлагает видеосвязь для работы и развлечений, где бы вы ни находились. Наслаждайтесь надежной связью и кристально чистым изображением в любой точке мира.</div>
            <div className="w-full flex justify-between gap-[15px]">
                {
                    token ?
                    <>
                    <Button onClick={handleButtonCreateConference}>Новая встреча</Button>
                    <CodeInput placeholder="Код встречи" token={token}/>
                    </>
                    :
                    <div className="font-robotoBlack">Войдите в аккаунт для только чтобы создать или присоединиться к конференции</div>
                }

            </div>
        </div>
    );
}