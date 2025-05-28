import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { textReveal, staggerChildren } from '../utils/animations';
import { isIdleForSeconds } from '../utils/helpers';

const LandingSection: React.FC = () => {
  const [idleState, setIdleState] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgrounds = [
    'https://images.pexels.com/photos/2079451/pexels-photo-2079451.jpeg',
    'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg',
    'https://images.pexels.com/photos/1468385/pexels-photo-1468385.jpeg'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    
    const cleanupTimer = isIdleForSeconds(10, () => setIdleState(true));
    
    return () => {
      clearInterval(interval);
      cleanupTimer();
    };
  }, []);
  
  const scrollToNextSection = () => {
    const filmSection = document.getElementById('film-section');
    if (filmSection) {
      filmSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <motion.section 
      className="relative h-screen overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      {backgrounds.map((bg, index) => (
        <motion.div
          key={bg}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg})` }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentBg === index ? 0.4 : 0,
            scale: currentBg === index ? 1.05 : 1
          }}
          transition={{ 
            opacity: { duration: 1.5 },
            scale: { duration: 8 }
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.div 
          className="max-w-3xl text-center"
          variants={staggerChildren}
        >
          <motion.h1 
            className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            variants={textReveal}
          >
            I thought I came to study
            <span className="mt-4 block text-3xl opacity-70 sm:text-4xl md:text-5xl">
              (but the campus studied me)
            </span>
          </motion.h1>
          
          <motion.p
            className="mb-12 text-xl font-light leading-relaxed opacity-90 sm:text-2xl"
            variants={textReveal}
          >
            A 90-second film about what happens when architecture watches back
          </motion.p>
          
          <motion.div variants={textReveal}>
            <Button 
              onClick={scrollToNextSection}
              size="lg"
              isPulsing={true}
              isGlitching={idleState}
            >
              {idleState ? "Too late to leave now" : "Begin the experience"}
            </Button>
            
            {idleState && (
              <p className="mt-4 text-sm text-red-400">
                73% of viewers who pause here report hearing footsteps behind them later.
              </p>
            )}
          </motion.div>
        </motion.div>
        
        <motion.button
          className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100"
          onClick={scrollToNextSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 2 }}
        >
          <span className="text-sm">Scroll to begin</span>
          <ArrowDownCircle className="h-6 w-6 animate-bounce" />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default LandingSection;