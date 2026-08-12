/**
 * Hero Section Component
 */

import { ARTIST_INFO } from '../data/portfolioData.js';

export function renderHero(element) {
  element.innerHTML = `
    <div class="hero-pill">
      <span>★</span>
      <span>${ARTIST_INFO.title}</span>
    </div>

    <h1 class="hero-title">${ARTIST_INFO.name}</h1>

    <p class="hero-subtitle">
      ${ARTIST_INFO.tagline}
    </p>

    <div class="hero-actions">
      <a href="#work" class="btn-primary">
        <span>Explore Work</span>
        <span>↓</span>
      </a>
      <a href="#contact" class="btn-secondary">
        <span>Get in Touch</span>
      </a>
    </div>

    <a href="#work" class="scroll-indicator" aria-label="Scroll down to work section">
      <span>SCROLL</span>
      <span>↓</span>
    </a>
  `;
}
