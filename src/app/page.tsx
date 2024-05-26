import IntroSlider from "@/components/MainPageComponents/introSlider";
import IntroContent from "@/components/MainPageComponents/introContent";
import Container from "@/components/container";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
        <Header />
        <Container>
          <div className="px-[30px] h-screen flex items-center">
            <div className="flex justify-between w-full">
              <IntroContent/>
              <IntroSlider/>
            </div>
          </div>
      </Container>
    </>
    
  );
}
