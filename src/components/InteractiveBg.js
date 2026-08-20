/**
 * Interactive Background Micro-Elements Physics System
 * Optimized for Mobile & High Performance (Zero Layout Thrashing!)
 */

export function initInteractiveBackground() {
  let container = document.getElementById('interactive-bg-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'interactive-bg-root';
    container.className = 'interactive-bg-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.prepend(container);
  }

  // Micro-Element symbols and types
  const elementTypes = [
    { type: 'crosshair', icon: '+' },
    { type: 'sparkle', icon: '✦' },
    { type: 'ring', icon: '⭕' },
    { type: 'film', icon: '🎞️' },
    { type: 'dot', icon: '•' },
    { type: 'tag', icon: '4K DCI' },
    { type: 'tag', icon: '35MM' },
    { type: 'tag', icon: 'RAW' },
    { type: 'star', icon: '✨' }
  ];

  // Use fewer elements on mobile for maximum GPU/CPU efficiency
  const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
  const totalElements = isMobile ? 12 : 22;
  const elementsData = [];

  container.innerHTML = '';

  for (let i = 0; i < totalElements; i++) {
    const item = elementTypes[i % elementTypes.length];
    const el = document.createElement('div');
    el.className = `interactive-bg-element type-${item.type}`;
    el.innerHTML = item.icon;

    // Random initial positioning across viewport
    const posX = Math.random() * 92;
    const posY = Math.random() * 92;
    const scale = 0.6 + Math.random() * 0.7;
    const depth = 0.2 + Math.random() * 0.7;
    const floatSpeed = 4 + Math.random() * 5;

    el.style.left = `${posX}vw`;
    el.style.top = `${posY}vh`;
    el.style.animationDuration = `${floatSpeed}s`;

    container.appendChild(el);

    elementsData.push({
      el,
      depth,
      scale,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0
    });
  }

  // If mobile, let CSS handle floating animations (0 JS overhead on mobile scroll!)
  if (isMobile) return;

  // Desktop Mouse Interaction State
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;
  let animationFrameId = null;

  const handleMouseMove = (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  function updatePhysics() {
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (mouseX - centerX) / centerX;
    const deltaY = (mouseY - centerY) / centerY;

    elementsData.forEach(item => {
      item.targetX = deltaX * 35 * item.depth;
      item.targetY = deltaY * 35 * item.depth;

      item.currentX += (item.targetX - item.currentX) * 0.1;
      item.currentY += (item.targetY - item.currentY) * 0.1;

      const rotate = item.currentX * 0.4;
      item.el.style.transform = `translate3d(${item.currentX.toFixed(1)}px, ${item.currentY.toFixed(1)}px, 0) scale(${item.scale.toFixed(2)}) rotate(${rotate.toFixed(1)}deg)`;
    });

    animationFrameId = requestAnimationFrame(updatePhysics);
  }

  animationFrameId = requestAnimationFrame(updatePhysics);
}
