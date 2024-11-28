import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Form Speedrunner',
  description: 'Home page of Form Speedrunner'
};

import HeroSection from '@/components/landing-page/hero-section';
const Home = () => {
  return (
    <section className="h-screen min-h-screen w-full flex">
      <HeroSection />
    </section>
  );
};

export default Home;
