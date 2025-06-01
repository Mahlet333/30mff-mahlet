import { FilmSceneDetail, UserSubmission } from '../types';

// YouTube video ID for the main film embed
export const FILM_ID = 'cLsNL1toPjE';

// Array of film scenes with detailed analysis for each location
export const FILM_SCENES: FilmSceneDetail[] = [
  // Scene 1: Empty Hallway - Focuses on surveillance and observation themes
  {
    id: 'scene01', // Unique identifier for the scene
    title: 'The Empty Hallway', // Display title of the scene
    location: 'Arts Center - A4 Wing', // Physical location where scene was filmed
    imageUrl: 'https://images.pexels.com/photos/1468385/pexels-photo-1468385.jpeg', // Thumbnail image URL
    whatYouSaw: 'A long, sterile hallway stretching toward nowhere, with fluorescent lights that flicker just slightly too often.', // Surface-level observation
    whatCampusWasDoing: 'The hallway is designed to create the illusion of being observed. Notice how the light creates shadows that follow you from multiple angles.', // Deeper analysis
    theme: 'Soft Surveillance', // Categorization of the scene's theme
    missedDetail: 'There\'s a shadow that appears for three frames with no visible source.', // Hidden detail for viewers to discover
    reflection: 'How often do you feel watched when nobody is there?' // Prompt for viewer reflection
  },
  // Scene 2: Library - Explores time manipulation and institutional control
  {
    id: 'scene02',
    title: 'The Library at 3AM',
    location: 'Main Library - Floor 2',
    imageUrl: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg',
    whatYouSaw: 'Empty chairs arranged in perfect symmetry. Books no one is reading. The sound of pages turning.',
    whatCampusWasDoing: 'Time behaves differently here. The clocks run at 0.98x normal speed—just slow enough to be imperceptible but enough to keep you longer than you planned.',
    theme: 'Time as a Trap',
    missedDetail: 'The same student appears in the background three times, wearing three slightly different outfits.',
    reflection: 'When was the last time you checked a clock twice and felt something was wrong?'
  },
  // Scene 3: Dining Hall - Examines institutional haunting and routine
  {
    id: 'scene03',
    title: 'The Dining Hall',
    location: 'Central Commons',
    imageUrl: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
    whatYouSaw: 'Hundreds of conversations happening at once, blending into white noise. Food being consumed mechanically.',
    whatCampusWasDoing: 'The acoustics are designed to amplify certain frequencies—making private conversations public while administrative announcements fade into the background.',
    theme: 'Institutional Haunting',
    missedDetail: 'Every tray contains the exact same arrangement of food, down to the placement of silverware.',
    reflection: 'How much of your daily routine is your choice versus what the space decided for you?'
  },
  // Scene 4: Laundry Room - Focuses on resistance and stillness themes
  {
    id: 'scene04',
    title: 'The Laundry Room',
    location: 'Residential Building C',
    imageUrl: 'https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg',
    whatYouSaw: 'Washing machines spinning in hypnotic rhythm. The sound of water being forced through fabric.',
    whatCampusWasDoing: 'This is one of the few places where students can be alone with their thoughts, so the institution ensures it\'s as uncomfortable as possible. Notice the harsh lighting, the metallic surfaces that amplify sound.',
    theme: 'Resistance Through Stillness',
    missedDetail: 'One washing machine never stops, even when unplugged.',
    reflection: 'What part of you has never been given permission to just be?'
  }
];

// Initial set of user submissions for the "Leave Your Trace" feature
// Each submission includes a unique ID, word, and timestamp
export const INITIAL_SUBMISSIONS: UserSubmission[] = [
  { id: '1', word: 'sleep', timestamp: Date.now() - 86400000 * 7 }, // 7 days ago
  { id: '2', word: 'voice', timestamp: Date.now() - 86400000 * 5 }, // 5 days ago
  { id: '3', word: 'silence', timestamp: Date.now() - 86400000 * 3 }, // 3 days ago
  { id: '4', word: 'time', timestamp: Date.now() - 86400000 * 2 }, // 2 days ago
  { id: '5', word: 'identity', timestamp: Date.now() - 86400000 }, // 1 day ago
  { id: '6', word: 'dreams', timestamp: Date.now() - 43200000 }, // 12 hours ago
  { id: '7', word: 'freedom', timestamp: Date.now() - 21600000 }, // 6 hours ago
  { id: '8', word: 'hope', timestamp: Date.now() - 3600000 } // 1 hour ago
];

// Collection of user confessions for the Archive section
// Each confession represents a personal experience with the campus
export const USER_CONFESSIONS = [
  "Sometimes I stay in the library until closing just to avoid going back to my dorm.",
  "I've had the same recurring dream about the campus fountain speaking to me.",
  "I can hear the walls breathing at night.",
  "The security cameras blink in morse code. No one believes me.",
  "I wrote my thesis in a fugue state. I don't remember what it says.",
  "My reflection in the bathroom mirror is always slightly delayed.",
  "The campus took my name. I answer to my ID number now.",
  "I left, but the hallways followed me home.",
  "There's a door on the 4th floor that opens to a different time.",
  "The campus knows when I'm afraid. The lights dim just slightly."
];

// Collection of deleted scenes that didn't make it into the final film
// Each scene includes a title, description, and image URL
export const DELETED_SCENES = [
  // Deleted scene 1: Empty Pool
  {
    title: "The Empty Pool",
    description: "The campus swimming pool after hours. No water, just blue tile and echoes.",
    imageUrl: "https://images.pexels.com/photos/261106/pexels-photo-261106.jpeg"
  },
  // Deleted scene 2: Forgotten Garden
  {
    title: "The Forgotten Garden",
    description: "A small courtyard no one visits. The plants grow in geometric patterns that shouldn't be possible.",
    imageUrl: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
  },
  // Deleted scene 3: Elevator
  {
    title: "The Elevator That Never Stops",
    description: "Between floors 3 and 4, there's a moment where time stops. We couldn't capture it on film.",
    imageUrl: "https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg"
  }
];