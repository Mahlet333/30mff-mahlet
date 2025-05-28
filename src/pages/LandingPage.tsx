import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, Eye, Volume2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { textReveal, staggerChildren, backgroundZoom } from '../utils/animations';
import { isIdleForSeconds } from '../utils/helpers';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [idleState, setIdleState] = useState(false);
  const [buttonText, setButtonText] = useState('Watch it happen');
  
  useEffect(() => {
    const cleanupTimer = isIdleForSeconds(10, () => {
      setIdleState(true);
      setButtonText('Too late to leave now');
    });
    
    return cleanupTimer;
  }, []);
  
  const handleWatchClick = () => {
    navigate('/pre-play');
  };
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* First Section: Hero */}
      <motion.section 
        className="relative h-screen"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/2079451/pexels-photo-2079451.jpeg)'
          }}
          variants={backgroundZoom}
          initial="initial"
          animate="zoom"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 md:px-8">
          <motion.div className="max-w-2xl text-center" variants={staggerChildren}>
            <motion.h1 
              className="mb-12 font-lexend text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
              variants={textReveal}
            >
              I thought I came to study
              <br />
              <span className="mt-2 block opacity-70">(but the campus studied me)</span>
            </motion.h1>
            
            <motion.div variants={textReveal}>
              <Button 
                onClick={handleWatchClick} 
                size="lg"
                isPulsing={true}
                isGlitching={idleState}
                className="mt-4"
              >
                {buttonText}
              </Button>
            </motion.div>
            
            {idleState && (
              <motion.p 
                className="mt-8 text-sm text-red-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                73% of viewers who pause here report hearing footsteps behind them later.
              </motion.p>
            )}
          </motion.div>
          
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <ArrowDown className="h-8 w-8 text-white opacity-50" />
          </motion.div>
        </div>
      </motion.section>

      {/* Second Section: The Truth */}
      <motion.section 
        className="relative min-h-screen bg-black py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-24">
            <motion.div 
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-lexend text-2xl font-light leading-relaxed md:text-3xl">
                This is a film about what campuses do to people.
              </p>
            </motion.div>

            <motion.div 
              className="text-right"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-lexend text-2xl font-light leading-relaxed md:text-3xl">
                Not the lectures.
                <br />
                Not the parties.
                <br />
                The way the walls lean in when you're alone.
              </p>
            </motion.div>

            <motion.div 
              className="text-left"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-lexend text-2xl font-light leading-relaxed md:text-3xl">
                It lasts 90 seconds.
                <br />
                That's long enough to forget where you are.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Third Section: Behind the Scenes */}
      <motion.section 
        className="relative min-h-screen bg-gray-900 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div 
            className="rounded-lg bg-black/50 p-8 backdrop-blur-sm"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 font-lexend text-xl font-light text-gray-400">
              Production Notes
            </h2>
            
            <div className="space-y-6 text-lg">
              <p>
                Filmed guerrilla-style at NYU Abu Dhabi.
                <br />
                No permits. No actors.
              </p>
              
              <p>
                Just the truth the architecture remembers.
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>5,400 frames</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 size={16} />
                  <span>Binaural audio</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final Section: Call to Action */}
      <motion.section 
        className="relative flex min-h-screen items-center justify-center bg-black py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 font-lexend text-3xl font-light md:text-4xl">
              Ready to see what the campus sees?
            </h2>
            
            <Button 
              onClick={handleWatchClick} 
              size="lg"
              isPulsing={true}
              isGlitching={idleState}
            >
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;