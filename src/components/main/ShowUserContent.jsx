import React, { useContext, useState } from "react";
import { userAuth } from "../../context/StudyGuide";

function ShowUserContent() {
  const { userContentUrl } = useContext(userAuth);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedFrames, setLoadedFrames] = useState({});

  // Normalise: context may hold a single string or an array of strings/objects
  const items = !userContentUrl
    ? []
    : Array.isArray(userContentUrl)
    ? userContentUrl
    : [userContentUrl];

  const getUrl = (item) => (typeof item === "string" ? item : item?.fileUrl ?? "");
  const getLabel = (item, i) =>
    typeof item === "object" && item?.fileName
      ? item.fileName
      : `Document ${i + 1}`;

  const handleFrameLoad = (index) =>
    setLoadedFrames((prev) => ({ ...prev, [index]: true }));

  // ── Empty state ────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
          📭
        </div>
        <p className="text-gray-400 font-medium text-sm tracking-wide">
          No study materials available for this subject
        </p>
      </div>
    );
  }

  const activeUrl = getUrl(items[activeIndex]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-sm">
            📚
          </div>
          <span className="font-extrabold text-sm tracking-wide text-gray-900">
            Study Materials
          </span>
          <span className="text-[10px] font-semibold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
            {items.length} {items.length === 1 ? "file" : "files"}
          </span>
        </div>

        {/* Open in new tab */}
        {activeUrl && (
          <a
            href={activeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-violet-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-violet-50 border border-transparent hover:border-violet-100"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in new tab
          </a>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar tab list (only when > 1 file) ─────────────── */}
        {items.length > 1 && (
          <aside className="w-56 shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto py-4 px-3 gap-1">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2 px-1">
              Files
            </p>
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 group ${
                  activeIndex === i
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-transparent hover:border-gray-100"
                }`}
              >
                <span className={`text-base flex-shrink-0 ${activeIndex === i ? "" : "opacity-60"}`}>
                  📄
                </span>
                <span className="truncate font-medium text-xs">{getLabel(item, i)}</span>
              </button>
            ))}
          </aside>
        )}

        {/* ── PDF viewer area ────────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-100 p-4 gap-4">
          {items.length === 1 ? (
            /* Single file — full height viewer */
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
              {!loadedFrames[0] && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
                  <svg className="w-7 h-7 animate-spin text-violet-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <p className="text-xs text-gray-400 font-medium">Loading document…</p>
                </div>
              )}
              <iframe
                src={getUrl(items[0])}
                onLoad={() => handleFrameLoad(0)}
                className="w-full h-full border-none"
                title="PDF Viewer"
              />
            </div>
          ) : (
            /* Multi-file — show active tab's iframe */
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
              {!loadedFrames[activeIndex] && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
                  <svg className="w-7 h-7 animate-spin text-violet-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <p className="text-xs text-gray-400 font-medium">Loading document…</p>
                </div>
              )}
              <iframe
                key={activeIndex}
                src={activeUrl}
                onLoad={() => handleFrameLoad(activeIndex)}
                className="w-full h-full border-none"
                title={`PDF Viewer ${activeIndex + 1}`}
              />
            </div>
          )}

          {/* ── Bottom pagination (multi-file) ──────────────────── */}
          {items.length > 1 && (
            <div className="shrink-0 flex items-center justify-between px-2">
              <button
                onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
                disabled={activeIndex === 0}
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full transition-all duration-200 ${
                      activeIndex === i
                        ? "w-5 h-2 bg-violet-600"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveIndex((p) => Math.min(items.length - 1, p + 1))}
                disabled={activeIndex === items.length - 1}
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                Next
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ShowUserContent;