import React from 'react';
import { motion } from 'framer-motion';
import { buttonPulse } from '../../utils/animations';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isPulsing?: boolean;
  isGlitching?: boolean;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isPulsing = false,
  isGlitching = false,
  className = '',
  disabled = false
}) => {
  const baseStyles = 'font-lexend inline-flex items-center justify-center transition-all duration-200 focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-white bg-opacity-10 text-white border border-white border-opacity-20 hover:bg-opacity-20',
    secondary: 'bg-transparent text-white border border-white border-opacity-50 hover:border-opacity-100',
    ghost: 'bg-transparent text-white hover:bg-white hover:bg-opacity-5'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-8 py-3 text-lg'
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      variants={isPulsing ? buttonPulse : undefined}
      initial={isPulsing ? 'initial' : undefined}
      animate={isPulsing ? 'pulse' : undefined}
      whileHover={isGlitching ? { x: [0, -2, 2, -1, 1, 0], transition: { duration: 0.2 } } : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;