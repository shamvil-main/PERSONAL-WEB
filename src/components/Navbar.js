/**
 * Header & Navbar Component
 */

export function renderNavbar(element) {
  element.innerHTML = `
    <div class="nav-container">
      <a href="#hero" class="brand-logo">
        SHAMVIL<span class="dot">.</span>
      </a>

      <ul class="nav-links">
        <li><a href="#work" class="nav-link active">Work</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>

      <div class="status-badge">
        <span class="status-dot"></span>
        <span>Available Q3/Q4</span>
      </div>
    </div>
  `;

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
