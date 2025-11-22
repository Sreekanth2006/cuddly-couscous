import React from "react";

interface ExtensionSectionMobileProps {
  extensionUrl?: string;
}

export default function ExtensionSectionMobile({ extensionUrl }: ExtensionSectionMobileProps) {
  return (
    <div className="w-full space-y-4">
      {/* Header and description above video, matching ExamplesSection style */}
      <div className="pt-12">
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-2 text-center">
          Try Our Extension<span className="text-secondary"></span>
        </h2>
        <p className="text-slate-600 mb-4 text-sm text-center">
          Analyze posts directly in your browser
        </p>
      </div>
      {/* Video section for mobile */}
      <div className="rounded-2xl overflow-hidden mb-2">
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
      {/* Button below video */}
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        <a
          href={extensionUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center text-sm"
        >
          Try Now
        </a>
      </div>
    </div>
  );
}
