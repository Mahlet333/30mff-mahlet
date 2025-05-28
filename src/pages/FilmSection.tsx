import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FILM_ID } from '../data/filmData';
import Button from '../components/ui/Button';
import { fadeIn } from '../utils/animations';

const FilmSection: React.FC = () => {
  const navigate = useNavigate();
  const [hasWatched, setHasWatched] = useState(false);
  
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 1,
      rel: 0,
      modestbranding: 1,
    },
  };
  
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
            <YouTube
              videoId={FILM_ID}
              opts={opts}
              onEnd={handleVideoEnd}
              className="youtube-container"
            />
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