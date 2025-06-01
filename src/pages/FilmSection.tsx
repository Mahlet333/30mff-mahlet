import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FILM_ID } from '../data/filmData';
import Button from '../components/ui/Button';
import { fadeIn } from '../utils/animations';

const FilmSection: React.FC = () => {
  const navigate = useNavigate();
  const [hasWatched, setHasWatched] = useState(false);
  
  const handleVideoEnd = () => {
    setHasWatched(true);
  };
  
  const handleContinue = () => {
    navigate('/post-film');
  };
  
  return (
    <motion.div 
      className="flex min-h-screen w-full flex-col items-center justify-center bg-black py-16 text-white"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="font-lexend text-2xl font-bold sm:text-3xl md:text-4xl">
            I thought I came to study
          </h1>
          <p className="text-md mt-2 opacity-70 sm:text-lg">
            (but the campus studied me)
          </p>
        </div>
        
        <div className="relative mx-auto overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              src={`https://www.youtube.com/embed/${FILM_ID}?controls=1&rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-screen"
              allowFullScreen
              className="youtube-container absolute inset-0 h-full w-full"
              title="YouTube video player"
            >
            </iframe>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="mb-8 font-lexend text-lg italic">
            We didn't film it. We revealed it.
          </p>
          
          {hasWatched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button onClick={handleContinue} size="lg">
                See what the campus learned from you
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilmSection;