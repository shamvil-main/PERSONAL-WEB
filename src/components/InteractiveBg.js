/**
 * Interactive Background Micro-Elements Physics System
 * Creates floating background elements (crosshairs, sparkles, film marks, rings) 
 * that float continuously and react/wiggle dynamically to mouse movement!
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

  const totalElements = 24;
  const elementsData = [];

  container.innerHTML = '';

  for (let i = 0; i < totalElements; i++) {
    const item = elementTypes[i % elementTypes.length];
    const el = document.createElement('div');
    el.className = `interactive-bg-element type-${item.type}`;
    el.innerHTML = item.icon;

    // Random initial positioning across viewport
    const posX = Math.random() * 95; // %
    const posY = Math.random() * 95; // %
    const scale = 0.6 + Math.random() * 0.8;
    const depth = 0.2 + Math.random() * 0.8; // Parallax depth coefficient
    const floatSpeed = 3 + Math.random() * 4; // Floating duration

    el.style.left = `${posX}vw`;
    el.style.top = `${posY}vh`;
    el.style.animationDuration = `${floatSpeed}s`;

    container.appendChild(el);

    elementsData.push({
      el,
      baseX: posX,
      baseY: posY,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      depth,
      scale
    });
  }

  // Mouse interaction state
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  // Touch movement support for mobile
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      targetMouseX = e.touches[0].clientX;
      targetMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  // Physics animation loop using requestAnimationFrame
  function updatePhysics() {
    // Easing mouse coordinates
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (mouseX - centerX) / centerX; // -1 to 1
    const deltaY = (mouseY - centerY) / centerY; // -1 to 1

    elementsData.forEach(item => {
      // Calculate repulsion / parallax offset based on distance to mouse
      const elementRect = item.el.getBoundingClientRect();
      const elCenterX = elementRect.left + elementRect.width / 2;
      const elCenterY = elementRect.top + elementRect.height / 2;

      const distMouseX = mouseX - elCenterX;
      const distMouseY = mouseY - elCenterY;
      const dist = Math.sqrt(distMouseX * distMouseX + distMouseY * distMouseY);

      // Mouse repulsion radius (300px)
      let pushX = 0;
      let pushY = 0;
      if (dist < 300 && dist > 0) {
        const force = (1 - dist / 300) * 35 * item.depth;
        pushX = -(distMouseX / dist) * force;
        pushY = -(distMouseY / dist) * force;
      }

      // Combine parallax + mouse repulsion
      item.targetX = deltaX * 45 * item.depth + pushX;
      item.targetY = deltaY * 45 * item.depth + pushY;

      // Smooth lerp
      item.currentX += (item.targetX - item.currentX) * 0.1;
      item.currentY += (item.targetY - item.currentY) * 0.1;

      // Apply 3D transform with rotation wiggle
      const rotate = item.currentX * 0.5;
      item.el.style.transform = `translate3d(${item.currentX}px, ${item.currentY}px, 0) scale(${item.scale}) rotate(${rotate}deg)`;
    });

    requestAnimationFrame(updatePhysics);
  }

  requestAnimationFrame(updatePhysics);
}
