import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../utils/animations';

const PrePlayScreen: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-transition to film section after 3 seconds
    const timer = setTimeout(() => {
      navigate('/film');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <motion.div 
      className="flex h-screen w-full items-center justify-center bg-black text-white"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="px-4 text-center">
        <h1 className="font-lexend text-xl font-light md:text-2xl lg:text-3xl">
          This film is 90 seconds long.
        </h1>
        <p className="mt-4 font-lexend text-xl font-light md:text-2xl lg:text-3xl">
          That's 5,400 frames.
        </p>
        <p className="mt-4 font-lexend text-xl font-light md:text-2xl lg:text-3xl">
          One of them is already watching you.
        </p>
      </div>
    </motion.div>
  );
};

export default PrePlayScreen;