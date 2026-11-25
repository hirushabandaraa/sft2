import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { METHOD_STEPS } from '../data/sftData';

interface MethodSectionProps {
  onExploreSchedule: () => void;
}

export function MethodSection({ onExploreSchedule }: MethodSectionProps) {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const visibleSteps = showAllSteps ? METHOD_STEPS : METHOD_STEPS.slice(0, 4);

  return (
    <section id="method" className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-mono text-xs font-semibold text-electric-blue tracking-wide">
              THE METHOD · YEAR PLAN
            </span>
            <h2 className="font-headline text-[26px] leading-[34px] lg:text-[32px] lg:leading-[40px] font-bold tracking-tight text-light-on-surface text-balance">
              From Day One to the Exam Hall — 7 Structured Steps
            </h2>
            <p className="font-body text-[15px] leading-6 text-light-on-surface-variant text-pretty">
              Every unit follows a disciplined cycle of conceptual clarity, timed problem solving,
              and weekly recall reinforcement.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAllSteps((prev) => !prev)}
            className="inline-flex items-center gap-2 self-start md:self-end px-4 py-2 rounded-md bg-light-surface-bright border border-light-outline-variant text-sm font-semibold text-light-on-surface hover:bg-light-surface-container-low transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{showAllSteps ? 'Show Core Steps (01–04)' : 'View All 7 Steps'}</span>
            {showAllSteps ? (
              <ChevronUp className="w-4 h-4 text-electric-blue" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-electric-blue" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {visibleSteps.map((item) => (
            <article
              key={item.step}
              className="bg-light-surface-bright rounded-lg p-6 border border-light-outline-variant/60 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold text-electric-blue">
                  {item.step}
                </span>
                <h3 className="font-headline text-lg font-semibold text-light-on-surface">
                  {item.title}
                </h3>
                <p className="font-body text-[13px] leading-5 text-light-on-surface-variant">
                  {item.description}
                </p>
              </div>
              <div className="pt-3 border-t border-light-outline-variant/40 font-mono text-xs text-light-on-surface-variant">
                {item.deliverable}
              </div>
            </article>
          ))}

          {showAllSteps && (
            <article className="bg-light-inverse-surface text-light-inverse-on-surface rounded-lg p-6 border border-light-outline-variant/40 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold text-energetic-cyan">
                  COMPLETE ROADMAP
                </span>
                <h3 className="font-headline text-lg font-semibold text-white">
                  Ready for the 2026 / 2027 Intake?
                </h3>
                <p className="font-body text-[13px] leading-5 text-light-outline-variant">
                  Reserve your seat for Colombo, Kandy, or Live Island-wide Zoom classes and get
                  Unit 01 Tute PDF immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={onExploreSchedule}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-electric-blue text-white text-sm font-semibold hover:bg-light-primary transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                <span>View Class Timetable</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
