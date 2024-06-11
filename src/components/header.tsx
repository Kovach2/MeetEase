import Container from "./container";
import Logo from "./HeaderComponents/Logo";
import Nav from "./HeaderComponents/Nav";
import AccountInfo from "./HeaderComponents/AccountInfo";
import Link from "next/link";
import getToken from "@/context/getToken";
import BurgerMenu from "./HeaderComponents/burger";

const SignUpSingIn = () =>{
    return(
        <div className="flex gap-[20px] w-auto items-center">
            <Link href={"/login"} className="w-[100px] text-white text-[16px] font-bold py-[8px] bg-[#0F0E0E] transition-all flex items-center justify-center rounded-[5px]">
                Войти
            </Link>
            <Link href={"/register"} className="max-w-[200px] text-[16px] font-robotoBlack">
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
                    <div className="flex justify-between items-center w-full max-w-[650px]">
                        <Logo />
                        <Nav classname="920:hidden"/>
                    </div>
                    <div className="920:hidden">
                        {
                            token ?
                            <AccountInfo jwtToken={token}/>
                            :
                            <SignUpSingIn />
                        }
                    </div>
                      
                    <div className="hidden 920:block">
                        <BurgerMenu token={token}/>
                    </div>  
                    
                </div>
            </Container>
        </header>
    )      
}