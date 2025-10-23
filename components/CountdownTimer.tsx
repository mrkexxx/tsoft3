
import React from 'react';

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeCard: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white/10 rounded-lg backdrop-blur-sm shadow-lg">
      <span className="text-4xl md:text-5xl font-bold font-roboto-mono text-cyan-300">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="mt-2 text-sm uppercase tracking-widest text-gray-400">{label}</span>
  </div>
);


const CountdownTimer: React.FC<CountdownTimerProps> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      {days > 0 && (
        <>
          <TimeCard value={days} label="Ngày" />
          <span className="text-4xl font-bold text-gray-500">:</span>
        </>
      )}
      <TimeCard value={hours} label="Giờ" />
      <span className="text-4xl font-bold text-gray-500">:</span>
      <TimeCard value={minutes} label="Phút" />
      <span className="text-4xl font-bold text-gray-500">:</span>
      <TimeCard value={seconds} label="Giây" />
    </div>
  );
};

export default CountdownTimer;
