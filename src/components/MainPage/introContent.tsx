import Button, {CodeInput} from "../button";


export default function IntroContent() {
    return (
        <div className="w-full max-w-[420px] flex flex-col items-center">
            <div className="text-[20px] w-full font-semiBold mb-[20px]">Общайся по средствам веб-конференций</div>
            <div className="mb-[25px] max-w-[420px] font-regular">MeetEase предлагает видеосвязь для работы и развлечений, где бы вы ни находились. Наслаждайтесь надежной связью и кристально чистым изображением в любой точке мира.</div>
            <div className="w-full flex justify-between gap-[15px]">
                <Button>Новая встреча</Button>
                <CodeInput placeholder="Код встречи"/>
            </div>
        </div>
    );
}