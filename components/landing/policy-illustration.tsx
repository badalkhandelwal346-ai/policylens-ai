"use client";

import React from "react";

interface PolicyIllustrationProps {
  className?: string;
}

export function PolicyIllustration({ className }: PolicyIllustrationProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[280px] sm:max-w-[300px] mx-auto drop-shadow-sm select-none"
      >
        {/* Soft ground pedestal / shadow */}
        <ellipse
          cx="160"
          cy="210"
          rx="110"
          ry="15"
          fill="#537593"
          fillOpacity="0.28"
        />

        {/* Back document sheet */}
        <g transform="translate(10, 5)">
          <rect
            x="95"
            y="48"
            width="120"
            height="145"
            rx="16"
            fill="#D5E3EE"
          />
          {/* Subtle back document lines */}
          <rect x="110" y="68" width="45" height="4" rx="2" fill="#B2C9DA" />
          <rect x="110" y="80" width="75" height="3" rx="1.5" fill="#BFD5E4" />
          <rect x="110" y="90" width="60" height="3" rx="1.5" fill="#BFD5E4" />
        </g>

        {/* Front document sheet (pristine white card) */}
        <rect
          x="115"
          y="35"
          width="130"
          height="158"
          rx="18"
          fill="#FFFFFF"
          stroke="#CEDEEA"
          strokeWidth="1.5"
        />

        {/* Top title line of front document */}
        <rect x="133" y="56" width="50" height="5" rx="2.5" fill="#243B53" />
        <rect x="133" y="68" width="80" height="3" rx="1.5" fill="#D3E2EC" />

        {/* Center verified policy item box */}
        <rect
          x="133"
          y="82"
          width="94"
          height="50"
          rx="10"
          fill="#F7FAFC"
          stroke="#E2ECF2"
          strokeWidth="1"
        />

        {/* Verified checkmark inside center box */}
        <path
          d="M144 107 L151 114 L165 99"
          fill="none"
          stroke="#0D9488"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Text lines in center box */}
        <rect x="174" y="103" width="40" height="4.5" rx="2.25" fill="#243B53" />
        <rect x="174" y="113" width="28" height="3" rx="1.5" fill="#94A3B8" />

        {/* Bottom lines on front document */}
        <rect x="133" y="146" width="42" height="4.5" rx="2.25" fill="#243B53" />
        <rect x="133" y="157" width="70" height="3" rx="1.5" fill="#D3E2EC" />
        <rect x="133" y="166" width="52" height="3" rx="1.5" fill="#D3E2EC" />

        {/* Bottom-left floating badge (Slate circle/rounded square with white checkmark) */}
        <g transform="translate(88, 150)">
          <rect
            width="34"
            height="34"
            rx="10"
            fill="#50738C"
            className="filter drop-shadow-md"
          />
          <path
            d="M11 17.5 L15 21.5 L23 13"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Bottom-right floating badge (Dark navy circular compass/gauge dial) */}
        <g transform="translate(230, 168)">
          {/* Main dark badge circle */}
          <circle
            cx="0"
            cy="0"
            r="26"
            fill="#243B53"
            className="filter drop-shadow-lg"
          />
          {/* Outer dotted tick mark ring */}
          <circle
            cx="0"
            cy="0"
            r="20"
            fill="none"
            stroke="#678BAA"
            strokeWidth="1.5"
            strokeDasharray="2.5 3.5"
          />
          {/* Center compass ring */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Center compass needle / crosshair points */}
          <path
            d="M0 -15 L0 -9 M0 9 L0 15 M-15 0 L-9 0 M9 0 L15 0"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Subtle diagonal marker dots */}
          <circle cx="-8" cy="-8" r="1" fill="#8CAEC4" />
          <circle cx="8" cy="-8" r="1" fill="#8CAEC4" />
          <circle cx="-8" cy="8" r="1" fill="#8CAEC4" />
          <circle cx="8" cy="8" r="1" fill="#8CAEC4" />
        </g>
      </svg>
    </div>
  );
}
