import { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

interface AudioBackgroundProps {
  ambientSrc?: string;
}

const AudioBackground: React.FC<AudioBackgroundProps> = ({
  ambientSrc = '/audio/ambient-hum.mp3' // This should be placed in the public folder
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { state } = useAppContext();
  const { ambientSoundEnabled } = state.accessibilitySettings;
  
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio(ambientSrc);
      audio.loop = true;
      audio.volume = 0.2; // 20% volume as specified
      audioRef.current = audio;
    }
    
    // Play or pause based on preference
    if (ambientSoundEnabled) {
      const playPromise = audioRef.current.play();
      
      // Handle cases where browser requires user interaction before playing
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented. This is fine, user will need to interact first.
          console.log('Audio play prevented. User interaction needed first.');
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [ambientSoundEnabled, ambientSrc]);

  // No visual rendering
  return null;
};

export default AudioBackground;