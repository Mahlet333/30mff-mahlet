import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { textReveal } from '../utils/animations';

const FarewellSection: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [countdown, setCountdown] = useState(5);
  const [isCounting, setIsCounting] = useState(true);
  
  useEffect(() => {
    if (!isCounting) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Redirect to glitched NYUAD homepage (in this case, just go back to landing)
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [countdown, isCounting, navigate]);
  
  return (
    <motion.div 
      className="flex h-screen w-full flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto max-w-md px-4 text-center">
        {isCounting ? (
          <div>
            <h1 className="mb-8 font-lexend text-2xl font-bold sm:text-3xl">
              Deleting your visit history...
            </h1>
            
            <div className="mb-8 text-6xl font-bold">{countdown}</div>
            
            <motion.p
              className="text-glitch text-lg"
              data-text="Just kidding. Campuses never forget."
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Just kidding. Campuses never forget.
            </motion.p>
          </div>
        ) : (
          <motion.div
            variants={textReveal}
            initial="hidden"
            animate="visible"
          >
            <h1 className="mb-6 font-lexend text-2xl font-bold sm:text-3xl">
              Redirecting you now...
            </h1>
            <p className="text-lg">
              The walls will be waiting for your return.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FarewellSection;