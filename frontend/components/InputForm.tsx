interface InputFormProps {
  inputText: string;
  loading: boolean;
  error: string;
  onInputChange: (text: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  hasResult: boolean;
}

export default function InputForm({
  inputText,
  loading,
  error,
  onInputChange,
  onAnalyze,
  onClear,
  hasResult,
}: InputFormProps) {
  const shouldSpanFull = !loading && !hasResult;

  return (
    <div
      className={`bg-surface rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 w-full ${shouldSpanFull ? "lg:col-span-2 lg:max-w-2xl lg:mx-auto" : ""}`}
    >
      <div className="space-y-4">
        <label htmlFor="sentiment-input" className="block text-sm font-semibold text-slate-700 ml-1">
          Your Text
        </label>
        <textarea
          id="sentiment-input"
          rows={5}
          className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y text-base sm:text-lg text-slate-800 placeholder:text-slate-400"
          aria-label="Text to analyze"
          inputMode="text"
          style={{ minHeight: 120 }}
          placeholder="I'm feeling absolutely wonderful today!"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
        />

        <div className="flex flex-row justify-end gap-3">
          <button
            onClick={onAnalyze}
            disabled={loading || !inputText.trim()}
            type="button"
            aria-label="Analyze sentiment"
            className="w-1/2 md:w-auto px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
          <button
            onClick={onClear}
            disabled={!inputText.trim()}
            type="button"
            aria-label="Clear input"
            className="w-1/2 md:w-auto px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
