import { useState } from 'react';
import { Calendar, Check, Download, PlayCircle, TrendingUp, X } from 'lucide-react';
import { RECORDINGS, SYLLABUS_UNITS, RecordingItem } from '../data/sftData';
import { EnrollmentRecord } from './TimetableEnrollSection';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollment: EnrollmentRecord | null;
  onJumpToEnroll: () => void;
  onOpenRecording: (rec: RecordingItem) => void;
}

const WEEKLY_ASSESSMENTS = [
  { week: 'Week 08', topic: 'Rotational Dynamics & Torque', score: 84, avg: 68 },
  { week: 'Week 09', topic: 'Thermodynamics & Calorimetry', score: 78, avg: 65 },
  { week: 'Week 10', topic: 'Current Electricity & Kirchhoff', score: 88, avg: 71 },
  { week: 'Week 11', topic: 'Organic Reactions & Polymers', score: 91, avg: 74 },
];

export function StudentPortalModal({
  isOpen,
  onClose,
  enrollment,
  onJumpToEnroll,
  onOpenRecording,
}: StudentPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tutes' | 'assessments'>('overview');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const studentDisplayName = enrollment?.studentName || 'Guest Student (Preview)';
  const studentBatch = enrollment?.batchYear || '2026 A/L Theory';

  const handleDownloadUnitPack = (unitNumber: string, title: string) => {
    const content = [
      `HIRUSHA BANDARA — A/L SCIENCE FOR TECHNOLOGY`,
      `Student: ${studentDisplayName}`,
      `Batch: ${studentBatch}`,
      `Tute Pack: ${unitNumber} — ${title}`,
      ``,
      `Structured Summary & Recall Checklist included for weekly preparation.`,
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${unitNumber.toLowerCase().replace(/\s+/g, '-')}-tute-pack.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedIds((prev) => (prev.includes(unitNumber) ? prev : [...prev, unitNumber]));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-portal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-light-surface-bright border border-light-outline-variant shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-light-inverse-surface text-light-inverse-on-surface flex items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-energetic-cyan">
              SFT STUDENT PORTAL · {studentBatch}
            </span>
            <h3 id="student-portal-title" className="font-headline text-lg font-bold text-white">
              {studentDisplayName}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close Student Portal"
            onClick={onClose}
            className="w-9 h-9 rounded-md flex items-center justify-center text-light-outline-variant hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 border-b border-light-outline-variant/60 bg-light-surface-container-low flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" className="inline-flex items-center gap-1 p-1 rounded-md bg-light-surface-bright border border-light-outline-variant/60">
            {(
              [
                { id: 'overview', label: 'Class Overview' },
                { id: 'tutes', label: 'Unit Tutes (12)' },
                { id: 'assessments', label: 'Weekly Marks' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-light-primary-container text-white'
                    : 'text-light-on-surface-variant hover:text-light-on-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {!enrollment && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onJumpToEnroll();
              }}
              className="text-xs font-semibold text-electric-blue hover:underline cursor-pointer"
            >
              Register your name &amp; WhatsApp to personalize
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-light-surface border border-light-outline-variant/60">
                  <span className="font-mono text-xs text-light-on-surface-variant">
                    NEXT LIVE CLASS
                  </span>
                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-light-on-surface">
                    <Calendar className="w-4 h-4 text-electric-blue shrink-0" aria-hidden="true" />
                    <span>Saturday · 08:00 AM SLST</span>
                  </div>
                  <p className="text-xs text-light-on-surface-variant mt-1">
                    Unit 11: Industrial Chemistry &amp; Corrosion
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-light-surface border border-light-outline-variant/60">
                  <span className="font-mono text-xs text-light-on-surface-variant">
                    SYLLABUS PACE
                  </span>
                  <div className="mt-1 font-headline text-2xl font-bold text-electric-blue tabular-nums">
                    85% (10/12)
                  </div>
                  <p className="text-xs text-light-on-surface-variant mt-0.5">
                    3-month revision buffer secured
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-light-surface border border-light-outline-variant/60">
                  <span className="font-mono text-xs text-light-on-surface-variant">
                    RECENT MCQ AVG
                  </span>
                  <div className="mt-1 flex items-center gap-2 font-headline text-2xl font-bold text-success tabular-nums">
                    <span>85%</span>
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <p className="text-xs text-light-on-surface-variant mt-0.5">
                    +14% above cohort baseline
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-headline text-base font-semibold text-light-on-surface">
                  Recent Studio Recordings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {RECORDINGS.slice(0, 3).map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 rounded-lg bg-light-surface border border-light-outline-variant/60 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <span className="font-mono text-xs text-electric-blue">
                          {rec.categoryLabel} · {rec.duration}
                        </span>
                        <p className="text-sm font-semibold text-light-on-surface mt-1">
                          {rec.title}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenRecording(rec);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-light-surface-container text-light-primary text-xs font-semibold hover:bg-light-surface-container-high cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Open Player</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'tutes' && (
            <div className="divide-y divide-light-outline-variant/50 border border-light-outline-variant/60 rounded-lg bg-light-surface">
              {SYLLABUS_UNITS.map((unit) => {
                const isDownloaded = downloadedIds.includes(unit.number);
                return (
                  <div
                    key={unit.number}
                    className="px-4 py-3 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-light-on-surface truncate">
                        {unit.number}: {unit.title}
                      </p>
                      <p className="font-mono text-xs text-light-on-surface-variant">
                        {unit.lessonsCount} lessons · Theory + Structured Past Questions
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadUnitPack(unit.number, unit.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-light-surface-bright border border-light-outline-variant text-xs font-semibold text-light-on-surface hover:bg-light-surface-container-low cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isDownloaded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-electric-blue" aria-hidden="true" />
                          <span>Download Tute</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="flex flex-col gap-4">
              <div className="overflow-x-auto border border-light-outline-variant/60 rounded-lg bg-light-surface">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-light-surface-container-low border-b border-light-outline-variant/60">
                      <th className="px-4 py-3 text-xs font-semibold text-light-on-surface-variant">
                        Week
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-light-on-surface-variant">
                        Assessment Unit
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-light-on-surface-variant">
                        Your Score
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-light-on-surface-variant">
                        Cohort Avg
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-outline-variant/40">
                    {WEEKLY_ASSESSMENTS.map((row) => (
                      <tr key={row.week}>
                        <td className="px-4 py-3 font-mono text-xs text-light-on-surface-variant whitespace-nowrap">
                          {row.week}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-light-on-surface">
                          {row.topic}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm font-bold text-electric-blue tabular-nums">
                          {row.score}%
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-light-on-surface-variant tabular-nums">
                          {row.avg}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
