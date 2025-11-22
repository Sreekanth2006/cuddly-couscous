import React from "react";
import Image from "next/image";

export default function HeroBackground({ className = "", imageUrl = "", overlayOpacity = 0.45 }:
  { className?: string; imageUrl?: string; overlayOpacity?: number }) {
  return (
    // Make the background span the entire viewport width while matching the hero section height.
    // We center it horizontally so it appears centered relative to the viewport,
    // but the hero section's overflow-hidden + rounded-xl will clip it to the hero area.
    <div
      className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full z-0 overflow-hidden ${className}`}
      aria-hidden
    >
       {/* Background image (if provided) */}
       {imageUrl ? (
        // Make the wrapper relative and full-size so Image fill can work correctly
        <div className="relative -z-10 w-full h-full">
          <Image
            src={imageUrl}
            alt="Hero background"
            fill
            className="object-cover w-full h-full"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
           {/* Warm, human-like gradient overlay to keep text readable */}
           <div
             className="absolute inset-0"
             style={{
               background: `linear-gradient(135deg, rgba(255,244,238,${overlayOpacity}) 0%, rgba(255,230,210,${overlayOpacity}) 50%, rgba(224,194,160,${overlayOpacity}) 100%)`,
             }}
           />
         </div>
       ) : (
        <div
          className="relative w-full h-full opacity-95"
           style={{
             background: "linear-gradient(135deg, #FFF7F1 0%, #FFE8D8 40%, #FFD5BB 100%)",
           }}
         />
       )}
 
       {/* Decorative, low-contrast SVG blobs for depth (hide on small screens) */}
      <svg className="hidden md:block absolute -left-20 top-0 w-[1200px] h-[700px] opacity-60 mix-blend-multiply" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
         <defs>
           <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
             {/* Soft human tones: a warm peach -> sand gradient */}
             <stop offset="0%" stopColor="#FFE0D6" stopOpacity="0.95" />
             <stop offset="60%" stopColor="#FFD0B8" stopOpacity="0.85" />
             <stop offset="100%" stopColor="#E5C3A1" stopOpacity="0.75" />
           </linearGradient>
           <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur in="SourceGraphic" stdDeviation="70" />
           </filter>
         </defs>
 
         <g filter="url(#blur)">
           <path fill="url(#g1)" d="M231 449.5C163 527 65 497 14 433.5C-37 370 5 280 68 197C131 114 214 40 317 40C420 40 486 93.5 594 95.5C702 97.5 915 69 962 151C1009 233 1045 298 998 363.5C951 429 799 372 690 403.5C581 435 399 372 231 449.5Z" />
         </g>
 
         <g filter="url(#blur)">
           <ellipse cx="950" cy="155" rx="300" ry="120" fill="rgba(255,248,245,0.06)" />
         </g>
       </svg>
 
       {/* Optional noise/texture - use a subtle soft grain pattern to add depth */}
      <svg className="absolute inset-0 w-full h-full opacity-6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
         {/* A very subtle grain to provide natural texture */}
         <filter id="grain"><feTurbulence baseFrequency="0.6" numOctaves="2" stitchTiles="stitch" /></filter>
         <rect width="100%" height="100%" filter="url(#grain)" fill="black" />
       </svg>
     </div>
   );
 }
