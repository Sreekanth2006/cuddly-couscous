import { Sentiment } from "../types";

interface ResultsSectionProps {
  loading: boolean;
  result: Sentiment[] | null;
}

const getSentimentColor = (label: string) => {
  if (label === "positive") return "text-secondary bg-secondary/10 border-secondary/20";
  if (label === "negative") return "text-accent bg-accent/10 border-accent/20";
  return "text-slate-600 bg-slate-100 border-slate-200";
};

const getSentimentEmoji = (label: string) => {
  if (label === "positive") return "😊";
  if (label === "negative") return "😔";
  return "😐";
};

const getDisplayLabel = (label: string) => {
  if (label === "positive") return "Happy";
  if (label === "negative") return "Sad";
  return "Neutral";
};

export default function ResultsSection({ loading, result }: ResultsSectionProps) {
  return (
    <div className="w-full">
      <div className="bg-surface rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 h-full">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Analysis Result</h3>

        {loading && (
          <div role="status" aria-live="polite" className="space-y-4 animate-pulse">
            <div className="p-3 md:p-6 rounded-xl md:rounded-2xl border-2 flex items-center justify-between gap-2 md:gap-4 flex-wrap">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="h-10 md:h-12 w-10 md:w-12 rounded-full bg-slate-200"></div>
                <div className="w-full">
                  <div className="h-3 md:h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                  <div className="h-5 md:h-6 bg-slate-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="text-right w-auto ml-auto">
                <div className="h-5 md:h-6 bg-slate-200 rounded w-20 mx-auto md:mx-0"></div>
                <div className="h-3 bg-slate-200 rounded w-8 mt-2 mx-auto md:mx-0"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="h-3 bg-slate-200 rounded w-24 mx-auto mb-3"></div>
                <div className="h-6 bg-slate-200 rounded w-12 mx-auto"></div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="h-3 bg-slate-200 rounded w-24 mx-auto mb-3"></div>
                <div className="h-6 bg-slate-200 rounded w-12 mx-auto"></div>
              </div>
            </div>
          </div>
        )}

        {!loading && result && (
          <div role="status" aria-live="polite" className="mt-2">
            <div className="flex flex-col gap-4">
              <div className={`p-3 md:p-6 rounded-xl md:rounded-2xl border-2 flex items-center justify-between gap-2 md:gap-4 flex-wrap ${getSentimentColor(result[0].label)}`}>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-2xl md:text-4xl flex-shrink-0">{getSentimentEmoji(result[0].label)}</span>
                  <div>
                    <p className="text-sm font-bold opacity-80 uppercase tracking-wide">Dominant Sentiment</p>
                    <p className="text-xl md:text-3xl font-display font-bold truncate">{getDisplayLabel(result[0].label)}</p>
                  </div>
                </div>
                <div className="text-right w-auto ml-auto">
                  <p className="text-2xl md:text-3xl font-bold">{(result[0].score * 100).toFixed(1)}%</p>
                  <p className="text-xs font-medium opacity-70">Confidence</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mt-2">
                {result.slice(1).map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-xs font-medium text-slate-500 mb-1">{getDisplayLabel(item.label)}</p>
                    <p className="text-lg font-bold text-slate-700">{(item.score * 100).toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
