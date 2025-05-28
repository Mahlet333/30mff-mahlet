import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import Analysis from './components/Analysis';
import Trace from './components/Trace';
import landingImg from './assets/landing.png';
import myselfImg from './assets/myself.png';
import windChimeSound from './assets/wind-chime-atmos-185391.mp3';

const LETTERS = [
  "I still hear the elevator at night.",
  "I left my name in the stairwell.",
  "The lights never really turn off.",
  "I saw my own shadow leave before me.",
  "I never found the exit.",
  "The walls remember more than I do.",
  "I wrote this so I wouldn't forget.",
  "I think the campus is watching.",
  "I lost time in the library.",
  "I left a piece of myself here.",
];

const GALLERY_IMAGES = [
  { src: 'https://placehold.co/600x400/222/666?text=Deleted+Still+1', note: 'Director note: The shadow was not planned.' },
  { src: 'https://placehold.co/600x400/222/666?text=Deleted+Still+2', note: 'Director note: The camera glitched here.' },
  { src: 'https://placehold.co/600x400/222/666?text=Deleted+Still+3', note: 'Director note: This frame was never meant to be seen.' },
];

const SECTION_COLORS = [
  'rgba(30,30,30,0.85)', // Landing: dark gray
  'rgba(10,10,10,0.92)', // Film: deeper black
  'rgba(60,0,0,0.7)',    // Analysis: red haze
  'rgba(10,10,10,0.92)', // Trace: back to black
  'rgba(255,255,255,0.12)', // Archive: soft white
  'rgba(10,10,10,0.92)', // Farewell: black
];

// Define section background styles
const SECTION_BG = [
  // Landing
  "bg-gradient-to-b from-black via-gray-900 to-gray-800",
  // About
  "bg-gradient-to-b from-[#1a1a1a] via-[#2d1e22] to-[#3a2323]",
  // Film
  "bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#232946]",
  // Analysis
  "bg-gradient-to-b from-[#2d1e22] via-[#3a2323] to-[#e63946]",
  // Trace
  "bg-gradient-to-b from-[#232946] via-[#1a1a2e] to-[#0a0a0a]",
  // Archive
  "bg-gradient-to-b from-[#1a1a1a] via-[#eab308] to-[#232946]",
  // Farewell
  "bg-gradient-to-b from-black via-gray-900 to-gray-800"
];

// Consistent font and color classes
const headingClass = "font-lexend-bold text-4xl md:text-6xl text-white mb-8 drop-shadow-lg";
const subheadingClass = "font-lexend-bold text-2xl md:text-3xl text-campus-accent mb-4";
const bodyClass = "font-lexend-light text-lg md:text-xl text-white mb-4";
const accentClass = "text-campus-accent";
const sectionContentMotion = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: 'easeOut' }
};

// Add section labels for navigation
const NAV_SECTIONS = [
  { label: 'Home', idx: 0 },
  { label: 'Film', idx: 1 },
  { label: 'About', idx: 2 },
  { label: 'Analysis', idx: 3 },
  { label: 'Archive', idx: 5 },
  { label: 'Filmmaker', idx: 6 },
  { label: 'Farewell', idx: 7 },
];

function useSectionFade(sectionCount: number) {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.sectionidx);
            setActive(idx);
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [sectionCount]);

  return { active, sectionRefs };
}

function AutoScrollMessages() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % LETTERS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-full flex flex-col items-center justify-center transition-all duration-700">
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-lg font-lexend text-campus-accent text-center px-2"
        transition={{ duration: 0.7 }}
      >
        {LETTERS[index]}
      </motion.p>
    </div>
  );
}

function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
        {children}
        <button className="absolute top-2 right-2 text-white text-2xl" onClick={onClose} aria-label="Close">×</button>
      </div>
    </motion.div>
  );
}

const App = () => {
  const [hasVisited, setHasVisited] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [showIdleOverlay, setShowIdleOverlay] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [countdown, setCountdown] = useState(90);
  const [countdownActive, setCountdownActive] = useState(true);
  const [modal, setModal] = useState<null | 'gallery' | 'letters' | 'ritual'>(null);
  const [showLandingBg, setShowLandingBg] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });

  const sectionCount = 7; // landing, about, film, analysis, trace, archive, farewell
  const { active, sectionRefs } = useSectionFade(sectionCount);

  // Section heights and offsets for smooth scroll
  const sectionHeights = Array(sectionCount).fill(0);
  useEffect(() => {
    if (!scrollRef.current) return;
    let offset = 0;
    Array.from(scrollRef.current.children).forEach((child, i) => {
      sectionHeights[i] = (child as HTMLElement).offsetHeight;
      offset += sectionHeights[i];
    });
  }, []);

  // Handle idle state
  useEffect(() => {
    const handleActivity = () => {
      if (idleTimer) clearTimeout(idleTimer);
      setShowIdleOverlay(false);
      
      const timer = setTimeout(() => {
        setShowIdleOverlay(true);
      }, 10000); // 10 seconds
      
      setIdleTimer(timer);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [idleTimer]);

  // Check if user has visited before
  useEffect(() => {
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setHasVisited(true);
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // Add smooth scroll handling
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.style.overflow = 'hidden';
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.style.overflow = '';
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Update section change handling
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!scrollRef.current) return;
          
          const sections = scrollRef.current.children;
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const scrollDelta = Math.abs(scrollPosition - lastScrollY);
          
          // Only update section if we've scrolled enough
          if (scrollDelta > windowHeight * 0.1) {
            for (let i = 0; i < sections.length; i++) {
              const section = sections[i] as HTMLElement;
              const sectionTop = section.offsetTop;
              const sectionHeight = section.offsetHeight;
              
              if (scrollPosition >= sectionTop - windowHeight / 3 && 
                  scrollPosition < sectionTop + sectionHeight - windowHeight / 3) {
                setCurrentSection(i);
                break;
              }
            }
            lastScrollY = scrollPosition;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!countdownActive) return;
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, countdownActive]);

  // Track scroll position to control landing background
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const sections = scrollRef.current.querySelectorAll('.section');
      let thirdSectionBottom = 0;
      for (let i = 0; i < 3; i++) {
        if (sections[i]) {
          thirdSectionBottom += (sections[i] as HTMLElement).offsetHeight;
        }
      }
      setShowLandingBg(window.scrollY < thirdSectionBottom - 10); // 10px buffer
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to next section
  const scrollToSection = (index: number) => {
    if (!scrollRef.current) return;
    const sections = scrollRef.current.querySelectorAll('.section');
    if (sections[index]) {
      const top = (sections[index] as HTMLElement).offsetTop;
      scrollRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [soundStarted, setSoundStarted] = useState(false);

  // Pause ambient sound when video plays, resume when paused
  const handleVideoPlay = () => {
    if (audioRef.current) audioRef.current.pause();
  };
  const handleVideoPause = () => {
    if (audioRef.current && !isMuted && soundStarted) audioRef.current.play();
  };

  // Start sound on user click
  const handleStartSound = () => {
    setSoundStarted(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play();
      }
    }, 100);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-black/30">
        <div className="max-w-6xl mx-auto flex items-center justify-center px-4 py-2">
          <ul className="flex gap-4 md:gap-8 w-full justify-center">
            {NAV_SECTIONS.map(({ label, idx }) => (
              <li key={label}>
                <button
                  className={
                    `text-white font-lexend-light transition-colors px-2 py-1 text-base md:text-lg ` +
                    (active === idx ? 'text-campus-accent font-bold underline' : 'hover:text-campus-accent')
                  }
                  onClick={() => scrollToSection(idx)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* Ambient Sound Player */}
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-black/60 rounded-full px-3 py-1 shadow-lg">
        {!soundStarted ? (
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-campus-accent/90 text-white font-lexend-bold text-base shadow-md hover:bg-campus-accent transition-colors focus:outline-none focus:ring-2 focus:ring-campus-accent/60"
            onClick={handleStartSound}
          >
            Enable Ambient Sound
          </button>
        ) : (
          <>
            <audio
              ref={audioRef}
              src={windChimeSound}
              loop
              muted={isMuted}
            />
            <button
              className="text-campus-accent font-lexend-bold text-lg focus:outline-none"
              onClick={() => {
                setIsMuted((m) => {
                  if (audioRef.current) audioRef.current.muted = !m;
                  if (!m && audioRef.current) audioRef.current.pause();
                  if (m && audioRef.current) audioRef.current.play();
                  return !m;
                });
              }}
              aria-label={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <span className="text-xs text-white/70 font-lexend-light">Ambient</span>
          </>
        )}
      </div>
      <div ref={scrollRef} className="h-full relative overflow-y-auto pt-14" style={{ scrollBehavior: 'smooth' }}>
        {/* Fixed, animated grain + gradient background */}
        <motion.div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.7) 100%), url(${landingImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: showLandingBg ? 1 : 0,
            transition: 'none',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ scale: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } }}
        />

        {/* Sections with crossfade and overlap */}
        <div className="relative z-10">
          {/* Landing Section */}
          <section
            className="section relative flex items-center justify-center overflow-hidden min-h-screen"
            ref={el => sectionRefs.current[0] = el}
            data-sectionidx={0}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white max-w-4xl mx-auto p-8 relative z-10"
            >
              <h1 className={headingClass}>I thought I came to study<br /><span className={accentClass}>(but the campus studied me)</span></h1>
              <p className="text-2xl md:text-3xl font-lexend-light mb-10 text-campus-accent">A short film about how space shapes us, even when we're not looking.</p>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-8 font-lexend"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                This is a film about what campuses do to people.
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 font-lexend-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                It lasts 90 seconds. That's long enough to forget where you are.
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                className="mb-8 flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <span className="text-2xl md:text-3xl font-lexend-bold text-campus-accent tracking-widest">
                  {countdown > 0 ? `${countdown}s` : '0s'}
                </span>
                <span className="text-lg text-gray-400 font-lexend-light">until it's too late to leave</span>
              </motion.div>

              {/* Guerrilla filming text */}
              <motion.div
                className="mb-12 space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
              >
                <p 
                  className="text-3xl md:text-4xl font-lexend-bold text-campus-accent text-glitch"
                  data-text="The campus is watching."
                >
                  The campus is watching.
                </p>
                <p className="text-lg font-lexend-light text-gray-400">
                  Just the truth the architecture remembers.
                </p>
              </motion.div>

              <motion.button
                className={`px-8 py-4 bg-white text-black rounded-lg font-lexend transition-colors relative group ${countdown === 0 ? 'opacity-60' : 'hover:bg-gray-200'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  opacity: { delay: 4 },
                  scale: { repeat: Infinity, duration: 8 }
                }}
                onClick={() => scrollToSection(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">
                  {countdown === 0 ? "Too late to leave now" : "Watch it happen"}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-campus-accent rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {countdown === 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-4 text-campus-accent text-lg font-lexend text-center"
                >
                  Click here to see what the campus has in store for you…
                </motion.p>
              )}

              {showIdleOverlay && active === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute top-0 left-0 w-full text-center text-white text-lg bg-black/40 py-2"
                  style={{zIndex: 20}}
                >
                  73% of viewers who pause here report hearing footsteps behind them later.
                </motion.div>
              )}
            </motion.div>

            {/* Ambient sound hint */}
            <motion.div 
              className="absolute bottom-4 right-4 text-gray-500 text-sm font-lexend-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 5 }}
            >
              🔊 Ambient sound available
            </motion.div>
          </section>

          {/* Film Section */}
          <section
            className="section flex flex-col items-center justify-center p-0 min-h-screen"
            ref={el => sectionRefs.current[1] = el}
            data-sectionidx={1}
            style={{ position: 'relative', zIndex: 8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl aspect-video flex flex-col items-center justify-center"
            >
              <YouTube 
                videoId="AlQaNkHNYYw"
                className="w-full h-full"
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnd={handleVideoPause}
              />
            </motion.div>
            <motion.p 
              className="text-white text-xl mt-8 font-lexend-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              We didn't film it. We revealed it.
            </motion.p>
          </section>

          {/* About Section */}
          <section
            className="section flex items-center justify-center min-h-screen pt-20 pb-20"
            ref={el => sectionRefs.current[2] = el}
            data-sectionidx={2}
            style={{ position: 'relative', zIndex: 9 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto p-8 bg-black/90 rounded-xl shadow-xl text-white text-lg md:text-xl font-lexend-light leading-relaxed"
            >
              <h2 className={subheadingClass}>About the Film</h2>
              <p className="mb-4">I thought I came to study (but the campus studied me) is about a student who slowly begins to realize something unsettling. University is not just about classes or deadlines. It is about the spaces you move through every day. At first, those spaces seem ordinary: a dorm room, a humming laundry machine, a flickering hallway light, the soft glow of a laptop screen at three in the morning. But over time, the student senses something else. The campus is not just a backdrop. It is paying attention. It watches. It regulates. It does not ask anything directly, but somehow, you begin to change. Your thoughts. Your rhythms. Even your silences.</p>
              <p className="mb-4">The film drifts quietly through these places. There are no fast cuts. No loud sounds. It invites you to slow down and feel. To notice. To ask: what is really shaping me here? This is not a scary story. There are no monsters. No villains. Just architecture. Routine. Quiet pressure.</p>
              <p className="mb-4">Shot entirely on location at NYU Abu Dhabi, using real campus spaces, the film tries to capture what it actually feels like to live on campus. Being busy but still stuck. Being watched, but not by cameras. Just by the space itself. The building. The air. The system.</p>
              <p className="mb-4">The film is short. Only ninety seconds. But it might stay with you longer.</p>
              <p className="italic text-campus-accent mt-6">What space studied you?</p>
            </motion.div>
          </section>

          {/* Analysis Section */}
          <section
            className={`section min-h-screen ${SECTION_BG[3]}`}
            ref={el => sectionRefs.current[3] = el}
            data-sectionidx={3}
            style={{ position: 'relative', zIndex: 7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-full w-full"
            >
              <Analysis />
            </motion.div>
          </section>

          {/* Trace Section */}
          <section
            className={`section min-h-screen ${SECTION_BG[4]}`}
            ref={el => sectionRefs.current[4] = el}
            data-sectionidx={4}
            style={{ position: 'relative', zIndex: 6 }}
          >
            <Trace />
          </section>

          {/* Archive Section */}
          <section
            className={`section py-12 min-h-screen relative ${SECTION_BG[5]}`}
            ref={el => sectionRefs.current[5] = el}
            data-sectionidx={5}
            style={{ position: 'relative', zIndex: 5 }}
          >
            {/* Animated ambient background for Archive */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              style={{
                background: 'radial-gradient(ellipse at 60% 40%, #e6394633 0%, #0A0A0A 80%)',
                transition: 'background 2s',
              }}
            />
            <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center relative z-10">
              <motion.h2 
                className="text-4xl md:text-5xl font-lexend-bold mb-12 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                The Archive
              </motion.h2>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 min-h-[420px]"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                {/* Deleted Shadows - vertical flicker/shadow, clickable */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 min-h-[340px] flex flex-col justify-center items-center bg-black/70 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 32px 4px #e6394644' }}
                  tabIndex={0}
                  onClick={() => setModal('gallery')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('gallery')}
                  aria-label="Open Deleted Shadows gallery"
                >
                  <h3 className={subheadingClass}>Deleted Shadows</h3>
                  <p className="text-lg text-gray-300 text-center font-lexend-light">Stills and director notes from the cutting room floor.</p>
                </motion.div>

                {/* Letters to the Campus - auto-scroll, ghostly underline, clickable */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 min-h-[340px] flex flex-col justify-center items-center bg-black/70 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 32px 4px #e6394644' }}
                  style={{ height: '100%' }}
                  tabIndex={0}
                  onClick={() => setModal('letters')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('letters')}
                  aria-label="Open Letters to the Campus"
                >
                  <h3 className={subheadingClass}>Letters to the Campus</h3>
                  <div className="absolute left-0 right-0 top-12 bottom-0 overflow-hidden z-10">
                    <AutoScrollMessages />
                  </div>
                  {/* Ghostly underline */}
                  <motion.div
                    className="absolute left-6 right-6 bottom-6 h-1 rounded-full bg-campus-accent/30 blur-sm"
                    animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    style={{ originX: 0.5 }}
                  />
                </motion.div>

                {/* The Ritual - pronounced flicker, tilt, crescent moon, clickable */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 min-h-[340px] flex flex-col justify-center items-center bg-campus-accent/20 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 32px 4px #e6394644' }}
                  style={{ boxShadow: '0 0 24px 2px #eab30855' }}
                  tabIndex={0}
                  onClick={() => setModal('ritual')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('ritual')}
                  aria-label="Open The Ritual"
                >
                  <span className="absolute top-2 right-4 text-3xl text-campus-accent animate-pulse">🌙</span>
                  <h3 className={subheadingClass}>The Ritual</h3>
                  <p className="text-lg text-gray-300 text-center font-lexend-light">Visit this URL at 3AM on a full moon. You'll know why when you do.</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Modals for Archive tiles */}
            <AnimatePresence>
              {modal === 'gallery' && (
                <Modal open={true} onClose={() => setModal(null)}>
                  <h2 className="text-2xl font-lexend-bold mb-6 text-campus-accent">Deleted Shadows</h2>
                  <div className="space-y-6">
                    {GALLERY_IMAGES.map((img, i) => (
                      <div key={i} className="flex flex-col md:flex-row gap-4 items-center">
                        <img src={img.src} alt={img.note} className="w-48 h-32 object-cover rounded shadow" />
                        <span className="text-gray-300 text-sm font-lexend-light">{img.note}</span>
                      </div>
                    ))}
                  </div>
                </Modal>
              )}
              {modal === 'letters' && (
                <Modal open={true} onClose={() => setModal(null)}>
                  <h2 className="text-2xl font-lexend-bold mb-6 text-campus-accent">Letters to the Campus</h2>
                  <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                    {LETTERS.map((msg, i) => (
                      <div key={i} className="text-lg font-lexend text-gray-200 bg-black/40 rounded p-3 border border-campus-accent/20">
                        {msg}
                      </div>
                    ))}
                  </div>
                </Modal>
              )}
              {modal === 'ritual' && (
                <Modal open={true} onClose={() => setModal(null)}>
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <span className="text-5xl animate-pulse text-campus-accent">🌙</span>
                    <h2 className="text-2xl font-lexend-bold text-campus-accent">The Ritual</h2>
                    <p className="text-lg text-gray-200 text-center">You are not supposed to be here.<br/>Return at 3AM on a full moon.<br/>If you remember this, you already know too much.</p>
                    <motion.div
                      className="w-24 h-2 rounded-full bg-campus-accent/40 blur-sm mt-4"
                      animate={{ opacity: [0.2, 0.7, 0.2], scaleX: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                      style={{ originX: 0.5 }}
                    />
                  </div>
                </Modal>
              )}
            </AnimatePresence>
          </section>

          {/* Filmmaker & Contact Section */}
          <section
            className="section flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 pt-20 pb-20"
            ref={el => sectionRefs.current[6] = el}
            data-sectionidx={6}
            style={{ position: 'relative', zIndex: 4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto p-8 bg-black/90 rounded-xl shadow-xl text-white text-lg md:text-xl font-lexend-light leading-relaxed text-center"
            >
              <img
                src={myselfImg}
                alt="Portrait of Mahlet Atresaw Andarge"
                className="mx-auto mb-6 w-32 h-32 rounded-full object-cover border-4 border-campus-accent shadow-lg"
              />
              <h2 className="text-3xl md:text-4xl font-lexend-bold mb-6 text-campus-accent">About the Filmmaker</h2>
              <p className="mb-6">Mahlet Atresaw Andarge is a filmmaker and student at NYU Abu Dhabi. Her work explores the subtle ways environments shape our inner lives, with a focus on memory, routine, and the architecture of feeling. She believes the spaces we inhabit are never neutral—they watch, they remember, and they change us.</p>
              <h3 className="text-2xl font-lexend-bold mb-2 text-campus-accent mt-8">Contact Me</h3>
              <p className="mb-2">For questions, collaborations, or just to say hello:</p>
              <a href="mailto:your.email@domain.com" className="text-campus-accent underline text-xl font-lexend-bold hover:text-white transition-colors">your.email@domain.com</a>
            </motion.div>
          </section>

          {/* Farewell Section */}
          <section
            className={`section flex items-center justify-center min-h-[30vh] ${SECTION_BG[6]}`}
            ref={el => sectionRefs.current[7] = el}
            data-sectionidx={7}
            style={{ position: 'relative', zIndex: 3 }}
          >
            <motion.div 
              className="text-center space-y-6 p-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <p className="text-2xl font-lexend">Deleting your visit history...</p>
              <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-campus-accent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                />
              </div>
              <p className="text-lg font-lexend-light text-gray-400">Just kidding. Campuses never forget.</p>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default App;