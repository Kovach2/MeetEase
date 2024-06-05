import IntroSlider from "@/components/MainPageComponents/introSlider";
import IntroContent from "@/components/MainPageComponents/introContent";
import Container from "@/components/container";
import Header from "@/components/header";
import getToken from "@/context/getToken";
import MyToaster from "@/components/toaster";

export default function Home() {
  const token = getToken() || ""

  return (
    <>
        <Header />
        <Container>
          <MyToaster/>
          <div className="px-[30px] h-screen flex items-center">
            <div className="flex justify-between w-full">
              <IntroContent token={token}/>
              <IntroSlider/>
            </div>
          </div>
      </Container>
    </>
  );
}
