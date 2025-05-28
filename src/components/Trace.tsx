import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PAST_WORDS = [
  'Sleep', 'Home', 'Voice', 'Shadow', 'Time', 'Name', 'Dream', 'Light', 'Hope', 'Fear', 'Memory', 'Touch', 'Sound', 'Face', 'Truth', 'Silence', 'Friend', 'Map', 'Key', 'Song', 'Wish', 'Echo', 'Path', 'Mark', 'Trace', 'Secret', 'Note', 'Book', 'Step', 'Night', 'Day', 'Room', 'Wall', 'Lock', 'Gate', 'Call', 'Sign', 'Line', 'Thread', 'Pulse', 'Code', 'Word', 'Look', 'Shape', 'Form', 'Edge', 'Mark', 'Trace', 'Ghost', 'Flicker', 'Signal', 'Mark', 'Trace', 'Ghost', 'Flicker', 'Signal', 'Mark', 'Trace', 'Ghost', 'Flicker', 'Signal',
];

const Trace = () => {
  const [userWord, setUserWord] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [allWords, setAllWords] = useState(PAST_WORDS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWord.trim()) return;

    const randomId = Math.floor(Math.random() * 10000);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    setFlash(true);
    setAllWords([userWord, ...allWords.slice(0, 49)]); // keep grid at 50
    setTimeout(() => {
      setFlash(false);
      setReceipt(`Subject #${randomId}: Memory altered. Next observation: ${nextWeek.toLocaleDateString()}`);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="h-full flex items-center justify-center relative">
      {/* Ghosted grid of past words */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none grid grid-cols-6 gap-4 opacity-10">
        {allWords.map((word, i) => (
          <span key={i} className="text-center text-lg font-lexend text-white opacity-60 animate-pulse" style={{animationDelay: `${i * 0.07}s`}}>{word}</span>
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-lexend-bold mb-8">
            Leave Your Trace
          </h2>

          <p className="text-xl font-lexend mb-12">
            What did the campus steal from you?
          </p>

          <AnimatePresence mode="wait">
            {!submitted && !flash && (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <input
                  type="text"
                  value={userWord}
                  onChange={(e) => setUserWord(e.target.value)}
                  maxLength={20}
                  placeholder="Enter one word"
                  className="w-full max-w-md px-6 py-4 text-xl bg-transparent border-2 border-gray-700 rounded-lg focus:border-campus-accent focus:outline-none text-center font-lexend"
                />

                <motion.button
                  type="submit"
                  className="px-8 py-3 bg-campus-accent text-white rounded-lg font-lexend hover:bg-opacity-90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit to the Archive
                </motion.button>
              </motion.form>
            )}
            {flash && (
              <motion.div
                key="flash"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.7 }}
                className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              >
                <span className="text-6xl md:text-7xl font-lexend-bold text-campus-accent drop-shadow-lg animate-pulse">
                  {userWord}
                </span>
              </motion.div>
            )}
            {submitted && !flash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-lexend-light italic text-campus-accent"
                >
                  "{userWord}"
                </motion.div>

                {receipt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 border border-gray-700 rounded-lg font-mono text-sm"
                  >
                    <pre>{receipt}</pre>
                  </motion.div>
                )}

                <motion.button
                  onClick={() => {
                    setSubmitted(false);
                    setUserWord('');
                    setReceipt(null);
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Leave another trace
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Trace; 