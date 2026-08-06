import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export function Logo({ className = "w-8 h-8", size, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      width={size}
      height={size}
      {...props}
    >
      <defs>
        {/* Top main wing cyan gradient */}
        <linearGradient id="ff-logo-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D5FF" />
          <stop offset="100%" stopColor="#00A2FF" />
        </linearGradient>

        {/* Middle fold deep blue gradient */}
        <linearGradient id="ff-logo-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0080FF" />
          <stop offset="100%" stopColor="#0052FF" />
        </linearGradient>

        {/* Right wing cyan-blue gradient */}
        <linearGradient id="ff-logo-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B8FF" />
          <stop offset="100%" stopColor="#0077FF" />
        </linearGradient>

        {/* Speed streak gradient */}
        <linearGradient id="ff-logo-streak" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#0099FF" />
        </linearGradient>
      </defs>

      {/* Main Top Wing */}
      <path
        d="M495.4 12.3c-4.8-3.4-11.2-2.9-15.6 1.1L19.2 268.4c-7.1 6.2-8 17.1-2.1 24.3 5.9 7.2 16.6 8.5 24.1 2.9l168-125.7L478.4 28c4.4-4.1 11.2-1.9 12.5 4L190.1 328.7c-3.1 3.5-4.8 8.1-4.7 12.8l10.1 144.1c.9 12.6 16.7 17.3 24.4 7.2l62.8-82.5 98.4 69.1c7.8 5.5 18.5 1.5 20.9-7.9L509.3 27.6c1.6-9.1-4.7-16-13.9-15.3z"
        fill="url(#ff-logo-cyan)"
      />

      {/* Center Body Fold */}
      <path
        d="M282.7 409.5l-82.4 76.1c-3.1 2.9-8.3-.3-7.8-4.5l10.1-144.1 80.1 72.5z"
        fill="url(#ff-logo-blue)"
      />

      {/* Underwing Shadow Fold */}
      <path
        d="M509.3 27.6L402 471.3c-2.4 9.4-13.1 13.4-20.9 7.9L282.7 409.5 478.4 28c7.1-7.2 17.9 1.4 30.9-.4z"
        fill="url(#ff-logo-ocean)"
      />

      {/* Motion Streak 1 */}
      <rect
        x="20"
        y="370"
        width="110"
        height="26"
        rx="13"
        transform="rotate(-42 20 370)"
        fill="url(#ff-logo-streak)"
      />

      {/* Motion Streak 2 */}
      <rect
        x="60"
        y="420"
        width="135"
        height="26"
        rx="13"
        transform="rotate(-42 60 420)"
        fill="url(#ff-logo-streak)"
      />
    </svg>
  );
}
