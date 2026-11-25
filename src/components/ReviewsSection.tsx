import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/sftData';

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="font-mono text-xs font-semibold text-electric-blue tracking-wide">
            STUDENT VOICES · REAL GRADES
          </span>
          <h2 className="font-headline text-[26px] leading-[34px] lg:text-[32px] lg:leading-[40px] font-bold tracking-tight text-light-on-surface">
            What Our A/L Students Say
          </h2>
          <p className="font-body text-[15px] leading-6 text-light-on-surface-variant text-pretty">
            Authentic results and feedback from Technology stream students across Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="bg-light-surface-bright rounded-lg p-6 border border-light-outline-variant/60 shadow-sm flex flex-col justify-between gap-4 h-full"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5 text-rating-star" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-success-container text-on-success-container text-xs font-semibold whitespace-nowrap">
                    {item.grade}
                  </span>
                </div>

                <p className="font-body text-[15px] leading-6 text-light-on-surface text-pretty">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <footer className="pt-3 border-t border-light-outline-variant/40 flex items-center gap-3">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-headline text-sm font-bold shrink-0 ${
                    item.avatarVariant === 'secondary'
                      ? 'bg-light-secondary-container text-light-on-secondary-container'
                      : 'bg-light-surface-container text-light-primary'
                  }`}
                >
                  {item.initial}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-light-on-surface">{item.name}</span>
                  <span className="text-xs text-light-on-surface-variant">
                    {item.school} · {item.district}
                  </span>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
