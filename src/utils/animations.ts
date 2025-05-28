import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const textReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: 'easeOut'
    }
  }
};

export const glitchText: Variants = {
  normal: { 
    x: 0,
    y: 0,
    opacity: 1
  },
  glitch: {
    x: [0, -2, 5, -5, 0, 3, 0],
    y: [0, 1, -1, 2, 0, -1, 0],
    opacity: [1, 0.9, 1, 0.8, 1, 0.9, 1],
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

export const buttonPulse: Variants = {
  initial: { 
    scale: 1,
    boxShadow: '0 0 0 rgba(255, 255, 255, 0)'
  },
  pulse: {
    scale: [1, 1.02, 1],
    boxShadow: [
      '0 0 0 rgba(255, 255, 255, 0)',
      '0 0 10px rgba(255, 255, 255, 0.5)',
      '0 0 0 rgba(255, 255, 255, 0)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
};

export const backgroundZoom: Variants = {
  initial: { scale: 1 },
  zoom: {
    scale: 1.05,
    transition: {
      duration: 20,
      ease: 'linear'
    }
  }
};