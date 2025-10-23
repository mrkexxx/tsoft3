
import React from 'react';

interface GiftBoxProps {
  isOpen: boolean;
  color?: 'purple' | 'cyan';
}

const palettes = {
  purple: {
    baseFront: '#581C87',
    baseSide: '#7E22CE',
    baseTop: '#6B21A8',
    lidFront: '#7E22CE',
    lidSide: '#9333EA',
    lidTop: '#A855F7',
    ribbonVertical: '#F59E0B',
    ribbonHorizontal: '#FBBF24',
    bow: '#FCD34D',
    bowCenter: '#FBBF24',
    glowStop: 'rgba(252, 211, 77, 0.8)',
    shadowClass: 'drop-shadow-[0_0_20px_rgba(192,132,252,0.6)]',
  },
  cyan: {
    baseFront: '#155E75',
    baseSide: '#0891B2',
    baseTop: '#0E7490',
    lidFront: '#0891B2',
    lidSide: '#06B6D4',
    lidTop: '#22D3EE',
    ribbonVertical: '#D1D5DB',
    ribbonHorizontal: '#E5E7EB',
    bow: '#F9FAFB',
    bowCenter: '#E5E7EB',
    glowStop: 'rgba(34, 211, 238, 0.8)',
    shadowClass: 'drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]',
  }
};

const sparkleStyles = [
    { top: '20%', left: '15%', animationDuration: '1.5s', animationDelay: '0.2s' },
    { top: '30%', left: '80%', animationDuration: '1.8s', animationDelay: '0.5s' },
    { top: '75%', left: '10%', animationDuration: '2s', animationDelay: '1s' },
    { top: '80%', left: '90%', animationDuration: '1.6s', animationDelay: '0.8s' },
    { top: '50%', left: '50%', animationDuration: '2.2s', animationDelay: '0.3s' },
    { top: '5%', left: '45%', animationDuration: '1.7s', animationDelay: '0.1s' },
];

const GiftBox: React.FC<GiftBoxProps> = ({ isOpen, color = 'purple' }) => {
  const currentPalette = palettes[color];
  const glowId = `glow-${color}`;

  return (
    <div className="relative w-56 h-56 md:w-64 md:h-64 transition-transform duration-300 ease-in-out hover:scale-105">
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full ${currentPalette.shadowClass}`}
      >
        {/* Glow Effect - must be behind the box */}
        {isOpen && (
          <g>
            <defs>
              <radialGradient id={glowId}>
                <stop offset="0%" stopColor={currentPalette.glowStop} />
                <stop offset="100%" stopColor={currentPalette.glowStop.replace('0.8', '0')} />
              </radialGradient>
            </defs>
            <circle cx="100" cy="120" r="80" fill={`url(#${glowId})`} className="animate-pulse" />
          </g>
        )}

        {/* Box Base */}
        <path d="M 30 110 L 30 170 L 100 190 L 100 130 Z" fill={currentPalette.baseSide} />
        <path d="M 100 130 L 100 190 L 170 170 L 170 110 Z" fill={currentPalette.baseFront} />
        <path d="M 30 110 L 100 130 L 170 110 L 100 90 Z" fill={currentPalette.baseTop} />

        {/* Base Ribbon */}
        <path d="M 95 90 L 95 190 L 105 190 L 105 90 Z" fill={currentPalette.ribbonVertical} />
        <path d="M 30 135 L 170 135 L 170 145 L 30 145 Z" fill={currentPalette.ribbonHorizontal} transform="skewY(-8)" />

        {/* Lid & Lid Ribbon */}
        <g className={`transform-gpu origin-bottom-left transition-transform duration-1000 ease-in-out ${isOpen ? 'rotate-[-25deg] translate-x-[-40px] translate-y-[-20px]' : ''}`}>
          {/* Lid */}
          <path d="M 25 80 L 25 100 L 98 120 L 98 100 Z" fill={currentPalette.lidSide} />
          <path d="M 98 100 L 98 120 L 175 100 L 175 80 Z" fill={currentPalette.lidFront} />
          <path d="M 25 80 L 98 100 L 175 80 L 98 60 Z" fill={currentPalette.lidTop} />

          {/* Lid Ribbon */}
          <path d="M 93 60 L 93 120 L 103 120 L 103 60 Z" fill={currentPalette.ribbonVertical} />
          <path d="M 25 88 L 175 88 L 175 98 L 25 98 Z" fill={currentPalette.ribbonHorizontal} transform="skewY(-8)" />
          
          {/* Bow */}
          <path d="M 98 60 C 70 50, 70 20, 90 20 C 100 20, 100 40, 98 60" fill={currentPalette.bow} />
          <path d="M 98 60 C 126 50, 126 20, 106 20 C 96 20, 96 40, 98 60" fill={currentPalette.bow} />
          <circle cx="98" cy="28" r="8" fill={currentPalette.bowCenter} />
        </g>
      </svg>
      {isOpen && (
        <div className="absolute inset-0">
          {sparkleStyles.map((style, index) => (
            <span
              key={index}
              className="sparkle"
              style={{
                top: style.top,
                left: style.left,
                animationDuration: style.animationDuration,
                animationDelay: style.animationDelay,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GiftBox;