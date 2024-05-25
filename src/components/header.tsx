import Container from "./container";
import Logo from "./HeaderComponents/Logo";
import Nav from "./HeaderComponents/Nav";
import AccountInfo from "./HeaderComponents/AccountInfo";
import Link from "next/link";
import getToken from "@/context/getToken";

const SignUpSingIn = () =>{
    return(
        <div className="flex gap-[20px] w-[215px] items-center">
            <Link href={"/login"} className="w-1/2 text-white text-[16px] font-bold py-[8px] bg-[#0F0E0E] transition-all flex items-center justify-center rounded-[5px]">
                Войти
            </Link>
            <Link href={"/register"} className="w-1/2 max-w-[130px] text-[16px] font-robotoBlack">
                Зарегистрироваться
            </Link>
        </div>    
    )
}

export default function Header() {
    const token = getToken()
    return(
        <header className="w-full h-[70px] bg-yellow fixed">
            <Container className="h-full">
                <div className="flex h-full items-center justify-between">
                    <Logo />
                    <Nav />
                    {
                        token ?
                        <AccountInfo username={"Kovach"} avatar={"/images/accountIcon.png"}/>
                        :
                        <SignUpSingIn />
                    }
                    
                </div>
            </Container>
        </header>
    )      
}