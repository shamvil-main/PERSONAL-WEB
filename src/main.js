/**
 * Main Application Orchestrator & Client-Side Router
 */

import './style.css';
import { renderNavbar } from './components/Navbar.js';
import { renderHomeView } from './components/HomeView.js';
import { renderPortfolioView } from './components/PortfolioView.js';
import { initLightbox, openLightbox } from './components/Lightbox.js';
import { initInteractiveBackground } from './components/InteractiveBg.js';

let currentView = null;

function initApp() {
  // 0. Initialize Interactive Floating Background Physics
  initInteractiveBackground();

  // 1. Initialize Navbar
  const header = document.getElementById('site-header');
  if (header) renderNavbar(header);

  // 2. Initialize Fullscreen Lightbox Modal Root
  const lightboxRoot = document.getElementById('lightbox-root');
  if (lightboxRoot) initLightbox(lightboxRoot);

  // 3. Setup Hash Router
  handleRoute();
  window.addEventListener('hashchange', handleRoute);

  console.log('⚡ SHAMVIL Personal Website initialized successfully');
}

/**
 * Client-Side Router for HomeView vs PortfolioView with Direct Video Link Support
 */
function handleRoute() {
  const fullHash = window.location.hash || '#home';
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Extract direct video ID if present (e.g., #portfolio?id=custom-user-video-1 or #view=unlisted-private-preview-1)
  let directItemId = null;
  if (fullHash.includes('id=')) {
    directItemId = fullHash.split('id=')[1]?.split('&')[0];
  } else if (fullHash.includes('view=')) {
    directItemId = fullHash.split('view=')[1]?.split('&')[0];
  } else if (fullHash.includes('preview=')) {
    directItemId = fullHash.split('preview=')[1]?.split('&')[0];
  }

  const cleanHash = fullHash.split('?')[0].toLowerCase() || '#home';
  const isPortfolioRoute = cleanHash === '#portfolio' || cleanHash === '#work' || cleanHash === '#gallery' || directItemId !== null;

  if (isPortfolioRoute) {
    if (currentView !== 'portfolio') {
      currentView = 'portfolio';
      renderPortfolioView(appContainer);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    updateNavActiveState('portfolio');
  } else {
    // Home View (handles #home, #hero, #about, #contact, or empty)
    if (currentView !== 'home') {
      currentView = 'home';
      renderHomeView(appContainer);
    }

    if (cleanHash === '#about') {
      updateNavActiveState('about');
      scrollToSection('#about');
    } else if (cleanHash === '#contact') {
      updateNavActiveState('contact');
      scrollToSection('#contact');
    } else {
      updateNavActiveState('home');
      if (cleanHash === '#home' || cleanHash === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  // Automatically trigger Lightbox if direct video ID is provided
  if (directItemId) {
    setTimeout(() => {
      openLightbox(directItemId);
    }, 150);
  }
}

function scrollToSection(selector) {
  setTimeout(() => {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

function updateNavActiveState(activeNav) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const navKey = link.getAttribute('data-nav');
    if (navKey === activeNav) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
