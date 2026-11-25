import { ArrowRight, Award, Globe, PlayCircle } from 'lucide-react';
import { HERO_KPIS, PORTRAIT_IMAGE_URL } from '../data/sftData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onWatchSample: () => void;
  onJoinClass: () => void;
}

export function HeroSection({ onWatchSample, onJoinClass }: HeroSectionProps) {
  return (
    <section id="home" className="pt-12 pb-12 lg:pt-16 lg:pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="font-mono text-xs font-semibold text-electric-blue tracking-wider">
              A/L Science for Technology · Hirusha Bandara
            </span>

            <h1 className="font-headline text-[32px] leading-[40px] lg:text-[48px] lg:leading-[56px] font-bold tracking-[-0.75px] text-light-on-surface text-balance">
              Master A/L Science for Technology with Clarity &amp; Confidence
            </h1>

            <p className="font-body text-lg leading-7 text-light-on-surface-variant max-w-prose text-pretty">
              Sri Lanka&apos;s structured SFT learning ecosystem — combining conceptual theory
              mastery, timed past paper discussions, and weekly assessment tracking for 2026 &amp;
              2027 A/L batches.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={onJoinClass}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-light-primary-container text-white text-sm font-semibold hover:bg-light-primary transition-colors duration-150 shadow-sm cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2"
              >
                <span>Join Next Live Class</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onWatchSample}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-light-surface-bright text-light-on-surface border border-light-outline-variant text-sm font-semibold hover:bg-light-surface-container-low transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2"
              >
                <PlayCircle className="w-4 h-4 text-electric-blue" aria-hidden="true" />
                <span>Watch Free Sample</span>
              </button>
            </div>
          </div>

          {/* Right Framed Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl bg-light-surface-bright p-3 border border-light-outline-variant/60 shadow-lg">
                <div className="rounded-xl overflow-hidden bg-light-surface-container-low aspect-[3/4]">
                  <ResilientImage
                    src={PORTRAIT_IMAGE_URL}
                    alt="Hirusha Bandara, A/L Science for Technology Lecturer"
                    className="w-full h-full object-cover object-top"
                    fallbackTitle="Hirusha Bandara"
                    fallbackSubtitle="A/L SFT Specialist · USJ Technology"
                  />
                </div>
              </div>

              {/* Floating Credential Card 1 */}
              <div className="absolute -top-4 -left-2 sm:-left-6 bg-light-surface-bright rounded-lg px-4 py-3 border border-light-outline-variant/60 shadow-lg flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-md bg-light-surface-container flex items-center justify-center text-electric-blue shrink-0">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-light-on-surface leading-tight whitespace-nowrap">
                    A/L SFT Specialist
                  </span>
                  <span className="text-xs font-medium text-light-on-surface-variant leading-tight whitespace-nowrap">
                    USJ Technology Graduate
                  </span>
                </div>
              </div>

              {/* Floating Credential Card 2 */}
              <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-light-surface-bright rounded-lg px-4 py-3 border border-light-outline-variant/60 shadow-lg flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-md bg-light-secondary-container flex items-center justify-center text-light-on-secondary-container shrink-0">
                  <Globe className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-light-on-surface leading-tight whitespace-nowrap">
                    Online &amp; Physical Classes
                  </span>
                  <span className="text-xs font-medium text-light-on-surface-variant leading-tight whitespace-nowrap">
                    20+ Districts Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Telemetry KPI Strip (4 Columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {HERO_KPIS.map((kpi) => {
            const valueColor =
              kpi.accent === 'primary'
                ? 'text-electric-blue'
                : kpi.accent === 'secondary'
                  ? 'text-light-secondary'
                  : 'text-light-on-surface';

            return (
              <div
                key={kpi.id}
                className="bg-light-surface-bright rounded-lg p-6 border border-light-outline-variant/60 shadow-sm flex flex-col gap-1.5"
              >
                <span className="font-mono text-xs font-semibold text-light-on-surface-variant tracking-wide">
                  {kpi.label}
                </span>
                <span
                  className={`font-headline text-[28px] leading-[36px] lg:text-[40px] lg:leading-[48px] font-bold tracking-tight tabular-nums ${valueColor}`}
                >
                  {kpi.value}
                </span>
                <span className="font-body text-[13px] leading-5 text-light-on-surface-variant">
                  {kpi.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
