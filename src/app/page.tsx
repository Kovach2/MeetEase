import IntroSlider from "@/components/MainPageComponents/introSlider";
import IntroContent from "@/components/MainPageComponents/introContent";
import Container from "@/components/container";

export default function Home() {
  return (
    <Container>
        <div className="px-[30px] h-screen flex items-center">
          <div className="flex justify-between">
            <IntroContent/>
            <IntroSlider/>
          </div>
        </div>
    </Container>
  );
}
