import React from "react";

interface ExtensionSectionProps {
  extensionUrl?: string;
}

export default function ExtensionSection({ extensionUrl }: ExtensionSectionProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6">
        {/* Left side - Video */}
        <div className="md:flex-1 rounded-2xl overflow-hidden">
          <video
            className="w-full h-auto rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
            style={{ aspectRatio: "16/9" }}
          >
            <source src="/final.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right side - Content */}
        <div className="md:shrink-0 md:w-64 flex flex-col justify-center gap-3">
          <div>
            <h3 className="text-lg md:text-xl font-display font-bold text-slate-900">
              Try Our Extension
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Analyze posts directly in your browser
            </p>
          </div>

          {/* Try Now button */}
          <a
            href={extensionUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center text-sm md:text-base"
          >
            Try Now
          </a>
        </div>
      </div>
    </div>
  );
}
