import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { FilmSceneDetail } from '../../types';
import Button from '../ui/Button';

interface SceneDetailProps {
  scene: FilmSceneDetail;
  onClose: () => void;
}

const SceneDetail: React.FC<SceneDetailProps> = ({ scene, onClose }) => {
  const getThemeColor = (theme: FilmSceneDetail['theme']) => {
    switch (theme) {
      case 'Institutional Haunting':
        return 'text-purple-400';
      case 'Time as a Trap':
        return 'text-blue-400';
      case 'Soft Surveillance':
        return 'text-red-400';
      case 'Resistance Through Stillness':
        return 'text-green-400';
      default:
        return 'text-white';
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-gray-900 shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white"
        >
          <X size={20} />
        </button>
        
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={scene.imageUrl} 
            alt={scene.title} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="font-lexend text-2xl font-bold text-white">{scene.title}</h2>
            <p className="text-gray-400">{scene.location}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-lexend text-lg font-semibold text-white">What You Saw</h3>
              <p className="text-gray-300">{scene.whatYouSaw}</p>
            </div>
            
            <div>
              <h3 className="mb-2 font-lexend text-lg font-semibold text-white">
                What the Campus Was Doing
              </h3>
              <p className="text-gray-300">{scene.whatCampusWasDoing}</p>
              <p className={`mt-2 text-sm font-semibold ${getThemeColor(scene.theme)}`}>
                Theme: {scene.theme}
              </p>
            </div>
            
            <div>
              <h3 className="mb-2 font-lexend text-lg font-semibold text-white">Missed Detail</h3>
              <p className="text-gray-300">{scene.missedDetail}</p>
            </div>
            
            <div className="rounded-lg bg-black/50 p-4">
              <h3 className="mb-2 font-lexend text-lg font-semibold text-white">Reflection</h3>
              <p className="text-lg italic text-gray-300">{scene.reflection}</p>
            </div>
          </div>
          
          <div className="mt-6 text-right">
            <Button onClick={onClose} variant="secondary">Close</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SceneDetail;