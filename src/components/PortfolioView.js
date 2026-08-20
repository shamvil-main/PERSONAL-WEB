/**
 * PortfolioView Component — Dedicated Standalone Portfolio Page
 * Features Full Category Filters & Pinterest-Style Multi-Aspect Ratio Gallery
 */

import { renderGallery } from './Gallery.js';
import { portfolioItems } from '../data/portfolioData.js';

export function renderPortfolioView(container) {
  container.innerHTML = `
    <section id="portfolio-page" class="work-section dedicated-portfolio-page">
      <!-- Portfolio Page Header Banner -->
      <div class="portfolio-page-header">
        <div class="portfolio-header-top">
          <a href="#home" class="back-home-link">
            <span>← Back to Home</span>
          </a>
          <span class="portfolio-count-badge">${portfolioItems.length} Total Projects</span>
        </div>
        <h1 class="portfolio-page-title">Visual Anthology</h1>
        <p class="portfolio-page-subtitle">
          Dedicated showcase of 9:16 vertical reels, 16:9 widescreen films, 3D motion graphics, and photography preserving true aspect dimensions.
        </p>
      </div>

      <!-- Filter Bar & Gallery rendered by Gallery.js -->
      <div id="gallery-container"></div>
    </section>
  `;

  // Render Gallery Component inside container
  const galleryContainer = container.querySelector('#gallery-container');
  if (galleryContainer) renderGallery(galleryContainer);
}
