/**
 * Hero Section Component — Profile Avatar Spotlight & Floating Micro-Elements
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

    <!-- Top Profile Avatar Spotlight with Floating Micro-Elements -->
    <div class="hero-avatar-spotlight-container">
      <!-- Floating Micro-Element 1 (Top Left) -->
      <div class="floating-micro-chip chip-top-left float-anim-1">
        <span class="chip-sparkle">⚡</span>
        <span>CREATIVE DIRECTOR</span>
      </div>

      <!-- Floating Micro-Element 2 (Top Right) -->
      <div class="floating-micro-chip chip-top-right float-anim-2">
        <span class="chip-dot-red"></span>
        <span>4K DCI CINEMA</span>
      </div>

      <!-- Center Profile Picture Box -->
      <div class="hero-avatar-box">
        <img src="/profile-avatar.png" alt="Shamvil Profile" class="hero-avatar-img" />
        <div class="avatar-ring-glow"></div>
        <div class="avatar-camera-crosshair top-l">+</div>
        <div class="avatar-camera-crosshair top-r">+</div>
        <div class="avatar-camera-crosshair bot-l">+</div>
        <div class="avatar-camera-crosshair bot-r">+</div>
      </div>

      <!-- Floating Micro-Element 3 (Bottom Left) -->
      <div class="floating-micro-chip chip-bottom-left float-anim-3">
        <span class="chip-icon">🎬</span>
        <span>9:16 &amp; 16:9 REELS</span>
      </div>

      <!-- Floating Micro-Element 4 (Bottom Right) -->
      <div class="floating-micro-chip chip-bottom-right float-anim-4">
        <span class="chip-icon">🎨</span>
        <span>DAVINCI COLOR</span>
      </div>
    </div>

    <!-- Massive Premium Title: SHAMVIL PORTFOLIO -->
    <h1 class="hero-title" aria-label="SHAMVIL PORTFOLIO">
      <span class="hero-title-top">SHAMVIL</span>
      <span class="hero-title-bottom">PORTFOLIO</span>
    </h1>

    <!-- Clean & Neatly Arranged Subtitle -->
    <p class="hero-subtitle">
      Specializing in <span class="subtitle-highlight">Commercial Film Directing</span> • <span class="subtitle-highlight">9:16 Social Campaigns</span> • <span class="subtitle-highlight">DaVinci Color Grading</span> &amp; <span class="subtitle-highlight">3D Motion Graphics</span>
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

    <!-- Professional Core Capabilities Ribbon -->
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
