import { useEffect, useState } from 'react';
import { Check, Download, Pause, Play, RotateCcw, X } from 'lucide-react';
import { RecordingItem } from '../data/sftData';
import { ResilientImage } from './ResilientImage';

interface LessonPlayerModalProps {
  recording: RecordingItem | null;
  onClose: () => void;
}

function formatTime(totalSeconds: number) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function LessonPlayerModal({ recording, onClose }: LessonPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [tuteDownloaded, setTuteDownloaded] = useState(false);

  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    setTuteDownloaded(false);
  }, [recording?.id]);

  useEffect(() => {
    if (!recording || !isPlaying) return;
    const interval = window.setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= recording.durationSeconds) {
          setIsPlaying(false);
          return recording.durationSeconds;
        }
        return Math.min(recording.durationSeconds, prev + speed);
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [recording, isPlaying, speed]);

  if (!recording) return null;

  const progressPct =
    recording.durationSeconds > 0
      ? Math.min(100, (currentTime / recording.durationSeconds) * 100)
      : 0;

  const activeChapter =
    [...recording.chapters].reverse().find((c) => currentTime >= c.seconds) ||
    recording.chapters[0];

  const handleDownloadTute = () => {
    const summaryText = [
      `HIRUSHA BANDARA — A/L SCIENCE FOR TECHNOLOGY`,
      `Lesson: ${recording.title}`,
      `Resource: ${recording.tuteTitle}`,
      ``,
      `Key Equations & Formulas:`,
      ...recording.keyFormulas.map((f) => `  - ${f}`),
      ``,
      `Session Chapters:`,
      ...recording.chapters.map((c) => `  [${c.time}] ${c.title}`),
    ].join('\n');

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${recording.id}-study-notes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTuteDownloaded(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-player-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-light-surface-bright border border-light-outline-variant shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-light-outline-variant/60 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="font-mono text-xs font-semibold text-electric-blue">
              {recording.categoryLabel} · {recording.duration}
            </span>
            <h3
              id="lesson-player-title"
              className="font-headline text-lg font-bold text-light-on-surface truncate"
            >
              {recording.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close lesson player"
            onClick={onClose}
            className="w-10 h-10 rounded-md flex items-center justify-center text-light-on-surface-variant hover:bg-light-surface-container-low cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Player Stage */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-lg overflow-hidden bg-deep-navy aspect-video">
              <ResilientImage
                src={recording.imageUrl}
                alt={recording.imageAlt}
                className="w-full h-full object-cover opacity-90"
                fallbackTitle={recording.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/25 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-white/90">
                  <span className="font-semibold truncate pr-3">
                    Now Playing: {activeChapter?.title}
                  </span>
                  <span className="font-mono tabular-nums shrink-0">
                    {formatTime(currentTime)} / {recording.duration}
                  </span>
                </div>

                {/* Scrub Bar */}
                <input
                  type="range"
                  aria-label="Seek lesson timeline"
                  min={0}
                  max={recording.durationSeconds}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full accent-energetic-cyan cursor-pointer h-1.5"
                />

                {/* Controls */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-electric-blue text-white text-xs font-semibold hover:bg-light-primary transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Play</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTime(0);
                        setIsPlaying(true);
                      }}
                      aria-label="Restart lesson"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    {([1, 1.25, 1.5] as const).map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setSpeed(rate)}
                        className={`px-2 py-1 rounded text-xs font-mono font-semibold cursor-pointer ${
                          speed === rate
                            ? 'bg-energetic-cyan text-deep-navy'
                            : 'bg-white/15 text-white hover:bg-white/25'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-light-surface border border-light-outline-variant/60 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-light-on-surface">
                  {recording.tuteTitle}
                </p>
                <p className="text-xs text-light-on-surface-variant mt-0.5">
                  Includes worked examples, diagrams, and key equations
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadTute}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-light-primary-container text-white text-xs font-semibold hover:bg-light-primary transition-colors cursor-pointer whitespace-nowrap"
              >
                {tuteDownloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Notes Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Download Study Sheet</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Chapters & Formula Reference */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="font-mono text-xs font-semibold text-light-on-surface-variant">
                LESSON CHAPTERS ({Math.round(progressPct)}% WATCHED)
              </h4>
              <div className="flex flex-col gap-1.5">
                {recording.chapters.map((chapter) => {
                  const isCurrent = activeChapter?.time === chapter.time;
                  return (
                    <button
                      key={chapter.time}
                      type="button"
                      onClick={() => {
                        setCurrentTime(chapter.seconds);
                        setIsPlaying(true);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-md border text-sm transition-colors cursor-pointer flex items-center gap-3 ${
                        isCurrent
                          ? 'bg-light-surface-container border-electric-blue/50 text-light-on-surface font-semibold'
                          : 'bg-light-surface border-light-outline-variant/60 text-light-on-surface-variant hover:bg-light-surface-container-low'
                      }`}
                    >
                      <span className="font-mono text-xs text-electric-blue tabular-nums shrink-0">
                        {chapter.time}
                      </span>
                      <span className="truncate">{chapter.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-light-surface-container-low border border-light-outline-variant/60 flex flex-col gap-2.5">
              <h4 className="font-mono text-xs font-semibold text-light-on-surface-variant">
                KEY FORMULAS COVERED
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recording.keyFormulas.map((formula) => (
                  <div
                    key={formula}
                    className="px-3 py-2 rounded-md bg-light-surface-bright border border-light-outline-variant/50 font-mono text-xs text-light-on-surface"
                  >
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
