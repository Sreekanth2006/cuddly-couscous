import Head from "next/head";
import { Outfit, Plus_Jakarta_Sans, Great_Vibes, Montserrat } from "next/font/google";
import { useState, useEffect } from "react";
import ExamplesSection from "../components/ExamplesSection";
import InputForm from "../components/InputForm";
import ResultsSection from "../components/ResultsSection";
import HeroBackground from "../components/HeroBackground";
import ExtensionSection from "../components/ExtensionSection";
import type { Sentiment } from "../types";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<Sentiment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !inputText.trim()) {
      setResult(null);
      setError("");
    }
  }, [inputText, loading]);

  const analyzeSentiment = async (text?: string) => {
    const textToAnalyze = text || inputText;
    if (!textToAnalyze.trim()) return;
    
    setInputText(textToAnalyze);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("https://ps-2025-backend-production.up.railway.app/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      const sentiments = Array.isArray(data) ? data[0] : [];
      const sorted = sentiments.sort((a: Sentiment, b: Sentiment) => b.score - a.score);
      setResult(sorted);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearInput = () => {
    setInputText("");
    setResult(null);
    setError("");
  };

  return (
    // Prevent unwanted horizontal scroll by hiding overflow on X axis
    <div className={`${outfit.variable} ${jakarta.variable} ${greatVibes.variable} ${montserrat.variable} overflow-x-hidden min-h-screen font-body text-foreground bg-background selection:bg-primary selection:text-white`} style={{ overflowX: 'clip' }}>
      <div className="md:scale-125 md:origin-top" style={{ transformOrigin: 'top center' }}>
      <Head>
        <title>Sentiment Analyzer</title>
        <meta name="description" content="Analyze the sentiment of your text." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* <nav className="w-full py-3 px-4 md:py-4 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-lg md:text-2xl font-display font-bold tracking-tight text-primary">
          Text<span className="text-secondary">Sense</span>.
        </div>
      </nav> */}

      {/* Full-width hero section (background spans the entire viewport) */}
      <section className="relative w-[100vw] overflow-hidden rounded-b-xl min-h-[320px] md:min-h-screen">
        <HeroBackground imageUrl="/hero.png" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 pt-30 md:pt-8 pb-24">
          <div className="text-center mb-8 space-y-8">
            <h1 className="text-3xl md:text-5xl font-great-vibes font-normal text-slate-900 leading-tight">
              How does your text feel?<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary"></span>
            </h1>
            <p
              className="text-base md:text-lg text-slate-600 max-w-md md:max-w-full mx-auto truncate whitespace-nowrap font-montserrat font-medium"
              title="Enter your text below to detect if it's Happy, Sad, or Neutral."
            >
              Enter your text below to detect if it's Happy, Sad, or Neutral.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputForm
              inputText={inputText}
              loading={loading}
              error={error}
              onInputChange={setInputText}
              onAnalyze={() => analyzeSentiment()}
              onClear={clearInput}
              hasResult={!!result}
            />

            {(loading || result) && <ResultsSection loading={loading} result={result} />}
          </div>
        </div>
      </section>

      {/* Extension section - desktop/tablet and mobile versions */}
      {/* Desktop/Tablet: hidden on small screens */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-8 hidden sm:block">
        <ExtensionSection extensionUrl="https://github.com/localhost969/social-sentiment" />
      </div>
      {/* Mobile: only visible on small screens */}
      <div className="max-w-7xl mx-auto px-4 py-6 block sm:hidden">
        {/* @ts-ignore-next-line */}
        {/* eslint-disable-next-line */}
        {require('../components/ExtensionSectionMobile').default({ extensionUrl: "https://github.com/localhost969/social-sentiment" })}
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-12 pt-6 md:pt-8 pb-24">
        {/* Examples section (outside the hero background) */}
        <ExamplesSection onExampleSelect={(text) => analyzeSentiment(text)} />
      </main>
      </div>
    </div>
  );
}
