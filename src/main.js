/**
 * Main Application Orchestrator
 */

import './style.css';
import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderGallery } from './components/Gallery.js';
import { initLightbox } from './components/Lightbox.js';
import { renderAbout } from './components/About.js';
import { renderContact } from './components/Contact.js';
import { initInteractiveBackground } from './components/InteractiveBg.js';

function initApp() {
  // 0. Initialize Interactive Floating Background Physics
  initInteractiveBackground();

  // 1. Initialize Navbar
  const header = document.getElementById('site-header');
  if (header) renderNavbar(header);

  // 2. Initialize Hero Section
  const heroSection = document.getElementById('hero');
  if (heroSection) renderHero(heroSection);

  // 3. Initialize Pinterest-Style Gallery
  const galleryContainer = document.getElementById('gallery-container');
  if (galleryContainer) renderGallery(galleryContainer);

  // 4. Initialize Fullscreen Lightbox Modal
  const lightboxRoot = document.getElementById('lightbox-root');
  if (lightboxRoot) initLightbox(lightboxRoot);

  // 5. Initialize About Section
  const aboutSection = document.getElementById('about');
  if (aboutSection) renderAbout(aboutSection);

  // 6. Initialize Contact Section
  const contactSection = document.getElementById('contact');
  if (contactSection) renderContact(contactSection);

  console.log('⚡ SHAMVIL Portfolio initialized successfully');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
