import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import { fadeIn, textReveal } from '../utils/animations';
import { INITIAL_SUBMISSIONS } from '../data/filmData';
import { generateId, randomUserId } from '../utils/helpers';
import { UserSubmission } from '../types';

const LeaveTraceSection: React.FC = () => {
  const navigate = useNavigate();
  const { setLastSubmittedWord } = useAppContext();
  const [submissions, setSubmissions] = useState<UserSubmission[]>(INITIAL_SUBMISSIONS);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [userId] = useState(() => randomUserId());
  
  useEffect(() => {
    // Load submissions from localStorage if they exist
    const savedSubmissions = localStorage.getItem('user-submissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    const newSubmission: UserSubmission = {
      id: generateId(),
      word: userInput.trim().toLowerCase(),
      timestamp: Date.now()
    };
    
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('user-submissions', JSON.stringify(updatedSubmissions));
    
    setLastSubmittedWord(userInput.trim().toLowerCase());
    setUserInput('');
    setSubmitted(true);
  };
  
  const handleContinue = () => {
    navigate('/archive');
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
            Leave Your Trace
          </h1>
        </div>
        
        <div className="mx-auto max-w-xl rounded-lg bg-gray-900 p-8">
          {!submitted ? (
            <div>
              <h2 className="mb-8 text-center font-lexend text-2xl">
                What did the campus steal from you?
              </h2>
              
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col items-center space-y-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    maxLength={20}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-center text-xl text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                    placeholder="enter one word"
                  />
                  <Button type="submit" size="lg" className="mt-4">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="mb-6 font-lexend text-2xl">Your word has been added to the collective memory</h2>
              
              <div className="mb-8 rounded-lg bg-gray-800 p-6">
                <pre className="font-mono text-sm text-gray-400">
                  {`Subject #${userId}: Memory altered.`}<br />
                  {`Word: "${userInput}"`}<br />
                  {`Next observation: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`}
                </pre>
              </div>
              
              <Button onClick={handleContinue} size="lg">
                Enter the Archive
              </Button>
            </motion.div>
          )}
        </div>
        
        {!submitted && (
          <motion.div 
            className="mt-16"
            variants={textReveal}
          >
            <h3 className="mb-6 text-center font-lexend text-xl">
              The Collective Memory
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3 rounded-lg bg-gray-900 p-6">
              {submissions.map((sub) => (
                <motion.span
                  key={sub.id}
                  className="inline-block rounded-full bg-gray-800 px-3 py-1 text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3,
                    delay: Math.random() * 0.5
                  }}
                >
                  {sub.word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LeaveTraceSection;