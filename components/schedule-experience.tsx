'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const times = ['10:00', '12:30', '15:00', '17:30'];

export function ScheduleExperience() {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('12:30');
  const label = date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Choose a date';
  const subject = encodeURIComponent('Vivacity technical conversation');
  const body = encodeURIComponent(date ? `Preferred time: ${label} at ${time} IST\n\nWhat we are building:\n\nWhere the current stack stops:\n` : 'What we are building:\n\nWhere the current stack stops:\n');

  return <div className="schedule-experience">
    <div className="schedule-calendar">
      <span className="schedule-step">01 / DATE</span>
      <Calendar mode="single" selected={date} onSelect={setDate} disabled={{ before: new Date() }} className="schedule-calendar-ui" />
    </div>
    <div className="schedule-times">
      <span className="schedule-step">02 / TIME / IST</span>
      <div>{times.map(item => <button key={item} type="button" onClick={() => setTime(item)} aria-pressed={time === item}>{item}</button>)}</div>
    </div>
    <div className="schedule-confirm">
      <span className="schedule-step">03 / CONFIRM</span>
      <p>{label}</p><strong>{time} IST</strong>
      <a className="button button-light" href={`mailto:${siteConfig.email}?subject=${subject}&body=${body}`}>Send request <ArrowUpRight /></a>
      <small>This opens your email with the selected time and a short technical brief.</small>
    </div>
  </div>;
}
