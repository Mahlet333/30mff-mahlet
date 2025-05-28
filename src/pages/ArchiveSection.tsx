import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import { fadeIn, staggerChildren } from '../utils/animations';
import { DELETED_SCENES, USER_CONFESSIONS } from '../data/filmData';
import { isFullMoonAt3AM } from '../utils/helpers';

const ArchiveSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'deleted' | 'confessions' | 'ritual'>('deleted');
  const [isRitualTime, setIsRitualTime] = useState(false);
  
  useEffect(() => {
    // Check if it's 3AM on a full moon
    setIsRitualTime(isFullMoonAt3AM());
    
    // Set up an interval to check every minute
    const intervalId = setInterval(() => {
      setIsRitualTime(isFullMoonAt3AM());
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleSignOut = () => {
    navigate('/farewell');
  };
  
  return (
    <motion.div 
      className="min-h-screen w-full bg-black py-16 text-white"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h1 className="font-lexend text-3xl font-bold sm:text-4xl md:text-5xl">
            The Archive
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            What the institution doesn't want you to remember.
          </p>
        </div>
        
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => setSelectedTab('deleted')}
            variant={selectedTab === 'deleted' ? 'primary' : 'ghost'}
          >
            Deleted Shadows
          </Button>
          <Button 
            onClick={() => setSelectedTab('confessions')}
            variant={selectedTab === 'confessions' ? 'primary' : 'ghost'}
          >
            Letters to the Campus
          </Button>
          <Button 
            onClick={() => setSelectedTab('ritual')}
            variant={selectedTab === 'ritual' ? 'primary' : 'ghost'}
          >
            The Ritual
          </Button>
        </div>
        
        <div className="rounded-lg bg-gray-900 p-6">
          {selectedTab === 'deleted' && (
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <h2 className="mb-6 font-lexend text-2xl">Deleted Shadows</h2>
              <p className="mb-8 text-gray-400">
                Scenes that didn't make the final cut. The campus didn't want these stories told.
              </p>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {DELETED_SCENES.map((scene, index) => (
                  <motion.div 
                    key={index}
                    className="overflow-hidden rounded-lg bg-gray-800"
                    variants={fadeIn}
                  >
                    <img 
                      src={scene.imageUrl} 
                      alt={scene.title} 
                      className="aspect-video w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-lexend text-lg font-bold">{scene.title}</h3>
                      <p className="mt-2 text-sm text-gray-400">{scene.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {selectedTab === 'confessions' && (
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <h2 className="mb-6 font-lexend text-2xl">Letters to the Campus</h2>
              <p className="mb-8 text-gray-400">
                Anonymous confessions from those who came before you.
              </p>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {USER_CONFESSIONS.map((confession, index) => (
                  <motion.div 
                    key={index}
                    className="rounded-lg bg-gray-800 p-4"
                    variants={fadeIn}
                  >
                    <p className="italic text-gray-300">"{confession}"</p>
                    <p className="mt-2 text-right text-xs text-gray-500">— Student #{Math.floor(Math.random() * 10000)}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {selectedTab === 'ritual' && (
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <h2 className="mb-6 font-lexend text-2xl">The Ritual</h2>
              
              {isRitualTime ? (
                <motion.div variants={fadeIn}>
                  <div className="rounded-lg bg-gray-800 p-8 text-center">
                    <h3 className="mb-4 font-lexend text-xl font-bold text-red-400">The Ritual Has Begun</h3>
                    <p className="mb-6 text-lg">
                      You've found the secret. The campus is listening.
                    </p>
                    <p className="mb-8 text-lg">
                      Look behind you. Count to three. Turn back to the screen.
                    </p>
                    <p className="text-sm text-gray-400">
                      Whatever you saw, or think you saw, is now part of you.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div variants={fadeIn}>
                  <div className="rounded-lg bg-gray-800 p-8 text-center">
                    <div className="mb-4 flex items-center justify-center">
                      <Clock size={48} className="text-gray-400" />
                    </div>
                    <h3 className="mb-4 font-lexend text-xl">
                      Visit this URL at 3AM on a full moon
                    </h3>
                    <p className="text-gray-400">
                      You'll know why when you do.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button onClick={handleSignOut} variant="secondary" size="lg">
            Sign Out
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchiveSection;