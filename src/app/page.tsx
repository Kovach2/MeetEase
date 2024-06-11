import IntroSlider from "@/components/MainPageComponents/introSlider";
import IntroContent from "@/components/MainPageComponents/introContent";
import Container from "@/components/container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import getToken from "@/context/getToken";
import MyToaster from "@/components/toaster";

export default function Home() {
  const token = getToken() || ""

  return (
    <>
      <Header />
      <Container>
        <MyToaster/>
        <div className="px-[30px] h-screen lg:h-auto flex items-center">
          <div className="flex justify-between w-full lg:flex-col lg:pb-[200px] lg:gap-[40px] lg:pt-[100px] sm:mb-[200px]">
            <IntroContent token={token}/>
            <IntroSlider/>
          </div>
        </div>
      </Container>
      <Footer/>
    </>
  );
}
