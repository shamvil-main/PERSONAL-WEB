/**
 * Contact Section Component
 */

import { ARTIST_INFO } from '../data/portfolioData.js';
import { copyToClipboard, showToast } from '../utils/helpers.js';

export function renderContact(element) {
  element.innerHTML = `
    <div class="contact-container">
      <div class="contact-grid">
        <!-- Left Contact Info -->
        <div>
          <span class="section-tag">INITIATE PROJECT</span>
          <h2 class="contact-big-title">Let's build something extraordinary together.</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 2rem;">
            Currently accepting select commercial film projects, 3D art direction, and high-impact visual campaigns for 2026.
          </p>

          <!-- Email Quick Copy Card -->
          <div id="copy-email-btn" class="email-copy-card" role="button" aria-label="Copy Email Address">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">DIRECT INQUIRIES</div>
              <div class="email-address">${ARTIST_INFO.email}</div>
            </div>
            <span class="copy-badge">COPY EMAIL 📋</span>
          </div>

          <!-- Social Links -->
          <div class="social-links">
            ${ARTIST_INFO.socials.map(social => `
              <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-btn">
                ${social.name} ↗
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Right Contact Form -->
        <div>
          <form id="portfolio-contact-form" class="contact-form">
            <div class="form-group">
              <label for="contact-name" class="form-label">YOUR NAME</label>
              <input type="text" id="contact-name" class="form-input" placeholder="e.g. Alex Morgan" required />
            </div>

            <div class="form-group">
              <label for="contact-email" class="form-label">EMAIL ADDRESS</label>
              <input type="email" id="contact-email" class="form-input" placeholder="alex@company.com" required />
            </div>

            <div class="form-group">
              <label for="contact-category" class="form-label">PROJECT SCOPE</label>
              <select id="contact-category" class="form-input" style="appearance: none;">
                <option value="Commercial Film / Video Reel">Commercial Film / Vertical Reel</option>
                <option value="3D Motion & Art Direction">3D Motion & Art Direction</option>
                <option value="Photography & Color Grade">Photography & Color Grade</option>
                <option value="Full Visual Identity">Full Brand Visual Identity</option>
              </select>
            </div>

            <div class="form-group">
              <label for="contact-message" class="form-label">PROJECT DETAILS</label>
              <textarea id="contact-message" class="form-textarea" placeholder="Tell me about your vision, timeline, and goals..." required></textarea>
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 0.5rem;">
              <span>Send Project Inquiry</span>
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Attach Email Copy Handler
  document.getElementById('copy-email-btn').addEventListener('click', () => {
    copyToClipboard(ARTIST_INFO.email, 'Email address copied to clipboard!');
  });

  // Attach Form Submit Handler
  const form = document.getElementById('portfolio-contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    showToast(`Thank you, ${name}! Your inquiry has been dispatched.`, 'success', 4000);
    form.reset();
  });
}
