import 'animate.css';

import Link from 'next/link';

import LandingPageCardSection from './landing-page-card-section';
import PrimaryButton from '../ui/primary-button';
import TodayStats from './today-stats';

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center md:justify-start md:mt-36 space-y-20">
      <div className="animate__animated animate__fadeInUp flex flex-col items-center justify-center">
        <h1 className="text-color-light font-extrabold text-4xl lg:text-7xl tracking-tight">
          Form Speedrunner 🏃‍➡️
        </h1>
        <h3 className="text-color-light font-regular text-xl lg:text-4xl">
          How <span className="text-color-teritary font-bold">fast</span> can you
          <span className="text-color-teritary font-bold text-center"> submit a form</span>?
        </h3>
      </div>
      <LandingPageCardSection />
      <div className="animate__animated animate__fadeIn animate__delay-1s">
        <PrimaryButton>
          <Link href={'/game'}>{`Let's get started`}</Link>
        </PrimaryButton>
      </div>
      <TodayStats />
    </div>
  );
};

export default HeroSection;
