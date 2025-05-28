import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FILM_SCENES } from '../data/filmData';
import SceneCard from '../components/film/SceneCard';
import SceneDetail from '../components/film/SceneDetail';
import Button from '../components/ui/Button';
import { FilmSceneDetail } from '../types';
import { fadeIn, staggerChildren } from '../utils/animations';

const PostFilmSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScene, setSelectedScene] = useState<FilmSceneDetail | null>(null);
  
  const handleSceneClick = (scene: FilmSceneDetail) => {
    setSelectedScene(scene);
  };
  
  const handleCloseDetail = () => {
    setSelectedScene(null);
  };
  
  const handleContinue = () => {
    navigate('/leave-trace');
  };
  
  return (
    <motion.div 
      className="min-h-screen w-full bg-black py-16 text-white"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div 
          className="mb-12 text-center"
          variants={staggerChildren}
        >
          <motion.h1 
            className="font-lexend text-3xl font-bold sm:text-4xl md:text-5xl"
            variants={fadeIn}
          >
            How the Campus Studied You
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg text-gray-400"
            variants={fadeIn}
          >
            Click on any scene to uncover what was really happening.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {FILM_SCENES.map((scene) => (
            <motion.div key={scene.id} variants={fadeIn}>
              <SceneCard scene={scene} onClick={handleSceneClick} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <Button onClick={handleContinue} size="lg">
            Leave your trace
          </Button>
        </div>
      </div>
      
      {selectedScene && (
        <SceneDetail scene={selectedScene} onClose={handleCloseDetail} />
      )}
    </motion.div>
  );
};

export default PostFilmSection;