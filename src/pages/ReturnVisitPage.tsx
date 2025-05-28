import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import { fadeIn, textReveal } from '../utils/animations';

const ReturnVisitPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { lastSubmittedWord } = state;
  
  const handleContinue = () => {
    navigate('/');
  };
  
  return (
    <motion.div 
      className="flex h-screen w-full flex-col items-center justify-center bg-black text-white"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-lg px-4 text-center">
        <motion.h1 
          className="mb-8 font-lexend text-3xl font-bold"
          variants={textReveal}
        >
          Back so soon?
        </motion.h1>
        
        <motion.p 
          className="mb-12 text-xl"
          variants={textReveal}
        >
          {lastSubmittedWord ? (
            <>Your last word was "{lastSubmittedWord}.\" The walls are listening.</>
          ) : (
            <>We left the lights on for you.</>
          )}
        </motion.p>
        
        <motion.div variants={textReveal}>
          <Button onClick={handleContinue} size="lg">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReturnVisitPage;