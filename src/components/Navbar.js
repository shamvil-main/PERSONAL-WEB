/**
 * Header & Navbar Component — Ultra Professional Executive Navigation
 */

export function renderNavbar(element) {
  element.innerHTML = `
    <div class="nav-container">
      <!-- Executive Brand Logo & Title -->
      <a href="#home" class="brand-logo" aria-label="Shamvil Personal Website Home">
        <div class="nav-avatar-wrapper">
          <img src="/profile-avatar.png" alt="Shamvil" class="nav-avatar" />
          <span class="nav-avatar-status-dot" title="Available for Roles"></span>
        </div>
        <div class="brand-text">
          <span class="brand-name">SHAMVIL<span class="dot">.</span></span>
          <span class="brand-title">DIRECTOR &amp; CONTENT CREATOR</span>
        </div>
      </a>

      <!-- Mobile Nav Toggle -->
      <button id="mobile-menu-btn" class="mobile-nav-toggle" aria-label="Toggle Mobile Menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation Links -->
      <ul id="nav-menu" class="nav-links">
        <li><a href="#home" class="nav-link" data-nav="home">Home</a></li>
        <li><a href="#portfolio" class="nav-link" data-nav="portfolio">Portfolio</a></li>
        <li><a href="#about" class="nav-link" data-nav="about">About</a></li>
        <li><a href="#contact" class="nav-link" data-nav="contact">Contact</a></li>
        <li><a href="#admin" class="nav-link nav-admin-btn" data-nav="admin">Admin 🔒</a></li>
        <li class="mobile-only-status">
          <a href="#contact" class="nav-cta-btn">Let's Talk →</a>
        </li>
      </ul>

      <!-- Desktop Right Action Bar -->
      <div class="nav-actions-desktop">
        <a href="#admin" class="status-badge admin-badge-btn" title="Open Admin Content Manager">
          <span class="status-dot"></span>
          <span>Admin Portal 🔒</span>
        </a>
        <a href="#contact" class="nav-cta-btn">Let's Talk →</a>
      </div>
    </div>
  `;

  // Mobile Menu Toggle Event Listener
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  const toggleMenu = (openState) => {
    const shouldOpen = openState !== undefined ? openState : !navMenu.classList.contains('open');
    element.classList.toggle('nav-open', shouldOpen);
    menuBtn.classList.toggle('open', shouldOpen);
    navMenu.classList.toggle('open', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  };

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close mobile menu when clicking any nav link
    const links = navMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu on Escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // Handle header scroll background blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      element.classList.add('scrolled');
    } else {
      element.classList.remove('scrolled');
    }
  });

  // IntersectionObserver / Scroll listener for active link highlighting (Home View only)
  window.addEventListener('scroll', () => {
    const hash = window.location.hash.toLowerCase() || '#home';
    const isPortfolio = hash.includes('#portfolio') || hash.includes('#work') || hash.includes('#gallery');
    
    if (isPortfolio) {
      // On portfolio page, keep portfolio link active
      navLinks.forEach(link => {
        if (link.getAttribute('data-nav') === 'portfolio') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      return;
    }

    // On Home view, update section highlighting
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const navKey = link.getAttribute('data-nav');
      if (navKey === current || (current === 'hero' && navKey === 'home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
}
