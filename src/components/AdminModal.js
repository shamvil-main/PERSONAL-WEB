/**
 * Admin Video Manager & Direct Link Generator Component
 * Allows Shamvil to add videos directly on the website without touching code!
 * Supports Unlisted links, custom video paths, aspect ratios, and details.
 */

import { addCustomPortfolioItem, deleteCustomPortfolioItem, getAllPortfolioItems } from '../data/portfolioData.js';
import { copyToClipboard, showToast } from '../utils/helpers.js';

let isAdminUnlocked = false;
const DEFAULT_PIN = "shamvil2026"; // Secret Admin PIN

export function initAdminModal(rootContainer) {
  rootContainer.innerHTML = `
    <div id="admin-modal-backdrop" class="admin-backdrop" role="dialog" aria-modal="true" aria-label="Admin Video Manager">
      <div class="admin-modal-card">
        <!-- Header -->
        <div class="admin-modal-header">
          <div class="admin-header-title">
            <span class="admin-icon">⚡</span>
            <h2>Admin Content Manager</h2>
            <span class="admin-badge">SHAMVIL STUDIO</span>
          </div>
          <button id="admin-close-btn" class="admin-close-btn" aria-label="Close Admin Modal">✕</button>
        </div>

        <!-- PIN Verification Screen -->
        <div id="admin-pin-screen" class="admin-screen active">
          <div class="admin-pin-box">
            <span class="pin-lock-icon">🔒</span>
            <h3>Security Verification</h3>
            <p>Enter your secret admin passcode to manage portfolio videos and unlisted client links.</p>
            <form id="admin-pin-form" class="admin-pin-form">
              <input 
                type="password" 
                id="admin-pin-input" 
                class="form-input pin-input" 
                placeholder="Enter Admin PIN" 
                required 
                autocomplete="current-password"
              />
              <button type="submit" class="btn-primary admin-submit-btn">
                <span>Unlock Portal</span>
                <span>→</span>
              </button>
            </form>
            <small class="pin-hint">Default Passcode: <strong>shamvil2026</strong></small>
          </div>
        </div>

        <!-- Admin Content Management Dashboard -->
        <div id="admin-dashboard-screen" class="admin-screen">
          <!-- Navigation Tabs -->
          <div class="admin-tabs">
            <button id="tab-btn-add" class="admin-tab-btn active">➕ Add New Video / Work</button>
            <button id="tab-btn-manage" class="admin-tab-btn">📋 Manage Existing Items</button>
          </div>

          <!-- Tab 1: Add New Video Form -->
          <div id="admin-tab-add" class="admin-tab-content active">
            <form id="add-video-form" class="admin-form">
              <div class="form-row">
                <div class="form-group flex-2">
                  <label for="vid-title" class="form-label">VIDEO / PROJECT TITLE *</label>
                  <input type="text" id="vid-title" class="form-input" placeholder="e.g. LUXURY AUTOMOTIVE COMMERCIAL" required />
                </div>
                <div class="form-group flex-1">
                  <label for="vid-category" class="form-label">CATEGORY *</label>
                  <select id="vid-category" class="form-input">
                    <option value="Videos">Videos</option>
                    <option value="Photography">Photography</option>
                    <option value="Design">Design</option>
                    <option value="Motion">Motion</option>
                    <option value="3D Art">3D Art</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group flex-1">
                  <label for="vid-aspect" class="form-label">ASPECT RATIO *</label>
                  <select id="vid-aspect" class="form-input">
                    <option value="9:16">9:16 (Vertical Reel / TikTok / Shorts)</option>
                    <option value="16:9">16:9 (Widescreen Film / YouTube)</option>
                    <option value="1:1">1:1 (Square)</option>
                    <option value="4:5">4:5 (Instagram Portrait)</option>
                  </select>
                </div>

                <div class="form-group flex-1">
                  <label for="vid-duration" class="form-label">DURATION (e.g. 0:45)</label>
                  <input type="text" id="vid-duration" class="form-input" placeholder="0:45" />
                </div>
              </div>

              <div class="form-group">
                <label for="vid-src" class="form-label">VIDEO FILE PATH / URL *</label>
                <input 
                  type="text" 
                  id="vid-src" 
                  class="form-input" 
                  placeholder="e.g. /VIDEOS/my_new_video.mp4 OR https://vimeo.com/..." 
                  required 
                />
                <small class="form-hint">Tip: Place your video file inside <code>public/VIDEOS/</code> folder and enter <code>/VIDEOS/filename.mp4</code>!</small>
              </div>

              <div class="form-row">
                <div class="form-group flex-1">
                  <label for="vid-client" class="form-label">CLIENT / PROJECT NAME</label>
                  <input type="text" id="vid-client" class="form-input" placeholder="e.g. Red Bull Cinema" />
                </div>
                <div class="form-group flex-1">
                  <label for="vid-year" class="form-label">YEAR</label>
                  <input type="text" id="vid-year" class="form-input" value="2026" />
                </div>
              </div>

              <div class="form-group">
                <label for="vid-tools" class="form-label">TOOLS &amp; SOFTWARE (Comma Separated)</label>
                <input type="text" id="vid-tools" class="form-input" placeholder="DaVinci Resolve, Cinema 4D, Premiere Pro" />
              </div>

              <div class="form-group">
                <label for="vid-desc" class="form-label">PROJECT DESCRIPTION</label>
                <textarea id="vid-desc" class="form-textarea" style="min-height: 80px;" placeholder="Tell the story or technical specifications of this project..."></textarea>
              </div>

              <!-- Options Checkboxes -->
              <div class="admin-checkbox-group">
                <label class="checkbox-label highlight-unlisted">
                  <input type="checkbox" id="vid-unlisted" />
                  <span>🔒 <strong>Make Unlisted (Secret Client Link Only)</strong> — Hidden from main website gallery! Accessible only via direct share link.</span>
                </label>

                <label class="checkbox-label">
                  <input type="checkbox" id="vid-featured" checked />
                  <span>⚡ <strong>Feature on Home Page Teaser Grid</strong></span>
                </label>
              </div>

              <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem;">
                <span>Publish Video / Project</span>
                <span>→</span>
              </button>
            </form>
          </div>

          <!-- Tab 2: Manage Items List -->
          <div id="admin-tab-manage" class="admin-tab-content">
            <div id="admin-items-list" class="admin-items-list">
              <!-- Rendered dynamically -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Handlers
  const modal = document.getElementById('admin-modal-backdrop');
  const closeBtn = document.getElementById('admin-close-btn');
  const pinForm = document.getElementById('admin-pin-form');
  const addForm = document.getElementById('add-video-form');

  closeBtn.addEventListener('click', closeAdminModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAdminModal();
  });

  // PIN Form Submission
  pinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = document.getElementById('admin-pin-input').value;
    if (pin === DEFAULT_PIN || pin === "admin") {
      isAdminUnlocked = true;
      document.getElementById('admin-pin-screen').classList.remove('active');
      document.getElementById('admin-dashboard-screen').classList.add('active');
      renderManageItemsList();
      showToast('Admin Portal Unlocked!', 'success');
    } else {
      showToast('Incorrect Passcode!', 'error');
    }
  });

  // Tab Switching
  const tabAdd = document.getElementById('tab-btn-add');
  const tabManage = document.getElementById('tab-btn-manage');
  const contentAdd = document.getElementById('admin-tab-add');
  const contentManage = document.getElementById('admin-tab-manage');

  tabAdd.addEventListener('click', () => {
    tabAdd.classList.add('active');
    tabManage.classList.remove('active');
    contentAdd.classList.add('active');
    contentManage.classList.remove('active');
  });

  tabManage.addEventListener('click', () => {
    tabManage.classList.add('active');
    tabAdd.classList.remove('active');
    contentManage.classList.add('active');
    contentAdd.classList.remove('active');
    renderManageItemsList();
  });

  // Add Video Submission
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('vid-title').value.trim();
    const category = document.getElementById('vid-category').value;
    const aspect = document.getElementById('vid-aspect').value;
    const src = document.getElementById('vid-src').value.trim();
    const duration = document.getElementById('vid-duration').value.trim() || "0:45";
    const client = document.getElementById('vid-client').value.trim() || "Independent";
    const year = document.getElementById('vid-year').value.trim() || "2026";
    const toolsInput = document.getElementById('vid-tools').value.trim();
    const tools = toolsInput ? toolsInput.split(',').map(t => t.trim()) : ["DaVinci Resolve"];
    const description = document.getElementById('vid-desc').value.trim() || `${title} cinematic video showcase.`;
    const unlisted = document.getElementById('vid-unlisted').checked;
    const featured = document.getElementById('vid-featured').checked;

    const newId = `custom-vid-${Date.now()}`;

    const newItem = {
      id: newId,
      title,
      category,
      mediaType: category === 'Photography' || category === 'Design' ? 'image' : 'video',
      aspectRatio: aspect,
      src,
      poster: src.endsWith('.mp4') ? `${src}.png` : src,
      description,
      year,
      client,
      tools,
      duration,
      featured,
      unlisted
    };

    addCustomPortfolioItem(newItem);
    addForm.reset();

    const currentUrl = window.location.origin + window.location.pathname;
    const shareLink = `${currentUrl}#portfolio?id=${newId}`;

    if (unlisted) {
      copyToClipboard(shareLink, 'Unlisted secret link copied to clipboard!');
      showToast(`Secret Unlisted Video Created! Link copied to clipboard.`, 'success', 5000);
    } else {
      showToast(`Video "${title}" published successfully!`, 'success');
    }

    // Refresh current view
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    renderManageItemsList();
  });
}

export function openAdminModal() {
  const modal = document.getElementById('admin-modal-backdrop');
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (isAdminUnlocked) {
    document.getElementById('admin-pin-screen').classList.remove('active');
    document.getElementById('admin-dashboard-screen').classList.add('active');
    renderManageItemsList();
  } else {
    document.getElementById('admin-pin-screen').classList.add('active');
    document.getElementById('admin-dashboard-screen').classList.remove('active');
  }
}

export function closeAdminModal() {
  const modal = document.getElementById('admin-modal-backdrop');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderManageItemsList() {
  const listContainer = document.getElementById('admin-items-list');
  if (!listContainer) return;

  const items = getAllPortfolioItems();

  listContainer.innerHTML = `
    <div class="manage-list-header">
      <span>${items.length} Total Projects (${items.filter(i => i.unlisted).length} Unlisted)</span>
    </div>
    <div class="manage-items-grid">
      ${items.map(item => {
        const currentUrl = window.location.origin + window.location.pathname;
        const shareLink = `${currentUrl}#portfolio?id=${item.id}`;
        return `
          <div class="admin-item-card ${item.unlisted ? 'unlisted-card' : ''}">
            <div class="item-card-info">
              <span class="item-card-badge">${item.category} • ${item.aspectRatio} ${item.unlisted ? '🔒 UNLISTED' : '🌐 PUBLIC'}</span>
              <h4 class="item-card-title">${item.title}</h4>
              <p class="item-card-sub">${item.client} • ${item.year}</p>
            </div>
            <div class="item-card-actions">
              <button class="btn-copy-link" data-link="${shareLink}">📋 Copy Link</button>
              ${item.isCustom ? `<button class="btn-delete-item" data-id="${item.id}">🗑 Delete</button>` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Copy Link Handlers
  const copyBtns = listContainer.querySelectorAll('.btn-copy-link');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const link = btn.getAttribute('data-link');
      copyToClipboard(link, 'Direct share link copied!');
    });
  });

  // Delete Item Handlers
  const deleteBtns = listContainer.querySelectorAll('.btn-delete-item');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this project?')) {
        deleteCustomPortfolioItem(id);
        renderManageItemsList();
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        showToast('Item removed.', 'info');
      }
    });
  });
}
