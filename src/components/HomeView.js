/**
 * HomeView Component — Personal Landing Page
 * Focuses on Personal Details, Bio, Core Disciplines, Featured Work Teaser, and Contact Info
 */

import { renderHero } from './Hero.js';
import { renderAbout } from './About.js';
import { renderContact } from './Contact.js';
import { getPublicPortfolioItems } from '../data/portfolioData.js';
import { openLightbox } from './Lightbox.js';

export function renderHomeView(container) {
  const publicItems = getPublicPortfolioItems();
  // Get top 3 featured vertical 9:16 reel videos for uniform home teaser grid
  const featuredItems = publicItems.filter(item => item.featured && item.aspectRatio === '9:16').slice(0, 3);

  container.innerHTML = `
    <!-- 1. Hero Section -->
    <section id="hero" class="hero-section">
      <!-- Rendered dynamically -->
    </section>

    <!-- 2. About & Personal Details Section -->
    <section id="about" class="about-section">
      <!-- Rendered dynamically -->
    </section>

    <!-- 3. Featured Portfolio Teaser Section -->
    <section id="featured-teaser" class="work-section featured-teaser-section">
      <div class="section-header featured-teaser-header">
        <div>
          <span class="section-tag">SELECTED HIGHLIGHTS</span>
          <h2 class="section-title">Featured Anthology</h2>
          <p class="section-subtitle">A curated glimpse into recent commercial reels, 3D visual art, and brand films.</p>
        </div>
        <a href="#portfolio" class="btn-secondary view-all-portfolio-btn">
          <span>View All Works (${publicItems.length})</span>
          <span>→</span>
        </a>
      </div>

      <!-- Teaser Cards Grid (3 Columns) -->
      <div class="teaser-grid">
        ${featuredItems.map(item => `
          <article class="portfolio-card teaser-card" data-id="${item.id}" tabindex="0">
            <div class="card-media-wrapper" data-aspect="${item.aspectRatio}">
              <img src="${item.poster || item.src}" alt="${item.title}" class="card-image" loading="lazy" />
              <video src="${item.src}" class="card-video" muted loop playsinline preload="metadata"></video>
              <div class="video-badge">
                <span class="video-badge-icon"></span>
                <span>${item.duration || item.aspectRatio}</span>
              </div>
              <div class="play-center-btn" aria-hidden="true">▶</div>
              <div class="card-overlay">
                <span class="card-category-tag">${item.category} • ${item.aspectRatio}</span>
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">
                  <span>${item.client || 'Portfolio'}</span>
                  <span>${item.year}</span>
                </div>
              </div>
            </div>
          </article>
        `).join('')}
      </div>

      <!-- Bottom Callout to Full Standalone Portfolio Page -->
      <div class="portfolio-callout-banner">
        <div class="callout-text">
          <h3>Looking for the complete visual archive?</h3>
          <p>Explore the full Pinterest-inspired multi-aspect gallery containing 9:16 vertical reels, 16:9 widescreen films, and 3D visual art.</p>
        </div>
        <a href="#portfolio" class="btn-primary callout-btn">
          <span>Explore Dedicated Portfolio Page</span>
          <span>→</span>
        </a>
      </div>
    </section>

    <!-- 4. Contact Section -->
    <section id="contact" class="contact-section">
      <!-- Rendered dynamically -->
    </section>
  `;

  // Render Sub-components
  const heroSection = container.querySelector('#hero');
  if (heroSection) renderHero(heroSection);

  const aboutSection = container.querySelector('#about');
  if (aboutSection) renderAbout(aboutSection);

  const contactSection = container.querySelector('#contact');
  if (contactSection) renderContact(contactSection);

  // Attach Lightbox click handlers to Teaser Cards
  const teaserCards = container.querySelectorAll('.teaser-card');
  teaserCards.forEach(card => {
    const id = card.getAttribute('data-id');
    const handleOpen = () => openLightbox(id);

    card.addEventListener('click', handleOpen);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpen();
      }
    });

    // Auto-play video on hover/intersection
    const video = card.querySelector('.card-video');
    if (video && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.2 });
      observer.observe(video);
    }
  });
}
