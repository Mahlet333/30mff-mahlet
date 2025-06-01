// Scroll-triggered section title animations
document.addEventListener('DOMContentLoaded', () => {
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

  // Helper function to update sound icon display
  function updateSoundIcon(enabled) {
    if (volumeUpIcon && volumeMuteIcon) {
      if (enabled) {
        volumeUpIcon.style.display = '';
        volumeMuteIcon.style.display = 'none';
      } else {
        volumeUpIcon.style.display = 'none';
        volumeMuteIcon.style.display = '';
      }
    }
  }

  // Initial icon state (sound off)
  updateSoundIcon(soundEnabled);

  if (ambientBtn && ambientAudio) {
    ambientBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      ambientAudio.muted = !soundEnabled;
      if (soundEnabled) {
        ambientAudio.play().catch(e => console.error('Error playing sound:', e));
      } else {
        ambientAudio.pause();
      }
      updateSoundIcon(soundEnabled);
    });
  }

  // YouTube Player API integration
  let player;
  const youtubeIframe = document.querySelector('.video-container iframe');

  // This function is called by the YouTube Iframe Player API when it's ready
  window.onYouTubeIframeAPIReady = function() {
    if (youtubeIframe) {
      player = new YT.Player(youtubeIframe, {
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    }
  };

  // This function is called when the player's state changes
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      // If YouTube video starts playing, pause ambient sound
      if (soundEnabled) {
        soundEnabled = false;
        ambientAudio.pause();
        ambientAudio.muted = true; // Ensure muted state is correct
        updateSoundIcon(false);
      }
    }
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
  // Assuming FILM_SCENES and DELETED_SCENES are available globally or imported
  // import { FILM_SCENES, DELETED_SCENES } from './data/filmData'; // Uncomment if using modules

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

  // Placeholder for DELETED_SCENES data (replace with actual import or global access)
  const DELETED_SCENES = [
    {
      title: "The Empty Pool",
      description: "The campus swimming pool after hours. No water, just blue tile and echoes.",
      imageUrl: "https://images.pexels.com/photos/261106/pexels-photo-261106.jpeg"
    },
    {
      title: "The Forgotten Garden",
      description: "A small courtyard no one visits. The plants grow in geometric patterns that shouldn't be possible.",
      imageUrl: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
    },
    {
      title: "The Elevator That Never Stops",
      description: "Between floors 3 and 4, there's a moment where time stops. We couldn't capture it on film.",
      imageUrl: "https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg"
    }
  ]; // Added placeholder for DELETED_SCENES

  const carouselContainer = document.querySelector('.carousel-container');
  const carouselSlides = document.querySelector('.carousel-slides');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

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

  // Modal functionality for Archive
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const closeModalButton = document.getElementById('closeModal');
  const archiveCards = document.querySelectorAll('.archive-card');

  if (archiveCards.length > 0 && modalOverlay && modalBody && closeModalButton) {

    archiveCards.forEach((card, index) => {
      card.style.cursor = 'pointer'; // Indicate clickability
      card.addEventListener('click', () => {
        // Clear previous modal content
        modalBody.innerHTML = '';

        // Populate modal based on which card was clicked
        if (index === 0) { // Deleted Shadows card
          modalBody.innerHTML = '<h2>Deleted Footages</h2>';
          DELETED_SCENES.forEach(scene => {
            const sceneElement = document.createElement('div');
            sceneElement.classList.add('deleted-scene-item');
            sceneElement.innerHTML = `
              <h3>${scene.title}</h3>
              <img src="${scene.imageUrl}" alt="${scene.title}" style="max-width: 100%; height: auto; display: block; margin-bottom: 15px;" />
              <p>${scene.description}</p>
            `;
            modalBody.appendChild(sceneElement);
          });
        } else if (index === 1) { // Collected Traces card
          modalBody.innerHTML = '<h2>Collected Traces</h2>';
          if (traceWords.length > 0) {
            const traceList = document.createElement('ul');
            traceList.style.listStyle = 'none';
            traceList.style.padding = '0';
            traceList.style.display = 'grid';
            traceList.style.gridTemplateColumns = 'repeat(auto-fit, minmax(100px, 1fr))';
            traceList.style.gap = '10px';
            traceWords.forEach(word => {
              const listItem = document.createElement('li');
              listItem.textContent = word;
              listItem.style.background = '#333';
              listItem.style.padding = '5px 10px';
              listItem.style.borderRadius = '5px';
              listItem.style.textAlign = 'center';
              listItem.style.fontSize = '0.9rem';
              traceList.appendChild(listItem);
            });
            modalBody.appendChild(traceList);
          } else {
            modalBody.innerHTML += '<p>No traces collected yet.</p>';
          }
        } else if (index === 2) { // The Ritual card
          modalBody.innerHTML = '<h2>The Ritual</h2>';
          const ritualDescription = card.querySelector('.body-text').textContent;
          modalBody.innerHTML += `<p>${ritualDescription}</p>`;
        }

        // Show the modal
        modalOverlay.classList.add('visible');
      });
    });

    // Close modal functionality
    closeModalButton.addEventListener('click', () => {
      modalOverlay.classList.remove('visible');
      modalBody.innerHTML = ''; // Clear content when closing
    });

    // Close modal when clicking outside the content
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('visible');
        modalBody.innerHTML = ''; // Clear content when closing
      }
    });
  }
}); 