import React from "react";

// Declarar o elemento customizado para o TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon?: string;
        width?: string | number;
        height?: string | number;
      };
    }
  }
}

export const PhIcon = ({ icon, className }: { icon: string, className?: string }) => {
  return (
    <iconify-icon 
      icon={`ph:${icon}`} 
      class={className} 
      style={{ fontSize: '26px' }}
    />
  );
};

export const MoonSleepIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(2 2)" opacity="0.5">
        <path d="M 10 20 C 15.523 20 20 15.523 20 10 C 20 9.537 19.306 9.461 19.067 9.857 C 17.929 11.741 15.861 13 13.5 13 C 9.91 13 7 10.09 7 6.5 C 7 4.138 8.259 2.071 10.143 0.933 C 10.539 0.693 10.463 0 10 0 C 4.477 0 0 4.477 0 10 C 0 15.523 4.477 20 10 20 Z" />
      </g>
      <g transform="translate(12.75 1.25)">
        <path d="M 5.25 1.5 C 4.836 1.5 4.5 1.164 4.5 0.75 C 4.5 0.336 4.836 0 5.25 0 L 9.25 0 C 9.553 0 9.827 0.183 9.943 0.463 C 10.059 0.743 9.995 1.066 9.78 1.28 L 7.061 4 L 9.25 4 C 9.664 4 10 4.336 10 4.75 C 10 5.164 9.664 5.5 9.25 5.5 L 5.25 5.5 C 4.947 5.5 4.673 5.317 4.557 5.037 C 4.441 4.757 4.505 4.434 4.72 4.22 L 7.439 1.5 Z M 0.75 7.5 C 0.336 7.5 0 7.164 0 6.75 C 0 6.336 0.336 6 0.75 6 L 3.75 6 C 4.053 6 4.327 6.183 4.443 6.463 C 4.559 6.743 4.495 7.066 4.28 7.28 L 2.561 9 L 3.75 9 C 4.164 9 4.5 9.336 4.5 9.75 C 4.5 10.164 4.164 10.5 3.75 10.5 L 0.75 10.5 C 0.447 10.5 0.173 10.317 0.057 10.037 C -0.059 9.757 0.005 9.434 0.22 9.22 L 1.939 7.5 Z" />
      </g>
    </svg>
  );
};
