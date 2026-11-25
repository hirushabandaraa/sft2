import { ArrowRight, MessageSquare, Send, X } from 'lucide-react';

interface ChannelModalProps {
  channel: 'whatsapp' | 'telegram' | null;
  onClose: () => void;
  onProceedToEnroll: () => void;
}

export function ChannelModal({ channel, onClose, onProceedToEnroll }: ChannelModalProps) {
  if (!channel) return null;

  const isWhatsApp = channel === 'whatsapp';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="channel-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-light-surface-bright border border-light-outline-variant shadow-xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                isWhatsApp
                  ? 'bg-success-container text-on-success-container'
                  : 'bg-light-surface-container text-light-primary'
              }`}
            >
              {isWhatsApp ? (
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Send className="w-5 h-5" aria-hidden="true" />
              )}
            </span>
            <div>
              <h3
                id="channel-modal-title"
                className="font-headline text-lg font-bold text-light-on-surface"
              >
                {isWhatsApp ? 'SFT WhatsApp Channel' : 'SFT Telegram Study Group'}
              </h3>
              <p className="font-mono text-xs text-light-on-surface-variant">
                2026 &amp; 2027 A/L Intake
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center text-light-on-surface-variant hover:bg-light-surface-container-low cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm leading-6 text-light-on-surface-variant">
          {isWhatsApp
            ? 'Weekly Zoom links, Unit PDF tutes, and term paper rank lists are dispatched directly to verified students via WhatsApp.'
            : 'Join daily MCQ discussions, formula quizzes, and peer Q&A with Hirusha Bandara’s SFT teaching team.'}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-light-outline-variant text-sm font-semibold text-light-on-surface hover:bg-light-surface-container-low cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onProceedToEnroll();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-light-primary-container text-white text-sm font-semibold hover:bg-light-primary cursor-pointer"
          >
            <span>Register for Invite</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
