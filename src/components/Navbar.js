/**
 * Header & Navbar Component
 */

export function renderNavbar(element) {
  element.innerHTML = `
    <div class="nav-container">
      <a href="#hero" class="brand-logo">
        <img src="/profile-avatar.png" alt="Shamvil" class="nav-avatar" />
        <span>SHAMVIL<span class="dot">.</span></span>
      </a>

      <button id="mobile-menu-btn" class="mobile-nav-toggle" aria-label="Toggle Mobile Menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <ul id="nav-menu" class="nav-links">
        <li><a href="#work" class="nav-link active">Work</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
        <li class="mobile-only-status">
          <div class="status-badge">
            <span class="status-dot"></span>
            <span>Available 2026</span>
          </div>
        </li>
      </ul>

      <div class="status-badge desktop-only-status">
        <span class="status-dot"></span>
        <span>Available 2026</span>
      </div>
    </div>
  `;

  // Mobile Menu Toggle Event Listener
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      element.classList.toggle('nav-open');
      menuBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking any nav link
    const links = navMenu.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        element.classList.remove('nav-open');
        menuBtn.classList.remove('open');
        navMenu.classList.remove('open');
      });
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

  // IntersectionObserver for active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
