import { useState } from 'react';
import { CheckCircle2, Circle, Clock, ChevronRight, X } from 'lucide-react';
import { COHORT_RESULTS, SYLLABUS_UNITS } from '../data/sftData';

const BAR_POSITIONS = [86, 206, 326, 446, 546];
const CENTER_POSITIONS = [114, 234, 354, 474, 574];

export function ResultsSection() {
  const [cohortKey, setCohortKey] = useState<'2025' | '2024'>('2025');
  const [activeIndex, setActiveIndex] = useState<number>(4);
  const [showUnitsModal, setShowUnitsModal] = useState(false);

  const cohort = COHORT_RESULTS[cohortKey];
  const activePoint = cohort.points[activeIndex];

  // Chart coordinates: 0% is y=200, 90% is y=50 (150px height for 90% -> 1.6667 px per 1%)
  const getBarY = (val: number) => 200 - (val / 90) * 150;
  const getBarHeight = (val: number) => (val / 90) * 150;

  const polylinePoints = cohort.points
    .map((pt, idx) => `${CENTER_POSITIONS[idx]},${getBarY(pt.average).toFixed(1)}`)
    .join(' ');

  return (
    <section
      id="results"
      className="py-12 lg:py-20 bg-light-surface-bright border-y border-light-outline-variant/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-mono text-xs font-semibold text-electric-blue tracking-wide">
              RESULTS TELEMETRY
            </span>
            <h2 className="font-headline text-[26px] leading-[34px] lg:text-[32px] lg:leading-[40px] font-bold tracking-tight text-light-on-surface text-balance">
              Measured Marks Improvement Across Term Tests
            </h2>
            <p className="font-body text-[15px] leading-6 text-light-on-surface-variant text-pretty">
              We track every student from Term 01 diagnostics through the final A/L mock exam with
              structured paper-marking feedback.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-success-container text-on-success-container font-mono text-xs font-semibold whitespace-nowrap">
              {cohort.gainLabel}
            </span>

            <div
              role="group"
              aria-label="Select cohort year"
              className="inline-flex items-center gap-1 p-1 rounded-md bg-light-surface-container-low border border-light-outline-variant/60"
            >
              {(['2025', '2024'] as const).map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setCohortKey(yr)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                    cohortKey === yr
                      ? 'bg-light-surface-bright text-light-on-surface shadow-sm'
                      : 'text-light-on-surface-variant hover:text-light-on-surface'
                  }`}
                >
                  {yr} Cohort
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bar + Line Chart */}
          <div className="lg:col-span-8 bg-light-surface rounded-lg p-6 border border-light-outline-variant/60 shadow-sm flex flex-col justify-between gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-headline text-xl font-semibold text-light-on-surface">
                Average Marks Progression
              </h3>
              <span className="font-mono text-xs font-medium text-light-on-surface-variant">
                {cohort.label}
              </span>
            </div>

            <div className="w-full">
              <svg
                viewBox="0 0 640 240"
                className="w-full h-auto"
                role="img"
                aria-label={`Average SFT marks rising from ${cohort.points[0].average}% in Term 1 to ${cohort.points[4].average}% in Final Mock`}
              >
                <line x1="48" y1="200" x2="616" y2="200" stroke="#CBD5E1" strokeWidth="1" />
                <line
                  x1="48"
                  y1="150"
                  x2="616"
                  y2="150"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="48"
                  y1="100"
                  x2="616"
                  y2="100"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="48"
                  y1="50"
                  x2="616"
                  y2="50"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                <text
                  x="36"
                  y="204"
                  textAnchor="end"
                  fill="#64748B"
                  fontFamily="Spline Sans Mono, monospace"
                  fontSize="11"
                >
                  0%
                </text>
                <text
                  x="36"
                  y="154"
                  textAnchor="end"
                  fill="#64748B"
                  fontFamily="Spline Sans Mono, monospace"
                  fontSize="11"
                >
                  30%
                </text>
                <text
                  x="36"
                  y="104"
                  textAnchor="end"
                  fill="#64748B"
                  fontFamily="Spline Sans Mono, monospace"
                  fontSize="11"
                >
                  60%
                </text>
                <text
                  x="36"
                  y="54"
                  textAnchor="end"
                  fill="#64748B"
                  fontFamily="Spline Sans Mono, monospace"
                  fontSize="11"
                >
                  90%
                </text>

                {cohort.points.map((pt, idx) => {
                  const y = getBarY(pt.average);
                  const h = getBarHeight(pt.average);
                  const isSelected = idx === activeIndex;
                  return (
                    <g
                      key={pt.term}
                      className="cursor-pointer"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => setActiveIndex(idx)}
                    >
                      <rect
                        x={BAR_POSITIONS[idx]}
                        y={y}
                        width="56"
                        height={h}
                        rx="8"
                        fill={pt.color}
                        opacity={isSelected ? 1 : 0.85}
                      />
                      <text
                        x={CENTER_POSITIONS[idx]}
                        y={y - 12}
                        textAnchor="middle"
                        fill={idx === 4 ? '#004AC6' : '#0F172A'}
                        fontFamily="Spline Sans Mono, monospace"
                        fontSize={idx === 4 ? '13' : '12'}
                        fontWeight={idx === 4 || isSelected ? '700' : '600'}
                      >
                        {pt.average}%
                      </text>
                      <text
                        x={CENTER_POSITIONS[idx]}
                        y="224"
                        textAnchor="middle"
                        fill={idx === 4 || isSelected ? '#0F172A' : '#475569'}
                        fontFamily="Instrument Sans, sans-serif"
                        fontSize="12"
                        fontWeight={idx === 4 || isSelected ? '700' : '600'}
                      >
                        {pt.term}
                      </text>
                    </g>
                  );
                })}

                <polyline
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylinePoints}
                  className="pointer-events-none"
                />

                {cohort.points.map((pt, idx) => {
                  const y = getBarY(pt.average);
                  const isSelected = idx === activeIndex;
                  return (
                    <circle
                      key={`dot-${pt.term}`}
                      cx={CENTER_POSITIONS[idx]}
                      cy={y}
                      r={isSelected ? 6 : 5}
                      fill={idx === 4 || isSelected ? '#06B6D4' : '#FFFFFF'}
                      stroke="#0F172A"
                      strokeWidth="2.5"
                      className="pointer-events-none"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Interactive Term Breakdown Bar */}
            <div className="pt-3 border-t border-light-outline-variant/50 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-light-on-surface font-semibold">
                <span className="font-mono text-electric-blue">{activePoint.term}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">Total Avg: {activePoint.average}%</span>
              </div>
              <div className="flex items-center gap-4 text-light-on-surface-variant font-mono tabular-nums">
                <span>Part I (MCQ): {activePoint.mcqAvg} / 50</span>
                <span aria-hidden="true">·</span>
                <span>Part II (Essay): {activePoint.essayAvg} / 50</span>
              </div>
            </div>
          </div>

          {/* Circular Syllabus Completion */}
          <div className="lg:col-span-4 bg-light-surface rounded-lg p-6 border border-light-outline-variant/60 shadow-sm flex flex-col items-center justify-between gap-5 text-center">
            <div className="w-full text-left flex items-start justify-between gap-2">
              <div>
                <h3 className="font-headline text-xl font-semibold text-light-on-surface">
                  Syllabus Completion
                </h3>
                <p className="font-body text-[13px] text-light-on-surface-variant mt-0.5">
                  2026 A/L Theory Cohort Pace
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUnitsModal(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-electric-blue hover:text-light-primary cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>12 Units</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full -rotate-90"
                role="img"
                aria-label="85 percent syllabus completion"
              >
                <circle cx="80" cy="80" r="64" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                <circle
                  cx="80"
                  cy="80"
                  r="64"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="402.12"
                  strokeDashoffset="60.3"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline text-[32px] leading-9 font-bold text-light-on-surface tabular-nums">
                  85%
                </span>
                <span className="font-body text-xs font-semibold text-light-on-surface-variant mt-1">
                  10 / 12 Units
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 pt-3 border-t border-light-outline-variant/40 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-light-on-surface-variant">
                  Theory &amp; Practicals
                </span>
                <span className="font-mono text-sm font-medium text-light-on-surface">
                  On Track
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-light-on-surface-variant">Revision Buffer</span>
                <span className="font-mono text-sm font-medium text-electric-blue">3 Months</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Units Inspection Modal */}
      {showUnitsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="syllabus-modal-title"
          onClick={() => setShowUnitsModal(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-xl bg-light-surface-bright border border-light-outline-variant shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-light-outline-variant/60 flex items-center justify-between">
              <div>
                <h3
                  id="syllabus-modal-title"
                  className="font-headline text-lg font-bold text-light-on-surface"
                >
                  2026 A/L SFT Syllabus Progress (12 Units)
                </h3>
                <p className="text-xs text-light-on-surface-variant mt-0.5">
                  10 units completed · 1 unit active · 3-month revision buffer preserved
                </p>
              </div>
              <button
                type="button"
                aria-label="Close syllabus tracker"
                onClick={() => setShowUnitsModal(false)}
                className="w-9 h-9 rounded-md flex items-center justify-center text-light-on-surface-variant hover:bg-light-surface-container-low cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto divide-y divide-light-outline-variant/40">
              {SYLLABUS_UNITS.map((unit) => (
                <div key={unit.number} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {unit.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" aria-hidden="true" />
                    ) : unit.status === 'in-progress' ? (
                      <Clock className="w-5 h-5 text-electric-blue shrink-0" aria-hidden="true" />
                    ) : (
                      <Circle
                        className="w-5 h-5 text-light-outline shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-light-on-surface truncate">
                        {unit.number}: {unit.title}
                      </p>
                      <p className="font-mono text-xs text-light-on-surface-variant tabular-nums">
                        {unit.lessonsCount} studio sessions &amp; practical drills
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 ${
                      unit.status === 'completed'
                        ? 'bg-success-container text-on-success-container'
                        : unit.status === 'in-progress'
                          ? 'bg-light-surface-container text-light-primary'
                          : 'bg-light-surface-container-low text-light-on-surface-variant'
                    }`}
                  >
                    {unit.status === 'completed'
                      ? 'Completed'
                      : unit.status === 'in-progress'
                        ? 'In Progress'
                        : 'Scheduled'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
