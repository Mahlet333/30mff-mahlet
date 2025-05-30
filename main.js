// Scroll-triggered section title animations
const sectionTitles = document.querySelectorAll('.section-title');

// Log titles being observed for debugging
console.log('Observing section titles:');
sectionTitles.forEach(title => {
  console.log(title.textContent);
});

const titleObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
sectionTitles.forEach(title => titleObserver.observe(title));

// Progress bar animation in Farewell section
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  setTimeout(() => {
    progressBar.style.width = '100%';
  }, 500);
}

// Countdown timer and button in hero (updated for new structure)
const countdownEl = document.getElementById('countdown');
const ctaBtn = document.getElementById('scrollToFilm');
let countdown = 90;
let countdownActive = true;
function updateCountdown() {
  if (!countdownActive) return;
  if (countdownEl) countdownEl.textContent = countdown > 0 ? `${countdown}s` : '0s';
  if (countdown > 0) {
    countdown--;
    setTimeout(updateCountdown, 1000);
  }
}
if (countdownEl) updateCountdown();
if (ctaBtn) {
  ctaBtn.addEventListener('click', () => {
    document.getElementById('film').scrollIntoView({ behavior: 'smooth' });
    countdownActive = false;
  });
}

// Ambient sound toggle
const ambientBtn = document.getElementById('toggleSound');
const ambientAudio = document.getElementById('ambientSound');
const volumeUpIcon = ambientBtn ? ambientBtn.querySelector('.fa-volume-up') : null;
const volumeMuteIcon = ambientBtn ? ambientBtn.querySelector('.fa-volume-mute') : null;
let soundEnabled = false;
if (ambientBtn && ambientAudio) {
  ambientBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    ambientAudio.muted = !soundEnabled;
    if (soundEnabled) {
      ambientAudio.play().catch(e => console.error('Error playing sound:', e));
      if (volumeUpIcon && volumeMuteIcon) {
        volumeUpIcon.style.display = '';
        volumeMuteIcon.style.display = 'none';
      }
    } else {
      ambientAudio.pause();
      if (volumeUpIcon && volumeMuteIcon) {
        volumeUpIcon.style.display = 'none';
        volumeMuteIcon.style.display = '';
      }
    }
  });
}

// Trace form interactivity
const traceForm = document.getElementById('traceForm');
const traceInput = document.getElementById('traceInput');
const traceGrid = document.getElementById('traceGrid');
let traceWords = [
  'Sleep', 'Home', 'Voice', 'Shadow', 'Time', 'Name', 'Dream', 'Light', 'Hope', 'Fear', 'Memory', 'Touch',
  'Sound', 'Face', 'Truth', 'Silence', 'Friend', 'Map', 'Key', 'Song', 'Wish', 'Echo', 'Path', 'Mark',
  'Trace', 'Secret', 'Note', 'Book', 'Step', 'Night', 'Day', 'Room', 'Wall', 'Lock', 'Gate', 'Call',
  'Sign', 'Line', 'Thread', 'Pulse', 'Code', 'Word', 'Look', 'Shape', 'Form', 'Edge', 'Mark', 'Trace',
  'Ghost', 'Flicker', 'Signal'
];
function renderTraceGrid() {
  traceGrid.innerHTML = '';
  traceWords.slice(0, 36).forEach(word => {
    const span = document.createElement('span');
    span.textContent = word;
    traceGrid.appendChild(span);
  });
}
if (traceGrid) renderTraceGrid();
if (traceForm && traceInput && traceGrid) {
  traceForm.addEventListener('submit', e => {
    e.preventDefault();
    const word = traceInput.value.trim();
    if (word) {
      traceWords.unshift(word);
      if (traceWords.length > 36) traceWords.pop();
      renderTraceGrid();
      traceInput.value = '';
    }
  });
}

// Analysis Carousel functionality

// Assuming FILM_SCENES is available globally or imported
// import { FILM_SCENES } from './data/filmData'; // Uncomment if using modules

const carouselContainer = document.querySelector('.carousel-container');
const carouselSlides = document.querySelector('.carousel-slides');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

// Placeholder for FILM_SCENES data (replace with actual import or global access)
const FILM_SCENES = [
  {
    id: 'scene01',
    title: 'Wild grass and pink flowers glow in filtered sun',
    imageUrl: 'src/assets/1.png',
    whatYouSaw: 'Wild grass and pink flowers glow in filtered sun',
    whatCampusWasDoing: 'Curating a softness that looks natural but is orchestrated — designed stillness as illusion of peace.',
    missedDetail: 'No path in the grass. But someone\'s been walking.',
    reflection: 'When did peace start feeling planted?'
  },
  // Add other scene data here following the same structure
];



if (carouselContainer && carouselSlides && prevBtn && nextBtn && indicatorsContainer) {
  const slides = carouselSlides.querySelectorAll('.full-bg-slide');
  let currentSlideIndex = 0;

  // Create indicators
  indicatorsContainer.innerHTML = ''; // Clear existing indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement('span');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = indicatorsContainer.querySelectorAll('.indicator');

  function updateCarousel() {
    // Move the slides container
    carouselSlides.style.transform = `translateX(${-currentSlideIndex * 100}%)`;

    // Update active indicator
    indicators.forEach((indicator, index) => {
      if (index === currentSlideIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    if (index < 0) {
      currentSlideIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex = index;
    }
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

  // Initial display
  updateCarousel();
} 