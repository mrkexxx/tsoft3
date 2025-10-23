
import { useEffect, useState } from 'react';

export const useCountdown = (targetDate: Date): [number, number, number, number] => {
  const targetTime = targetDate.getTime();

  const [countDown, setCountDown] = useState(
    targetTime - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(targetTime - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetTime]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number): [number, number, number, number] => {
  if (countDown < 0) {
    return [0, 0, 0, 0];
  }
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};
