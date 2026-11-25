import { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { RECORDINGS, RecordingCategory, RecordingItem } from '../data/sftData';
import { ResilientImage } from './ResilientImage';

type FilterTab = 'all' | RecordingCategory;

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'theory', label: 'Theory' },
  { id: 'revision', label: 'Revision' },
  { id: 'papers', label: 'Past Papers' },
  { id: 'moments', label: 'Moments of our classroom' },
];

interface RecordingsSectionProps {
  onSelectRecording: (recording: RecordingItem) => void;
}

export function RecordingsSection({ onSelectRecording }: RecordingsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const visibleRecordings = RECORDINGS.filter((item) =>
    activeFilter === 'all' ? item.category !== 'moments' : item.category === activeFilter
  );

  const getCategoryTagClasses = (style: RecordingItem['categoryStyle']) => {
    if (style === 'success') {
      return 'bg-success-container text-on-success-container';
    }
    if (style === 'primary') {
      return 'bg-light-surface-container text-light-primary';
    }
    return 'bg-light-secondary-container text-light-on-secondary-container';
  };

  return (
    <section
      id="recordings"
      className="py-12 lg:py-20 bg-light-surface-bright border-y border-light-outline-variant/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-mono text-xs font-semibold text-electric-blue tracking-wide">
              RECORDINGS ARCHIVE
            </span>
            <h2 className="font-headline text-[26px] leading-[34px] lg:text-[32px] lg:leading-[40px] font-bold tracking-tight text-light-on-surface">
              Class Recordings Library
            </h2>
            <p className="font-body text-[15px] leading-6 text-light-on-surface-variant text-pretty">
              Revisit any unit on demand with HD studio recordings, downloadable Tutes, and past
              paper walkthroughs.
            </p>
          </div>

          <div className="shrink-0 overflow-x-auto">
            <div
              role="tablist"
              aria-label="Filter class recordings"
              className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-md bg-light-surface-container-low border border-light-outline-variant/60"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3.5 py-2 rounded-sm text-sm font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-light-primary-container text-white shadow-sm'
                        : 'text-light-on-surface-variant hover:text-light-on-surface hover:bg-light-surface-bright'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {visibleRecordings.map((item) => (
            <article
              key={item.id}
              className="bg-light-surface rounded-lg p-4 border border-light-outline-variant/60 shadow-sm flex flex-col justify-between gap-4 h-full"
            >
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => onSelectRecording(item)}
                  aria-label={`Play ${item.title}`}
                  className={`group relative rounded-md overflow-hidden bg-light-inverse-surface text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${
                    item.isPortrait ? 'aspect-[9/16] max-h-96 mx-auto w-full' : 'aspect-video w-full'
                  }`}
                >
                  <ResilientImage
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    fallbackTitle={item.title}
                    fallbackSubtitle={item.categoryLabel}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/70 via-deep-navy/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-light-surface-bright/95 text-electric-blue shadow-md flex items-center justify-center transition-transform duration-150 group-hover:scale-105">
                      <PlayCircle className="w-6 h-6" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 inline-flex items-center px-2.5 py-1 rounded-sm bg-light-inverse-surface text-light-inverse-on-surface font-mono text-xs font-semibold tabular-nums">
                    {item.duration}
                  </span>
                </button>

                <header className="flex flex-col gap-1.5">
                  <span
                    className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${getCategoryTagClasses(
                      item.categoryStyle
                    )}`}
                  >
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-headline text-lg font-semibold text-light-on-surface">
                    {item.title}
                  </h3>
                  <p className="font-body text-[13px] leading-5 text-light-on-surface-variant">
                    {item.description}
                  </p>
                </header>
              </div>

              <footer>
                <button
                  type="button"
                  onClick={() => onSelectRecording(item)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-light-surface-container text-light-primary text-sm font-semibold hover:bg-light-surface-container-high transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  <PlayCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{item.isPortrait ? 'Watch Highlight' : 'Watch Recording'}</span>
                </button>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
