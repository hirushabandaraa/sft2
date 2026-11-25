import { useEffect, useRef, useState } from 'react';
import { ChannelModal } from './components/ChannelModal';
import { FaqFooter } from './components/FaqFooter';
import { HeroSection } from './components/HeroSection';
import { LessonPlayerModal } from './components/LessonPlayerModal';
import { MethodSection } from './components/MethodSection';
import { Navbar } from './components/Navbar';
import { RecordingsSection } from './components/RecordingsSection';
import { ResultsSection } from './components/ResultsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { StudentPortalModal } from './components/StudentPortalModal';
import { EnrollmentRecord, TimetableEnrollSection } from './components/TimetableEnrollSection';
import { RECORDINGS, RecordingItem } from './data/sftData';

const ENROLLMENT_STORAGE_KEY = 'hb_sft_enrollment_v1';

export default function App() {
  const [activeRecording, setActiveRecording] = useState<RecordingItem | null>(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const [channelModal, setChannelModal] = useState<'whatsapp' | 'telegram' | null>(null);
  const [enrollment, setEnrollment] = useState<EnrollmentRecord | null>(() => {
    try {
      const saved = window.localStorage.getItem(ENROLLMENT_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as EnrollmentRecord) : null;
    } catch {
      return null;
    }
  });

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveRecording(null);
        setPortalOpen(false);
        setChannelModal(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const scrollToEnrollment = () => {
    const el = document.getElementById('enroll');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  const scrollToTimetable = () => {
    const el = document.getElementById('timetable');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnrollSuccess = (record: EnrollmentRecord) => {
    setEnrollment(record);
    try {
      window.localStorage.setItem(ENROLLMENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore storage quota issues
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-light-on-surface">
      <Navbar
        onOpenPortal={() => setPortalOpen(true)}
        enrolledName={enrollment?.studentName}
      />

      <main className="flex-1">
        <HeroSection
          onJoinClass={scrollToEnrollment}
          onWatchSample={() => setActiveRecording(RECORDINGS[0])}
        />

        <ResultsSection />

        <MethodSection onExploreSchedule={scrollToTimetable} />

        <RecordingsSection onSelectRecording={(rec) => setActiveRecording(rec)} />

        <ReviewsSection />

        <TimetableEnrollSection
          nameInputRef={nameInputRef}
          onEnrollSuccess={handleEnrollSuccess}
          existingEnrollment={enrollment}
        />

        <FaqFooter onOpenChannelModal={(ch) => setChannelModal(ch)} />
      </main>

      <LessonPlayerModal
        recording={activeRecording}
        onClose={() => setActiveRecording(null)}
      />

      <StudentPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        enrollment={enrollment}
        onJumpToEnroll={scrollToEnrollment}
        onOpenRecording={(rec) => setActiveRecording(rec)}
      />

      <ChannelModal
        channel={channelModal}
        onClose={() => setChannelModal(null)}
        onProceedToEnroll={scrollToEnrollment}
      />
    </div>
  );
}
