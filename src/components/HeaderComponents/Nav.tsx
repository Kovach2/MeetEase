import Link from "next/link"


const Nav = (props : {classname: string}) => {

    const {classname} = props

    return(
        <div className={`flex justify-between w-full max-w-[200px] font-robotoBlack tracking-[1px] ${classname}`}>
            <Link href={"/about"} className="relative text-[16px] hover:before:w-full before:absolute before:content-[''] before:h-[2px] before:bg-black before:bottom-0 select-none">О нас</Link>
            {/* <Link href={"/"} className="relative text-[16px] hover:before:w-full before:absolute before:content-[''] before:h-[2px] before:bg-black before:bottom-0 select-none">Главная</Link> */}
            <Link href={"/faq"} className="relative text-[16px] hover:before:w-full before:absolute before:content-[''] before:h-[2px] before:bg-black before:bottom-0 select-none">FAQ</Link>
        </div>
    )
}

export default Nav