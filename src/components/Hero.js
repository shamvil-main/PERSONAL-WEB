/**
 * Hero Section Component — Ultra Premium Agency-Ready Header
 */

import { ARTIST_INFO } from '../data/portfolioData.js';

export function renderHero(element) {
  element.innerHTML = `
    <!-- Decorative Camera Viewfinder Accents -->
    <div class="hero-viewfinder-corners" aria-hidden="true">
      <span class="corner top-left"></span>
      <span class="corner top-right"></span>
      <span class="corner bottom-left"></span>
      <span class="corner bottom-right"></span>
    </div>

    <!-- Live Professional Status Badge -->
    <div class="hero-pill">
      <span class="hero-pill-sparkle">⚡</span>
      <span class="hero-pill-text">${ARTIST_INFO.title}</span>
      <span class="hero-pill-divider">•</span>
      <span class="hero-pill-status">OPEN FOR RECRUITMENT &amp; ROLES</span>
    </div>

    <!-- Massive Premium Title: SHAMVIL PORTFOLIO -->
    <h1 class="hero-title" aria-label="SHAMVIL PORTFOLIO">
      <span class="hero-title-top">SHAMVIL</span>
      <span class="hero-title-bottom">PORTFOLIO</span>
    </h1>

    <!-- Professional Subtitle -->
    <p class="hero-subtitle">
      Specializing in Commercial Film Directing, 9:16 Social Video Campaigns, DaVinci Color Grading & 3D Motion Graphics.
    </p>

    <!-- Call-To-Action Buttons -->
    <div class="hero-actions">
      <a href="#work" class="btn-primary btn-hero">
        <span class="btn-icon">▶</span>
        <span>View Portfolio Work</span>
        <span class="btn-arrow">↓</span>
      </a>
      <a href="#contact" class="btn-secondary btn-hero">
        <span>Contact / Hire</span>
        <span class="btn-arrow">→</span>
      </a>
    </div>

    <!-- Professional Core Capabilities Ribbon (Impression-Ready for Companies) -->
    <div class="hero-capabilities-ribbon">
      <div class="capability-card">
        <span class="capability-icon">🎬</span>
        <div class="capability-info">
          <span class="capability-title">Commercial & Brand Films</span>
          <span class="capability-sub">16:9 Widescreen Cinema</span>
        </div>
      </div>
      
      <div class="capability-divider"></div>

      <div class="capability-card">
        <span class="capability-icon">📱</span>
        <div class="capability-info">
          <span class="capability-title">Vertical Reels & Shorts</span>
          <span class="capability-sub">9:16 Social Video Campaigns</span>
        </div>
      </div>

      <div class="capability-divider"></div>

      <div class="capability-card">
        <span class="capability-icon">🎨</span>
        <div class="capability-info">
          <span class="capability-title">DaVinci Color & Post</span>
          <span class="capability-sub">Cinema Grading & Finishing</span>
        </div>
      </div>

      <div class="capability-divider"></div>

      <div class="capability-card">
        <span class="capability-icon">⚡</span>
        <div class="capability-info">
          <span class="capability-title">3D Motion & VFX</span>
          <span class="capability-sub">Cinema 4D, AE & VFX</span>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <a href="#work" class="scroll-indicator" aria-label="Scroll down to work section">
      <span class="scroll-text">EXPLORE ANTHOLOGY</span>
      <span class="scroll-chevron">↓</span>
    </a>
  `;
}
