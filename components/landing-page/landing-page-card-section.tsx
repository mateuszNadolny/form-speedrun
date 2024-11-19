'use client';

import { motion, useReducedMotion } from 'framer-motion';
import LandingPageCard from '@/components/landing-page/landing-page-card';

const CARD_DATA = [
  {
    id: 1,
    title: 'Beat the Clock',
    description: 'Race against time to complete forms with perfect accuracy',
    icon: 'timer'
  },
  {
    id: 2,
    title: 'Global Rankings',
    description: 'Compete with players worldwide and climb the leaderboard',
    icon: 'trophy'
  },
  {
    id: 3,
    title: 'Dynamic Challenge',
    description: 'Face new form layouts and field types in every round',
    icon: 'zap'
  }
];

const LandingPageCardSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },

    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
        ease: 'easeOut',
        duration: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <motion.div
      className="w-full hidden md:flex justify-center lg:gap-12"
      variants={container}
      initial="hidden"
      animate="show"
      viewport={{ once: true, amount: 0.3 }}>
      {CARD_DATA.map((card) => (
        <motion.div
          key={card.id}
          variants={item}
          whileHover={{
            scale: 1.05
          }}>
          <LandingPageCard {...card} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LandingPageCardSection;
