import Link from "next/link"

const Logo = () => {
    return(
        <Link href={"/"} className="w-[175px] h-[45px] flex items-center justify-center bg-peach rounded-[30px]">
            <div className="font-JotiOne text-[30px]">MeetEase</div>
        </Link>
    )
}

export default Logo