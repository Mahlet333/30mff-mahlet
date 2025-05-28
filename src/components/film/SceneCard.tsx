import React from 'react';
import { motion } from 'framer-motion';
import { FilmSceneDetail } from '../../types';

interface SceneCardProps {
  scene: FilmSceneDetail;
  onClick: (scene: FilmSceneDetail) => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, onClick }) => {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-900"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onClick={() => onClick(scene)}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={scene.imageUrl} 
          alt={scene.title} 
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-70"
        />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="font-lexend text-lg font-bold text-white">{scene.title}</h3>
        <p className="text-sm text-gray-300">{scene.location}</p>
      </div>
    </motion.div>
  );
};

export default SceneCard;