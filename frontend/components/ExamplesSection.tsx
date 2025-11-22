import React from "react";

interface Example {
  text: string;
  label: string;
}

interface ExamplesSectionProps {
  onExampleSelect: (text: string) => void;
}

const EXAMPLES: Example[] = [
  {
    text: "I absolutely love this! This is the best day ever, I'm so happy!",
    label: "Happy Example",
  },
  {
    text: "This makes me so sad and disappointed. I can't believe this happened.",
    label: "Sad Example",
  },
  {
    text: "The weather is nice today. I went to the store and bought some groceries.",
    label: "Happy Example",
  },
  {
    text: "I'm thrilled! This is amazing and wonderful, thank you so much!",
    label: "Happy",
  },
  {
    text: "I feel terrible and broken. Nothing seems to go right anymore.",
    label: "Sad",
  },
  {
    text: "The meeting is scheduled for tomorrow at 10 AM in the conference room.",
    label: "Neutral",
  },
];


export default function ExamplesSection({ onExampleSelect }: ExamplesSectionProps) {
  const handleExampleClick = (text: string) => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onExampleSelect(text);
  };
  return (
    <div className="mt-12 pt-12 border-t border-slate-100 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-6 w-full">
        {/* Left side - Title & Description */}
        <div className="lg:flex-1 lg:max-w-xs mb-8 lg:mb-0">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-2 lg:text-left text-center">
            Try These Examples<span className="text-secondary"></span>
          </h2>
          <p className="text-slate-600 mb-8 lg:text-left text-center">
            Click any example below to analyze it instantly
          </p>
        </div>

        {/* Right side - Examples Grid */}
        <div className="lg:shrink-0 lg:flex-1 w-full">
          {/* Mobile: swipeable card carousel */}
          <div className="sm:hidden">
            <div className="flex gap-6 overflow-x-auto pb-6 px-2 hide-scrollbar snap-x snap-mandatory">
              {EXAMPLES.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example.text)}
                  type="button"
                  aria-label={`Analyze example: ${example.label}`}
                  aria-controls="sentiment-input"
                  className="min-w-[85vw] max-w-xs p-5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 shadow-lg active:scale-95 transition-all duration-200 text-left cursor-pointer group touch-manipulation flex-shrink-0 snap-center relative"
                >
                  {/* Tap overlay */}
                 
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                      {example.label}
                    </span>
                    <span className="text-lg opacity-80 transition-opacity">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><path d="M9 6l6 6-6 6"/></svg>
                    </span>
                  </div>
                  <p className="text-base text-slate-700 font-medium line-clamp-4 transition-colors wrap-break-word">
                    {example.text}
                  </p>
                </button>
              ))}
            </div>
            {/* Scroll indicator dots */}
            <div className="w-full flex justify-center mt-2 gap-2">
              {EXAMPLES.map((_, idx) => (
                <span key={idx} className="h-2 w-2 bg-slate-300 rounded-full inline-block" />
              ))}
            </div>
          </div>
          {/* Desktop/tablet: grid */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAMPLES.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example.text)}
                type="button"
                aria-label={`Analyze example: ${example.label}`}
                aria-controls="sentiment-input"
                className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 md:hover:border-primary md:hover:shadow-lg md:hover:-translate-y-1 active:scale-95 transition-all duration-200 text-left cursor-pointer group touch-manipulation"
              >
                <div className="flex items-start justify-between mb-3 gap-3">
                  <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                    {example.label}
                  </span>
                  <span className="text-lg hidden md:inline opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 line-clamp-3 md:group-hover:text-slate-900 transition-colors wrap-break-word">
                  {example.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
