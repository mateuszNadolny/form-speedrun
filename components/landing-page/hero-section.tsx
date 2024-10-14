import 'animate.css';

import { Button } from '../ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col lg:ml-80 lg:items-start items-center justify-center space-y-6">
      <h1 className="text-color-light font-extrabold text-4xl lg:text-6xl animate__animated animate__backInRight">
        Form Speedrunner 🏃‍➡️
      </h1>
      <h3 className="animate__animated text-color-light font-regular text-xl lg:text-4xl animate__backInLeft">
        How <span className="text-color-teritary font-bold">fast</span> can you
        <span className="text-color-teritary font-bold"> submit a form</span>?
      </h3>
      <div className="animate__animated animate__backInUp animate__delay-1s">
        <Button className="font-regular text-xs lg:text-2xl bg-color-teritary lg:h-12" asChild>
          <Link href={'/game'}>{`Let's get started`}</Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
