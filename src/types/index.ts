export interface FilmSceneDetail {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  whatYouSaw: string;
  whatCampusWasDoing: string;
  theme: 'Institutional Haunting' | 'Time as a Trap' | 'Soft Surveillance' | 'Resistance Through Stillness';
  missedDetail: string;
  reflection: string;
}

export interface UserSubmission {
  id: string;
  word: string;
  timestamp: number;
}

export interface AppState {
  hasVisitedBefore: boolean;
  lastVisit: Date | null;
  lastSubmittedWord: string | null;
  accessibilitySettings: {
    useOpenDyslexic: boolean;
    ambientSoundEnabled: boolean;
  };
}