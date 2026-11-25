import { FormEvent, RefObject, useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { TIMETABLE_ROWS } from '../data/sftData';

export interface EnrollmentRecord {
  studentName: string;
  batchYear: string;
  whatsapp: string;
  submittedAt: string;
}

interface TimetableEnrollSectionProps {
  nameInputRef: RefObject<HTMLInputElement | null>;
  onEnrollSuccess: (record: EnrollmentRecord) => void;
  existingEnrollment: EnrollmentRecord | null;
}

export function TimetableEnrollSection({
  nameInputRef,
  onEnrollSuccess,
  existingEnrollment,
}: TimetableEnrollSectionProps) {
  const [studentName, setStudentName] = useState(existingEnrollment?.studentName ?? '');
  const [batchYear, setBatchYear] = useState(
    existingEnrollment?.batchYear ?? '2026 A/L Theory'
  );
  const [whatsapp, setWhatsapp] = useState(existingEnrollment?.whatsapp ?? '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(Boolean(existingEnrollment));

  const getFormatTagClasses = (style: 'secondary' | 'primary' | 'success') => {
    if (style === 'success') return 'bg-success-container text-on-success-container';
    if (style === 'primary') return 'bg-light-surface-container text-light-primary';
    return 'bg-light-secondary-container text-light-on-secondary-container';
  };

  const handleSelectBatchRow = (batchValue: string) => {
    setBatchYear(batchValue);
    setSubmitted(false);
    nameInputRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = studentName.trim();
    const cleanedPhone = whatsapp.replace(/[\s-]/g, '');

    if (trimmedName.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!/^(?:\+94|0)?7[0-9]{8}$/.test(cleanedPhone)) {
      setErrorMsg('Enter a valid Sri Lankan WhatsApp number (e.g. 077 123 4567).');
      return;
    }

    const record: EnrollmentRecord = {
      studentName: trimmedName,
      batchYear,
      whatsapp: whatsapp.trim(),
      submittedAt: new Date().toLocaleDateString('en-LK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setSubmitted(true);
    onEnrollSuccess(record);
  };

  return (
    <section
      id="timetable"
      className="py-12 lg:py-20 bg-light-surface-bright border-y border-light-outline-variant/40"
    >
      <div id="enroll" className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="font-mono text-xs font-semibold text-electric-blue tracking-wide">
            CLASS SCHEDULE · 2026 / 2027
          </span>
          <h2 className="font-headline text-[26px] leading-[34px] lg:text-[32px] lg:leading-[40px] font-bold tracking-tight text-light-on-surface">
            Timetable &amp; Quick Registration
          </h2>
          <p className="font-body text-[15px] leading-6 text-light-on-surface-variant text-pretty">
            Physical classes in Colombo &amp; Kandy, paired with island-wide Live Zoom sessions and
            on-demand recordings. Click any batch row to pre-fill registration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Class Timetable */}
          <div className="lg:col-span-8">
            <div className="w-full overflow-x-auto bg-light-surface-bright rounded-lg border border-light-outline-variant/60 shadow-sm">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-light-outline-variant/60 bg-light-surface-container-low">
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-xs font-semibold text-light-on-surface-variant whitespace-nowrap"
                    >
                      Class Stream
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-xs font-semibold text-light-on-surface-variant whitespace-nowrap"
                    >
                      Day
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-xs font-semibold text-light-on-surface-variant whitespace-nowrap"
                    >
                      Time (SLST)
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-xs font-semibold text-light-on-surface-variant whitespace-nowrap"
                    >
                      Format
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-outline-variant/40">
                  {TIMETABLE_ROWS.map((row) => {
                    const isSelected = batchYear === row.batchValue;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => handleSelectBatchRow(row.batchValue)}
                        className={`cursor-pointer transition-colors duration-150 ${
                          isSelected
                            ? 'bg-light-surface-container/40'
                            : 'hover:bg-light-surface-container-low/60'
                        }`}
                      >
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-light-on-surface whitespace-nowrap">
                              {row.stream}
                            </span>
                            <span className="text-xs text-light-on-surface-variant whitespace-nowrap">
                              {row.centers}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-light-on-surface-variant whitespace-nowrap">
                          {row.day}
                        </td>
                        <td className="px-4 py-4 font-mono text-sm font-medium text-light-on-surface tabular-nums whitespace-nowrap">
                          {row.time}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${getFormatTagClasses(
                              row.formatStyle
                            )}`}
                          >
                            {row.format}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Registration Form */}
          <div className="lg:col-span-4">
            <div className="bg-light-surface-bright rounded-lg p-6 border border-light-outline-variant/60 shadow-sm flex flex-col gap-4">
              <header className="flex flex-col gap-1">
                <h3 className="font-headline text-xl font-semibold text-light-on-surface">
                  Quick Registration
                </h3>
                <p className="font-body text-[13px] leading-5 text-light-on-surface-variant">
                  Receive your Zoom link and Unit 01 Tute PDF on WhatsApp.
                </p>
              </header>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-light-on-surface">Student Name</span>
                  <input
                    ref={nameInputRef}
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (submitted) setSubmitted(false);
                    }}
                    placeholder="e.g. Kavindu Perera"
                    className="w-full px-4 py-3 rounded-md bg-light-surface-container-low border border-light-outline-variant text-sm text-light-on-surface placeholder:text-light-outline focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 focus:bg-light-surface-bright transition-colors"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-light-on-surface">Batch Year</span>
                  <select
                    value={batchYear}
                    onChange={(e) => {
                      setBatchYear(e.target.value);
                      if (submitted) setSubmitted(false);
                    }}
                    className="w-full px-4 py-3 rounded-md bg-light-surface-container-low border border-light-outline-variant text-sm text-light-on-surface focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 focus:bg-light-surface-bright transition-colors"
                  >
                    <option value="2026 A/L Theory">2026 A/L Theory</option>
                    <option value="2026 A/L Revision + Paper">2026 A/L Revision + Paper</option>
                    <option value="2027 A/L Theory">2027 A/L Theory</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-light-on-surface">
                    WhatsApp Number
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    value={whatsapp}
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                      if (submitted) setSubmitted(false);
                    }}
                    placeholder="077 123 4567"
                    className="w-full px-4 py-3 rounded-md bg-light-surface-container-low border border-light-outline-variant text-sm text-light-on-surface placeholder:text-light-outline focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 focus:bg-light-surface-bright transition-colors"
                  />
                </label>

                {errorMsg && (
                  <div
                    role="alert"
                    className="p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-light-primary-container text-white text-sm font-semibold hover:bg-light-primary transition-colors duration-150 shadow-sm cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                {submitted && (
                  <div
                    role="status"
                    className="p-3 rounded-md bg-success-container text-on-success-container text-xs font-medium flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>
                      Registration received for {batchYear}! Open Student Portal to access your
                      Unit 01 Tute &amp; Zoom link.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
