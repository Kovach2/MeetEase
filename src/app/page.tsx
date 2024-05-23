import IntroSlider from "@/components/MainPage/introSlider";
import IntroContent from "@/components/MainPage/introContent";
import Container from "@/components/container";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
        <div className="px-[65px] h-screen flex items-center">
          <IntroContent/>
          <IntroSlider/>
        </div>
    </Container>

  );
}
