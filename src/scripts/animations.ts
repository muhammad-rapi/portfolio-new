import { animate, stagger } from 'motion';

export function initHeroAnimation() {
  const elements = [
    '.eyebrow-row',
    'h1',
    '.tagline',
    '.cta-row',
    '.status-row',
  ];

  animate(
    elements.join(', '),
    { opacity: [0, 1], y: [16, 0] },
    {
      duration: 0.5,
      easing: 'ease',
      delay: stagger(0.1),
    }
  );
}
