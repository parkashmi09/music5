import {} from "react";
import Production from "../Components/home/Production";
import LandingPage from "../Components/home/LandingPage";
import Brand from "../Components/home/Brand";
import Brand1 from "../Components/home/Brand1";
import Unlock from "../Components/home/Unlock";
import Plan from "../Components/home/Plan";
import Circle from "../Components/home/Circle";
import Eclipse from "../Components/home/Eclipse";
import GraphicDesignMockup from "./GraphicDesignMockup";

function Home() {
  return (
    <div>
      <LandingPage />
      <Brand/>  
      <Brand1/>
      <Production />
      {/* <GraphicDesignMockup /> */}
      <Unlock/>
      <Plan/>
      <Eclipse/>
    </div>
  );
}

export default Home;
