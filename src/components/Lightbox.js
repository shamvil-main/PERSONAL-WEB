/**
 * Fullscreen Lightbox Modal & Media Viewer Component
 */

import { getAllPortfolioItems } from '../data/portfolioData.js';

let currentIndex = 0;
let isLightboxOpen = false;
let touchStartX = 0;
let touchEndX = 0;

export function initLightbox(container) {
  container.innerHTML = `
    <div id="lightbox-modal" class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Media Lightbox Viewer">
      <!-- Close Button -->
      <button id="lightbox-close" class="lightbox-close-btn" aria-label="Close Lightbox">✕</button>

      <!-- Navigation Arrows -->
      <button id="lightbox-prev" class="lightbox-nav-btn lightbox-prev" aria-label="Previous Project">‹</button>
      <button id="lightbox-next" class="lightbox-nav-btn lightbox-next" aria-label="Next Project">›</button>

      <!-- Lightbox Main Content Wrapper -->
      <div class="lightbox-content-wrapper">
        <!-- Media Container (Preserves exact Aspect Ratio) -->
        <div id="lightbox-media-box" class="lightbox-media-container">
          <!-- Rendered dynamically -->
        </div>

        <!-- Metadata Sidebar -->
        <div id="lightbox-meta-box" class="lightbox-meta-sidebar">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', prevItem);
  document.getElementById('lightbox-next').addEventListener('click', nextItem);

  // Close modal when clicking backdrop background (outside media box & sidebar)
  const modal = document.getElementById('lightbox-modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Global Keyboard Shortcuts (Escape, Left, Right)
  window.addEventListener('keydown', (e) => {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevItem();
    if (e.key === 'ArrowRight') nextItem();
  });

  // Mobile Touch Swipe Gesture Support
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const threshold = 50; // Minimum swipe distance in px
  if (touchEndX < touchStartX - threshold) {
    nextItem(); // Swiped left -> Next item
  } else if (touchEndX > touchStartX + threshold) {
    prevItem(); // Swiped right -> Previous item
  }
}

export function openLightbox(itemId) {
  const allItems = getAllPortfolioItems();
  const index = allItems.findIndex(item => item.id === itemId);
  if (index === -1) return;

  currentIndex = index;
  isLightboxOpen = true;

  const modal = document.getElementById('lightbox-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scrolling

  renderLightboxContent();
}

export function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
  isLightboxOpen = false;

  // Stop video playback if running
  const mediaBox = document.getElementById('lightbox-media-box');
  if (mediaBox) {
    const video = mediaBox.querySelector('video');
    if (video) video.pause();
  }
}

function nextItem() {
  const allItems = getAllPortfolioItems();
  currentIndex = (currentIndex + 1) % allItems.length;
  renderLightboxContent();
}

function prevItem() {
  const allItems = getAllPortfolioItems();
  currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
  renderLightboxContent();
}

function renderLightboxContent() {
  const allItems = getAllPortfolioItems();
  const item = allItems[currentIndex];
  const mediaBox = document.getElementById('lightbox-media-box');
  const metaBox = document.getElementById('lightbox-meta-box');

  if (!item || !mediaBox || !metaBox) return;

  // Set Aspect Ratio Attribute for container sizing
  mediaBox.setAttribute('data-aspect', item.aspectRatio);

  const isVideo = item.mediaType === 'video';

  // Render Media Container Content
  if (isVideo) {
    mediaBox.innerHTML = `
      <video 
        id="lightbox-video-element"
        src="${item.src}" 
        poster="${item.poster}"
        class="lightbox-media" 
        controls 
        autoplay
        loop 
        playsinline>
      </video>
    `;
  } else {
    mediaBox.innerHTML = `
      <img 
        src="${item.src}" 
        alt="${item.title}" 
        class="lightbox-media" 
      />
    `;
  }

  // Render Metadata Sidebar
  metaBox.innerHTML = `
    <div class="meta-category-badge">${item.category} • ${item.aspectRatio}</div>

    <h2 class="meta-title">${item.title}</h2>

    <p class="meta-description">${item.description}</p>

    <div class="meta-details-grid">
      <div>
        <div class="meta-item-label">Client / Project</div>
        <div class="meta-item-value">${item.client || 'Independent'}</div>
      </div>
      <div>
        <div class="meta-item-label">Year</div>
        <div class="meta-item-value">${item.year}</div>
      </div>
      <div>
        <div class="meta-item-label">Format / Ratio</div>
        <div class="meta-item-value">${item.aspectRatio} ${isVideo ? 'Video' : 'Visual'}</div>
      </div>
      <div>
        <div class="meta-item-label">Position</div>
        <div class="meta-item-value">${String(currentIndex + 1).padStart(2, '0')} / ${String(portfolioItems.length).padStart(2, '0')}</div>
      </div>
    </div>

    ${item.tools ? `
      <div>
        <div class="meta-item-label" style="margin-bottom: 0.5rem;">Tools & Software</div>
        <div class="meta-tools-list">
          ${item.tools.map(tool => `<span class="meta-tool-pill">${tool}</span>`).join('')}
        </div>
      </div>
    ` : ''}
  `;
}
