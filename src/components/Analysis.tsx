import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import img9 from '../assets/9.png';
import img10 from '../assets/10.png';

interface Scene {
  title: string;
  image: string;
  surface: string;
  campusAction: string;
  missedDetail: string;
  scriptLine: string;
  reflection: string;
}

const scenes: Scene[] = [
  {
    title: "Wild grass and pink flowers glow in filtered sun",
    image: img1,
    surface: "Wild grass and pink flowers glow in filtered sun",
    campusAction: "Curating a softness that looks natural but is orchestrated — designed stillness as illusion of peace.",
    missedDetail: "No path in the grass. But someone's been walking.",
    scriptLine: "The light hit different.",
    reflection: "When did peace start feeling planted?",
  },
  {
    title: "Bright, tidy courtyard boxed in by dorm windows",
    image: img2,
    surface: "Bright, tidy courtyard boxed in by dorm windows",
    campusAction: "Reinforcing order through symmetry and stillness — movement feels permitted, not chosen.",
    missedDetail: "The ping pong table net is sagging — meaning use, but no players remain.",
    scriptLine: "None of this is chaotic. That's the point.",
    reflection: "What part of your day did you not design?",
  },
  {
    title: "Staircase lit like a golden tunnel to nowhere",
    image: img3,
    surface: "Staircase lit like a golden tunnel to nowhere",
    campusAction: "Funneling choice — creating the illusion of movement while limiting direction.",
    missedDetail: "No exit sign. The staircase leads to exposure, not escape.",
    scriptLine: "You're not walking — you're being funneled.",
    reflection: "What path are you walking just because it was built?",
  },
  {
    title: "Four cafeteria chairs surrounding empty tables",
    image: img4,
    surface: "Four cafeteria chairs surrounding empty tables",
    campusAction: "Structuring silence — shaping social dynamics through spatial distance.",
    missedDetail: "The chair legs don't line up. Someone left in a rush.",
    scriptLine: "Rituals replace autonomy.",
    reflection: "When did quiet start meaning obedience?",
  },
  {
    title: "A cat standing still, bird limp in its mouth",
    image: img5,
    surface: "A cat standing still, bird limp in its mouth",
    campusAction: "Instinct looks organic, but time moves too slowly — nature copies the rules of the institution.",
    missedDetail: "No blood. No urgency. Just completion.",
    scriptLine: "Even the birds walk like they have time.",
    reflection: "What do you carry without fighting back?",
  },
  {
    title: "Graffiti scratched faintly into the dorm wall",
    image: img6,
    surface: "Graffiti scratched faintly into the dorm wall",
    campusAction: "Letting secrets remain in the margins — encouraging messages no one's meant to see.",
    missedDetail: "One word reads 'vanish' — scratched over a week ago.",
    scriptLine: "This place eats time.",
    reflection: "What would your walls say if you stopped to listen?",
  },
  {
    title: "Sizzling food on a grill, no faces in sight",
    image: img7,
    surface: "Sizzling food on a grill, no faces in sight",
    campusAction: "Prioritizing output — faceless labor, automated care, sterilized nourishment.",
    missedDetail: "Glove brand worn off — same person, hundreds of meals.",
    scriptLine: "Everything has a system. Even what you eat.",
    reflection: "When did meals stop tasting like nourishment?",
  },
  {
    title: "Security camera at the building's edge, tilted",
    image: img8,
    surface: "Security camera at the building's edge, tilted",
    campusAction: "Tracking without threatening — passive optics that document your presence.",
    missedDetail: "The camera points exactly where you paused.",
    scriptLine: "Soft surveillance doesn't record. It remembers.",
    reflection: "Who watches you when no one's looking?",
  },
  {
    title: "A messy bed dimly lit through blinds",
    image: img9,
    surface: "A messy bed dimly lit through blinds",
    campusAction: "Transforming privacy into stagnation — your rest becomes a monitored routine.",
    missedDetail: "The bottle in the corner is still half full — for days.",
    scriptLine: "The bed never felt restful. Just paused.",
    reflection: "What does your rest reveal about your life?",
  },
  {
    title: "Face lit only by laptop glow in the dark",
    image: img10,
    surface: "Face lit only by laptop glow in the dark",
    campusAction: "Extending hours — replacing night with tasklight, trading dreams for deadlines.",
    missedDetail: "The cursor moved once. No hand touched the trackpad.",
    scriptLine: "Back to back deadlines. No room to think.",
    reflection: "What does your laptop know about your fears?",
  },
];

const Analysis = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-300, 0, 300], [-1, 0, 1]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isExpanded]);

  const paginate = (newDirection: number) => {
    if (isExpanded) return;
    setCurrentScene((prev) => (prev + newDirection + scenes.length) % scenes.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    if (Math.abs(info.offset.x) > 100) {
      paginate(info.offset.x > 0 ? -1 : 1);
    }
    dragX.set(0);
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0">
        {scenes.map((scene, index) => (
          <motion.div
            key={scene.title}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentScene ? 1 : 0,
              scale: index === currentScene ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${scene.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.3)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative h-full w-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image */}
              <motion.div
                className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={scenes[currentScene].image}
                  alt={scenes[currentScene].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
              </motion.div>

              {/* Right Column - Text */}
              <motion.div
                className="space-y-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl font-lexend-bold text-campus-accent">
                  {scenes[currentScene].title}
                </h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400">The Surface</h3>
                    <p className="text-xl font-lexend">{scenes[currentScene].surface}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400">What the Campus Was Doing</h3>
                    <p className="text-xl font-lexend">{scenes[currentScene].campusAction}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400">Missed Detail</h3>
                    <p className="text-xl font-lexend italic">{scenes[currentScene].missedDetail}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400">Line from Script</h3>
                    <p className="text-2xl font-lexend-bold text-campus-accent">"{scenes[currentScene].scriptLine}"</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400">Reflect</h3>
                    <p className="text-xl font-lexend">{scenes[currentScene].reflection}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-10">
        <motion.button
          className="px-6 py-3 bg-black bg-opacity-50 text-white rounded-lg font-lexend hover:bg-opacity-70 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(-1)}
          disabled={isExpanded}
        >
          Previous
        </motion.button>

        <div className="flex gap-2">
          {scenes.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentScene ? 'bg-campus-accent' : 'bg-gray-600'
              }`}
              onClick={() => setCurrentScene(index)}
              whileHover={{ scale: 1.5 }}
              disabled={isExpanded}
            />
          ))}
        </div>

        <motion.button
          className="px-6 py-3 bg-black bg-opacity-50 text-white rounded-lg font-lexend hover:bg-opacity-70 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(1)}
          disabled={isExpanded}
        >
          Next
        </motion.button>
      </div>

      {/* Fullscreen View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setIsExpanded(false)}
          >
            <motion.img
              src={scenes[currentScene].image}
              alt={scenes[currentScene].title}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analysis; 