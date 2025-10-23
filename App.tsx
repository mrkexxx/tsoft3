
import React, { useState, useEffect } from 'react';
import { useCountdown } from './hooks/useCountdown';
import GiftBox from './components/GiftBox';
import CountdownTimer from './components/CountdownTimer';
import VoucherDisplay from './components/VoucherDisplay';
import PrizeDisplay from './components/PrizeDisplay';

const App: React.FC = () => {
  // --- Hộp quà 9h sáng ---
  const [targetDate9AM] = useState(() => {
    const now = new Date();
    const target = new Date(now.getTime());
    
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday
    const targetDay = 1; // Monday

    let daysToAdd = (targetDay - currentDay + 7) % 7;
    
    // Set target time to 9:00:00 for comparison
    const targetTimeToday = new Date(now.getTime());
    targetTimeToday.setHours(9, 0, 0, 0);

    // If today is Monday and it's already past 9 AM, target next week's Monday.
    if (daysToAdd === 0 && now.getTime() > targetTimeToday.getTime()) {
      daysToAdd = 7;
    }
    
    target.setDate(now.getDate() + daysToAdd);
    target.setHours(9, 0, 0, 0);

    return target;
  });

  const [days9AM, hours9AM, minutes9AM, seconds9AM] = useCountdown(targetDate9AM);
  const isTimeUp9AM = days9AM + hours9AM + minutes9AM + seconds9AM <= 0;


  // --- Hộp quà đặc biệt hàng tháng ---
  const now = new Date();
  
  // Define opening and closing times for this month
  const openTimeThisMonth = new Date(now.getFullYear(), now.getMonth(), 11, 23, 23, 0, 0);
  const closeTimeThisMonth = new Date(openTimeThisMonth.getTime() + 5 * 60 * 1000);

  // Determine the current state of the gift box
  const isCurrentlyOpen = now.getTime() >= openTimeThisMonth.getTime() && now.getTime() < closeTimeThisMonth.getTime();
  // Show "Expired" only on the 11th after the window closes. On other days, show countdown.
  const hasExpiredForToday = now.getDate() === 11 && now.getTime() >= closeTimeThisMonth.getTime();

  // Determine the target date for the countdown timer
  let countdownTarget;
  if (now.getTime() < openTimeThisMonth.getTime()) {
    // If it's before this month's opening time
    countdownTarget = openTimeThisMonth;
  } else {
    // If it's during or after this month's opening time, target next month
    const openTimeNextMonth = new Date(openTimeThisMonth);
    openTimeNextMonth.setMonth(openTimeThisMonth.getMonth() + 1);
    countdownTarget = openTimeNextMonth;
  }

  const [daysSpecial, hoursSpecial, minutesSpecial, secondsSpecial] = useCountdown(countdownTarget);


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"></div>
      
      <header className="text-center z-10 mb-8">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Hộp Quà Bí Ẩn
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          dành cho khách hàng của <span className="font-bold text-cyan-400">Tsoft</span>
        </p>
      </header>

      <main className="w-full max-w-5xl flex flex-col md:flex-row items-start justify-center gap-12 md:gap-16 z-10">
          {/* Cột 1: Hộp quà 9h sáng */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
              <GiftBox isOpen={isTimeUp9AM} />
              <p className="text-xl font-bold text-gray-200 h-14 flex items-center text-center">Mở lúc 9:00 Sáng Thứ Hai Hàng Tuần</p>
              <div className="w-full flex flex-col items-center text-center h-auto min-h-[20rem] justify-center">
                  {isTimeUp9AM ? (
                      <VoucherDisplay 
                        title="Chúc mừng bạn nhanh nhất!"
                        infoText="Đây là phần thưởng của bạn:"
                        code="VOICETOOLVIP" 
                        description="Bạn đã nhận được 1 Tool voice vĩnh viễn do Admin Tấn Văn tài trợ. Hãy copy mã này và liên hệ admin để nhận!"
                      />
                  ) : (
                      <>
                        <CountdownTimer days={days9AM} hours={hours9AM} minutes={minutes9AM} seconds={seconds9AM} />
                        <p className="mt-6 text-gray-300 text-center px-4">
                            Phần thưởng tuần này: 1 Tool voice do <span className="font-bold text-yellow-400">Admin Tấn Văn tài trợ</span> - HSD: Vĩnh Viễn
                            <br />
                            Nhanh tay copy và chia sẻ vào group để nhận! <span className="font-bold text-yellow-400">01 slot cho bạn nào</span> nhanh nhất
                        </p>
                      </>
                  )}
              </div>
          </div>

          {/* Cột 2: Hộp quà đặc biệt */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
              <GiftBox isOpen={isCurrentlyOpen} color="cyan" />
              <p className="text-xl font-bold text-gray-200 h-14 flex items-center text-center">Mở lúc 23:23 - Ngày 11 Hàng Tháng</p>
              <div className="w-full flex flex-col items-center text-center h-auto min-h-[20rem] justify-center">
                  {isCurrentlyOpen ? (
                      <PrizeDisplay />
                  ) : hasExpiredForToday ? (
                      <div className="flex flex-col items-center justify-center text-center">
                         <p className="text-2xl font-bold text-red-500">Đã hết hạn!</p>
                         <p className="mt-4 text-gray-300 px-4">Hộp quà tháng này đã đóng. Hẹn gặp bạn vào ngày 11 tháng sau!</p>
                      </div>
                  ) : (
                     <>
                          <CountdownTimer days={daysSpecial} hours={hoursSpecial} minutes={minutesSpecial} seconds={secondsSpecial} />
                          <p className="mt-6 text-gray-300 text-center px-4">
                              Phần thưởng: Full quy trình 3 video bật kiếm tiền độc quyền từ Tsoft.
                              <br/>
                              <span className="font-bold text-yellow-400">Lưu ý: Hộp quà chỉ mở trong 5 phút!</span>
                          </p>
                     </>
                  )}
              </div>
          </div>
      </main>

      <footer className="text-center text-gray-500 py-4 z-10 mt-auto">
        <p>&copy; {new Date().getFullYear()} Tsoft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
