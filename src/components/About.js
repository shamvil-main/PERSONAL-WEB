/**
 * About Section Component — Real Profile Picture Mode
 */

import { ARTIST_INFO } from '../data/portfolioData.js';

export function renderAbout(element) {
  element.innerHTML = `
    <div class="section-header">
      <span class="section-tag">ABOUT THE ARTIST</span>
      <h2 class="section-title">Visual Storyteller & Creative Director</h2>
      <p class="section-subtitle">Bridging cinematic filmmaking, 3D motion design, and high-impact visual aesthetics.</p>
    </div>

    <div class="about-grid">
      <!-- Real Edited Profile Image Card -->
      <div class="about-image-card">
        <img 
          src="/profile-avatar.png" 
          alt="${ARTIST_INFO.name}" 
          class="about-image" 
        />
        <div class="about-image-overlay">
          <span class="about-badge">SHAMVIL • CREATIVE DIRECTOR</span>
        </div>
      </div>

      <!-- About Info Content -->
      <div class="about-content">
        <p class="about-bio">
          ${ARTIST_INFO.bio}
        </p>

        <!-- Core Strengths Grid -->
        <div class="stats-grid">
          ${ARTIST_INFO.stats.map(stat => `
            <div>
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Core Skills -->
        <div>
          <h3 class="skills-title">Core Disciplines</h3>
          <div class="pills-grid">
            ${ARTIST_INFO.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
          </div>
        </div>

        <!-- Software & Tools Stack -->
        <div>
          <h3 class="tools-title">Software Stack & Toolkit</h3>
          <div class="pills-grid">
            ${ARTIST_INFO.tools.map(tool => `
              <span class="skill-pill" style="border-color: var(--accent-glow);">
                ${tool.name} <small style="color: var(--text-dim); margin-left: 0.3rem;">[${tool.category}]</small>
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
