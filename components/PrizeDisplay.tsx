
import React, { useState } from 'react';

const PrizeDisplay: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const prizeKey = 'TsoftBKT2024';

  const handleCopy = () => {
    navigator.clipboard.writeText(prizeKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in-up w-full max-w-sm flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
      <h2 className="text-xl font-bold text-green-400">Phần Quà Đặc Biệt!</h2>
      <p className="mt-2 text-gray-300 text-center">
        Full quy trình 3 video bật kiếm tiền độc quyền từ Tsoft.
      </p>
      <div className="my-4 p-4 w-full text-center border-2 border-dashed border-cyan-400 rounded-lg bg-cyan-400/10">
        <span className="block text-sm text-cyan-200">KEY KÍCH HOẠT</span>
        <span className="text-3xl font-black tracking-widest text-cyan-300 font-roboto-mono">{prizeKey}</span>
      </div>
      <ul className="text-sm text-left text-gray-400 mb-6 list-disc list-inside w-full">
        <li>Video 1: Xây dựng nền tảng.</li>
        <li>Video 2: Tối ưu hóa nội dung.</li>
        <li>Video 3: Chiến lược kiếm tiền.</li>
      </ul>
      <button
        onClick={handleCopy}
        className={`w-full px-6 py-3 text-lg font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          isCopied
            ? 'bg-green-600 text-white transform scale-105 focus:ring-green-400'
            : 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-400'
        }`}
      >
        {isCopied ? 'Đã sao chép Key!' : 'Sao chép Key'}
      </button>
    </div>
  );
};

export default PrizeDisplay;
