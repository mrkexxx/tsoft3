
import React, { useState } from 'react';

interface VoucherDisplayProps {
  code: string;
  title: string;
  description: string;
  infoText?: string;
}

const VoucherDisplay: React.FC<VoucherDisplayProps> = ({ code, title, description, infoText = 'Mã nhận thưởng của bạn:' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in-up w-full max-w-sm flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/50 shadow-2xl shadow-purple-500/20">
      <h2 className="text-xl font-bold text-green-400">{title}</h2>
      <p className="mt-2 text-gray-300">{infoText}</p>
      <div className="my-4 p-4 w-full text-center border-2 border-dashed border-yellow-400 rounded-lg bg-yellow-400/10">
        <span className="text-4xl font-black tracking-widest text-yellow-300 font-roboto-mono">{code}</span>
      </div>
      <p className="text-sm text-center text-gray-400 mb-6">
        {description}
      </p>
      <button
        onClick={handleCopy}
        className={`w-full px-6 py-3 text-lg font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          isCopied
            ? 'bg-green-600 text-white transform scale-105 focus:ring-green-400'
            : 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-400'
        }`}
      >
        {isCopied ? 'Đã sao chép!' : 'Sao chép mã'}
      </button>
    </div>
  );
};

export default VoucherDisplay;
