import 'animate.css';

import { Button } from '../ui/button';

const HeroSection = () => {
  return (
    <>
      <h1 className="text-color-light font-extrabold text-[24px] lg:text-[48px] animate__animated animate__backInRight">
        Form Speedrunner 🏃‍➡️
      </h1>
      <h3 className="animate__animated text-color-light font-regular text-[14.83px] lg:text-[29.66px] animate__backInLeft">
        How <span className="text-color-teritary font-bold">fast</span> can you
        <span className="text-color-teritary font-bold"> submit a form</span>?
      </h3>
      <div className="animate__animated animate__backInUp animate__delay-1s mt-7 mx-4">
        <Button className="font-regular text-[18.33px] bg-color-teritary">{`Let's get started`}</Button>
      </div>
    </>
  );
};

export default HeroSection;
