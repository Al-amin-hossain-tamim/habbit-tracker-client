import React from "react";
import Banner from "../Banner/Banner";
import WhyBuildHabbit from "../WhyBuildHabbit/WhyBuildHabbit";
import HowItWorks from "../HowItWorks/HowItWorks";
import StartYourStreak from "../StartYourStreak/StartYourStreak";



const Home = () => {
  return (
    <div className="bg-black/5 pt-10 pb-20">
      <div className="w-11/12 mx-auto">
        <Banner></Banner>
        <WhyBuildHabbit></WhyBuildHabbit>
        <HowItWorks></HowItWorks>
        <StartYourStreak></StartYourStreak>
        
      </div>
    </div>
  );
};

export default Home;
