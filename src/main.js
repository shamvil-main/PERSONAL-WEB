/**
 * Main Application Orchestrator & Client-Side Router
 */

import './style.css';
import { renderNavbar } from './components/Navbar.js';
import { renderHomeView } from './components/HomeView.js';
import { renderPortfolioView } from './components/PortfolioView.js';
import { initLightbox } from './components/Lightbox.js';
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
 * Client-Side Router for HomeView vs PortfolioView
 */
function handleRoute() {
  const hash = window.location.hash.toLowerCase() || '#home';
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const isPortfolioRoute = hash === '#portfolio' || hash === '#work' || hash === '#gallery';

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

    if (hash === '#about') {
      updateNavActiveState('about');
      scrollToSection('#about');
    } else if (hash === '#contact') {
      updateNavActiveState('contact');
      scrollToSection('#contact');
    } else {
      updateNavActiveState('home');
      if (hash === '#home' || hash === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
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
