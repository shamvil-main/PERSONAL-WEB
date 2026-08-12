/**
 * Pinterest-Inspired Masonry Gallery & Filter Engine
 */

import { PORTFOLIO_CATEGORIES, portfolioItems } from '../data/portfolioData.js';
import { parseAspectRatio, debounce } from '../utils/helpers.js';
import { openLightbox } from './Lightbox.js';

let currentFilter = "All";

export function renderGallery(container) {
  container.innerHTML = `
    <!-- Category Filter Bar -->
    <div class="filter-bar" role="tablist" aria-label="Portfolio Categories">
      ${PORTFOLIO_CATEGORIES.map(category => {
        const count = category === "All" 
          ? portfolioItems.length 
          : portfolioItems.filter(item => item.category === category).length;
        const isActive = category === currentFilter ? 'active' : '';
        return `
          <button class="filter-btn ${isActive}" data-category="${category}" role="tab" aria-selected="${isActive === 'active'}">
            <span>${category}</span>
            <span class="filter-count">${count}</span>
          </button>
        `;
      }).join('')}
    </div>

    <!-- Masonry Layout Container -->
    <div id="masonry-root" class="masonry-grid"></div>
  `;

  // Attach filter event listeners
  const filterBtns = container.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = btn.getAttribute('data-category');
      if (category === currentFilter) return;

      currentFilter = category;
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Re-render masonry items with smooth animation
      buildMasonryGrid();
    });
  });

  // Initial grid build
  buildMasonryGrid();

  // Re-calculate column layout on window resize
  window.addEventListener('resize', debounce(() => {
    buildMasonryGrid();
  }, 150));
}

/**
 * Distributes items into shortest columns dynamically to create balanced Pinterest masonry
 */
function buildMasonryGrid() {
  const gridRoot = document.getElementById('masonry-root');
  if (!gridRoot) return;

  const filteredItems = currentFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === currentFilter);

  // Determine column count based on viewport width (3 columns on desktop for larger card frames)
  const windowWidth = window.innerWidth;
  let columnCount = 3;
  if (windowWidth < 650) columnCount = 1;
  else if (windowWidth < 1100) columnCount = 2;

  // Clear root
  gridRoot.innerHTML = '';

  // Create column wrapper elements
  const columns = [];
  const columnHeights = new Array(columnCount).fill(0);

  for (let i = 0; i < columnCount; i++) {
    const col = document.createElement('div');
    col.className = 'masonry-column';
    gridRoot.appendChild(col);
    columns.push(col);
  }

  // Distribute items into shortest column
  filteredItems.forEach((item, index) => {
    // Find column with minimum height
    const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
    const targetColumn = columns[minHeightIndex];

    // Create Card element
    const card = createPortfolioCard(item);
    targetColumn.appendChild(card);

    // Update approximate column height based on aspect ratio
    const heightFactor = parseAspectRatio(item.aspectRatio);
    columnHeights[minHeightIndex] += heightFactor + 0.15; // 0.15 for gap & padding
  });

  // Setup Mobile Video Viewport Observer for 60fps Scroll Performance
  setupVideoViewportObserver();
}

/**
  * Smart IntersectionObserver to play videos only when visible in viewport
  */
function setupVideoViewportObserver() {
  const videoCards = document.querySelectorAll('.card-video');
  if (!videoCards.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay prevented by browser, fail gracefully
          });
        }
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.2 });

  videoCards.forEach(v => observer.observe(v));
}

/**
 * Creates individual portfolio card with desktop video hover preview & tap support
 */
function createPortfolioCard(item) {
  const card = document.createElement('article');
  card.className = 'portfolio-card';
  card.setAttribute('data-id', item.id);
  card.setAttribute('tabindex', '0');

  const isVideo = item.mediaType === 'video';

  card.innerHTML = `
    <div class="card-media-wrapper" data-aspect="${item.aspectRatio}">
      <img 
        src="${item.poster || item.src}" 
        alt="${item.title}" 
        class="card-image" 
        loading="lazy" 
      />
      
      ${isVideo ? `
        <video 
          src="${item.src}" 
          class="card-video" 
          muted 
          loop 
          playsinline 
          preload="metadata">
        </video>
        <div class="video-badge">
          <span class="video-badge-icon"></span>
          <span>${item.duration || item.aspectRatio}</span>
        </div>
        <div class="play-center-btn" aria-hidden="true">▶</div>
      ` : ''}

      <div class="card-overlay">
        <span class="card-category-tag">${item.category} • ${item.aspectRatio}</span>
        <h3 class="card-title">${item.title}</h3>
        <div class="card-meta">
          <span>${item.client || 'Portfolio'}</span>
          <span>${item.year}</span>
        </div>
      </div>
    </div>
  `;

  // Ensure Video Autoplays Smoothly
  if (isVideo) {
    const video = card.querySelector('.card-video');
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handle fallback
        });
      }
    }
  }

  // Open Lightbox on Click or Enter Key
  const handleOpen = () => openLightbox(item.id);
  card.addEventListener('click', handleOpen);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  });

  return card;
}
