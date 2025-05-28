export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const calculateFutureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

export const isFullMoonAt3AM = (): boolean => {
  // This is a simplified version - in production, you'd use an actual lunar phase calculation
  const now = new Date();
  const hours = now.getHours();
  
  // Check if it's 3AM (or within a window)
  if (hours >= 3 && hours < 4) {
    // For demo purposes, we'll say the 15th of each month is a full moon
    return now.getDate() === 15;
  }
  
  return false;
};

export const randomUserId = (): string => {
  return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
};

export const isIdleForSeconds = (seconds: number, callback: () => void): () => void => {
  let timeout: number;
  
  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, seconds * 1000);
  };
  
  // Set up the initial timer
  resetTimer();
  
  // Set up the event listeners
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, resetTimer);
  });
  
  // Return a cleanup function
  return () => {
    clearTimeout(timeout);
    events.forEach(event => {
      document.removeEventListener(event, resetTimer);
    });
  };
};