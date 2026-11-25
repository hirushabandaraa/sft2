import { useState } from 'react';
import { ChevronDown, FlaskConical, MessageSquare, Send, Youtube } from 'lucide-react';
import { FAQ_ITEMS } from '../data/sftData';

interface FaqFooterProps {
  onOpenChannelModal: (channel: 'whatsapp' | 'telegram') => void;
}

export function FaqFooter({ onOpenChannelModal }: FaqFooterProps) {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  return (
    <>
      {/* 8. Frequently Asked Questions */}
      <section id="faq" className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-semibold text-electric-blue tracking-wide">
              QUESTIONS
            </span>
            <h2 className="font-headline text-[26px] leading-[34px] lg:text-[32px] lg:leading-[40px] font-bold tracking-tight text-light-on-surface">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-light-surface-bright rounded-lg border border-light-outline-variant/60 shadow-sm"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left font-body text-base font-semibold text-light-on-surface cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-electric-blue shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 font-body text-[15px] leading-6 text-light-on-surface-variant">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer
        id="contact"
        className="bg-light-inverse-surface text-light-inverse-on-surface pt-14 pb-10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-md bg-light-primary-container text-white flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="font-headline text-lg font-semibold text-light-inverse-on-surface">
                  Hirusha Bandara | A/L SFT
                </span>
              </div>
              <p className="font-body text-[13px] leading-5 text-light-outline-variant max-w-sm text-pretty">
                Sri Lanka&apos;s structured Advanced Level Science for Technology learning platform
                combining theory mastery, past paper discussions, and weekly progress tracking.
              </p>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2.5">
              <h4 className="text-sm font-semibold text-light-inverse-on-surface">Quick Links</h4>
              <nav aria-label="Footer Quick Links" className="flex flex-col gap-1.5">
                <a
                  href="#results"
                  className="text-[13px] text-light-outline-variant hover:text-white transition-colors"
                >
                  Results Telemetry
                </a>
                <a
                  href="#method"
                  className="text-[13px] text-light-outline-variant hover:text-white transition-colors"
                >
                  Year Plan Method
                </a>
                <a
                  href="#recordings"
                  className="text-[13px] text-light-outline-variant hover:text-white transition-colors"
                >
                  Class Recordings
                </a>
                <a
                  href="#timetable"
                  className="text-[13px] text-light-outline-variant hover:text-white transition-colors"
                >
                  Class Timetable
                </a>
              </nav>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2.5">
              <h4 className="text-sm font-semibold text-light-inverse-on-surface">
                Student Channels
              </h4>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenChannelModal('whatsapp')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-success-container text-on-success-container text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Channel</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChannelModal('telegram')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-light-primary-container text-white text-sm font-semibold hover:bg-light-primary transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Telegram Group</span>
                </button>
                <a
                  href="https://www.youtube.com/@HirushaBandara-wt7eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-white/10 text-light-inverse-on-surface border border-light-outline-variant/30 text-sm font-semibold hover:bg-white/20 transition-colors whitespace-nowrap"
                >
                  <Youtube className="w-4 h-4 text-energetic-cyan" aria-hidden="true" />
                  <span>YouTube Channel</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-light-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-light-outline-variant">
            <p className="text-[13px]">© 2026 HIRUSHA BANDARA · A/L SCIENCE FOR TECHNOLOGY</p>
            <p className="font-mono text-xs">ISLAND-WIDE ONLINE &amp; PHYSICAL</p>
          </div>
        </div>
      </footer>
    </>
  );
}
