import React from 'react';
import { Volume2, VolumeX, Eye } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from './Button';

const AccessibilityControls: React.FC = () => {
  const { state, updateAccessibility } = useAppContext();
  const { useOpenDyslexic, ambientSoundEnabled } = state.accessibilitySettings;
  
  const toggleFont = () => {
    updateAccessibility({ useOpenDyslexic: !useOpenDyslexic });
  };
  
  const toggleSound = () => {
    updateAccessibility({ ambientSoundEnabled: !ambientSoundEnabled });
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleFont}
        className="opacity-50 hover:opacity-100"
      >
        <Eye size={16} className="mr-1" />
        <span className="text-xs">
          {useOpenDyslexic ? 'Standard Font' : 'OpenDyslexic'}
        </span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleSound}
        className="opacity-50 hover:opacity-100"
      >
        {ambientSoundEnabled ? (
          <>
            <Volume2 size={16} className="mr-1" />
            <span className="text-xs">Sound On</span>
          </>
        ) : (
          <>
            <VolumeX size={16} className="mr-1" />
            <span className="text-xs">Sound Off</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default AccessibilityControls;