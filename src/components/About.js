/**
 * About Section Component — Outline Avatar Mode
 */

import { ARTIST_INFO } from '../data/portfolioData.js';

function createProfileOutlineSvg() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>
    <rect width='100%' height='100%' fill='#0d0d14'/>
    <defs>
      <linearGradient id='profileGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='#38bdf8' stop-opacity='0.25'/>
        <stop offset='100%' stop-color='#818cf8' stop-opacity='0.05'/>
      </linearGradient>
      <pattern id='pgrid' width='40' height='40' patternUnits='userSpaceOnUse'>
        <path d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/>
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#profileGrad)'/>
    <rect width='100%' height='100%' fill='url(#pgrid)'/>
    
    <!-- Outer Border Wireframe -->
    <rect x='30' y='30' width='740' height='940' fill='none' stroke='#38bdf8' stroke-width='2' stroke-dasharray='10,6' rx='24' opacity='0.5'/>
    
    <!-- Stylized Portrait Wireframe Headshot Outline -->
    <circle cx='400' cy='380' r='140' fill='none' stroke='#38bdf8' stroke-width='3' opacity='0.8'/>
    <path d='M 220 780 C 220 560, 580 560, 580 780' fill='none' stroke='#38bdf8' stroke-width='3' stroke-linecap='round' opacity='0.8'/>
    
    <!-- Geometric Accents -->
    <circle cx='400' cy='380' r='180' fill='none' stroke='#818cf8' stroke-width='1.5' stroke-dasharray='8,6' opacity='0.4'/>
    <line x1='400' y1='140' x2='400' y2='620' stroke='#38bdf8' stroke-width='1' opacity='0.3'/>
    <line x1='160' y1='380' x2='640' y2='380' stroke='#38bdf8' stroke-width='1' opacity='0.3'/>

    <text x='400' y='860' font-family='system-ui, sans-serif' font-size='32' font-weight='800' fill='#ffffff' text-anchor='middle' letter-spacing='4'>SHAMVIL</text>
    <text x='400' y='905' font-family='system-ui, sans-serif' font-size='18' font-weight='600' fill='#38bdf8' text-anchor='middle' letter-spacing='2'>ARTIST PORTRAIT OUTLINE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function renderAbout(element) {
  element.innerHTML = `
    <div class="section-header">
      <span class="section-tag">ABOUT THE ARTIST</span>
      <h2 class="section-title">Visual Storyteller & Creative Director</h2>
      <p class="section-subtitle">Bridging cinematic filmmaking, 3D motion design, and high-impact visual aesthetics.</p>
    </div>

    <div class="about-grid">
      <!-- Portrait Card (Pure SVG Outline) -->
      <div class="about-image-card">
        <img 
          src="${createProfileOutlineSvg()}" 
          alt="${ARTIST_INFO.name}" 
          class="about-image" 
        />
      </div>

      <!-- About Info Content -->
      <div class="about-content">
        <p class="about-bio">
          ${ARTIST_INFO.bio}
        </p>

        <!-- Stats Grid -->
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
