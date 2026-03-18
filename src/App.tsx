/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Gift, 
  Music, 
  Camera, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Cake as CakeIcon,
  X,
  Volume2,
  VolumeX,
  BookOpen
} from 'lucide-react';

// --- Types ---
type Step = 'envelope' | 'message' | 'gallery' | 'cake' | 'final';

// --- Components ---

const FloatingBalloons = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: `${Math.random() * 100}vw` }}
          animate={{ 
            y: '-10vh',
            x: `${(Math.random() * 100)}vw`,
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute text-3xl"
          style={{ opacity: 0.2 }}
        >
          {['🎈', '✨', '💖', '⭐', '🎂', '🌸'][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}
    </div>
  );
};

const Envelope = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        className="relative cursor-pointer group"
        onClick={onOpen}
      >
        <div className="w-[85vw] max-w-[450px] h-[60vw] max-h-[300px] bg-rose-50 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border-2 border-rose-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          <div className="text-center p-4 sm:p-10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-block mb-4 sm:mb-8"
            >
              <Heart className="w-12 h-12 sm:w-20 h-20 text-rose-400 fill-rose-300" />
            </motion.div>
            <h2 className="font-cursive text-4xl sm:text-6xl text-rose-700 mb-2 sm:mb-4">Gửi bạn tui</h2>
            <p className="text-rose-400 font-medium italic text-sm sm:text-lg">Bấm vào để xem bất ngờ...</p>
          </div>
          
          {/* <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-100 origin-top transform transition-transform duration-700 group-hover:-rotate-x-180 z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} /> */}
        </div>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 sm:mt-10 text-rose-300 font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm"
      >
        Happy Birthday Celebration
      </motion.p>
    </div>
  );
};

const MessageSection = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="w-[90vw] max-w-xl mx-auto glass p-6 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] shadow-xl text-center relative overflow-hidden border-rose-50"
    >
      <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-48 h-48 bg-rose-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-48 h-48 bg-rose-100/40 rounded-full blur-3xl" />
      
      <h1 className="font-cursive text-5xl sm:text-7xl md:text-8xl text-rose-500 mb-6 sm:mb-10 leading-tight">Happy Birthday!</h1>
      
      <div className="space-y-4 sm:space-y-8 text-base sm:text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
        <p>
          Chúc mừng sinh nhật <b>ngungoc3</b>!
        </p>
        {/* <p className="hidden sm:block">
          Chúc cậu tuổi mới bớt lầy lội lại, nhưng vẫn luôn vui vẻ, yêu đời và đạt được mọi mục tiêu đã đề ra nhé. 
          Cảm ơn vì đã luôn đồng hành và chịu đựng tính nết của tớ bấy lâu nay!
        </p> */}
        <p className="sm:hidden">
          Chúc cậu tuổi mới rực rỡ, xinh đẹp và luôn hạnh phúc nhé!
        </p>
        <p className="font-cursive text-2xl sm:text-4xl text-rose-400 pt-2 sm:pt-6">
          "Mãi là bạn tốt của nhau nhé!"
        </p>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#f43f5e' }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mt-8 sm:mt-12 bg-rose-400 text-white px-8 py-3 sm:px-12 py-5 rounded-full font-bold shadow-md flex items-center gap-2 sm:gap-4 mx-auto transition-all text-sm sm:text-lg"
      >
        Lật mở kỷ niệm <BookOpen className="w-5 h-5 sm:w-6 h-6" />
      </motion.button>
    </motion.div>
  );
};

const PhotoBook = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const photos = [
    { url: '/pic1.jpg', caption: '' },
    { url: '/pic2.jpg', caption: ''},
    { url: '/pic3.jpg', caption: ''},
    { url: '/pic4.jpg', caption: ''},
    { url: '/pic5.jpg', caption: ''},
    { url: '/pic6.jpg', caption: ''},
  ];

  const next = () => {
    if (currentPage < photos.length - 1) setCurrentPage(currentPage + 1);
    else onNext();
  };

  const prev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
    else onBack();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4"
    >
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="font-cursive text-4xl sm:text-6xl text-rose-700 mb-1 sm:mb-3">Vài tấm ảnh nhé</h2>
        {/* <p className="text-rose-400 italic text-sm sm:text-lg">Trang {currentPage + 1} / {photos.length}</p> */}
      </div>

      <div className="relative w-[75vw] sm:w-[380px] md:w-[450px] aspect-[3/4] book-shadow rounded-r-2xl sm:rounded-r-[3rem] rounded-l-sm overflow-hidden bg-white border-l-4 sm:border-l-8 border-rose-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 origin-left"
          >
            <img 
              src={photos[currentPage].url} 
              alt={photos[currentPage].caption}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white text-center">
              <p className="font-cursive text-xl sm:text-3xl mb-1 sm:mb-2">{photos[currentPage].caption}</p>
              <div className="w-8 sm:w-10 h-0.5 bg-rose-400 mx-auto rounded-full" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
        <button 
          aria-label="Previous Page"
          onClick={prev} 
          className="p-3 sm:p-4 rounded-full glass hover:bg-rose-50 transition-colors group"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform" />
        </button>
        <button 
          aria-label="Next Page"
          onClick={next} 
          className="p-3 sm:p-4 rounded-full glass hover:bg-rose-50 transition-colors group"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const CuteCake = ({ onFinish }: { onFinish: () => void }) => {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [blownOut, setBlownOut] = useState(false);

  const toggleCandle = (index: number) => {
    if (!candlesLit[index]) return;
    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);
    
    if (newCandles.every(c => !c)) {
      setBlownOut(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ffb6c1', '#ffc0cb', '#fffaf0']
      });
      setTimeout(onFinish, 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center w-[90vw] max-w-xl mx-auto"
    >
      <h2 className="font-cursive text-4xl sm:text-6xl text-rose-700 mb-2 sm:mb-4">Ước một điều thật đẹp nhé!</h2>
      <p className="text-rose-400 mb-8 sm:mb-14 italic text-sm sm:text-lg">Chạm vào từng ngọn nến để thổi tắt</p>

      <div className="relative h-64 sm:h-96 flex flex-col items-center justify-end">
        {/* Cake Layers */}
        <div className="relative flex flex-col items-center scale-75 sm:scale-100 origin-bottom">
          {/* Candles */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex gap-6 sm:gap-10 z-20">
            {candlesLit.map((lit, i) => (
              <div key={i} className="relative cursor-pointer" onClick={() => toggleCandle(i)}>
                <div className="w-3 h-12 sm:w-5 h-20 bg-gradient-to-b from-pink-100 to-rose-200 rounded-full shadow-sm border border-white/40" />
                {lit && (
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.9, 1, 0.9],
                      y: [0, -3, 0],
                      rotate: [-3, 3, -3]
                    }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 w-4 h-7 sm:w-6 h-11 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full blur-[0.5px]"
                    style={{ 
                      clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)',
                      boxShadow: '0 0 15px #ff8c00'
                    }}
                  />
                )}
                {!lit && (
                  <motion.div 
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [1, 0], y: -20 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-gray-400 text-xs"
                  >
                    💨
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Top Layer */}
          <div className="w-44 sm:w-56 h-20 sm:h-24 cake-gradient rounded-t-[1.8rem] sm:rounded-t-[2.2rem] relative z-10 border-x border-t border-rose-100/50">
            <div className="absolute -bottom-2 left-0 w-full h-4 sm:h-5 flex justify-around px-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-5 sm:w-8 h-6 bg-white rounded-full frosting-drip" style={{ marginTop: `${Math.random() * 5}px` }} />
              ))}
            </div>
          </div>
          {/* Bottom Layer */}
          <div className="w-60 sm:w-72 h-24 sm:h-28 cake-gradient rounded-t-[2.5rem] sm:rounded-t-[3rem] border-b-4 border-rose-200 relative border-x border-rose-100/50">
             <div className="absolute -bottom-2 left-0 w-full h-4 sm:h-5 flex justify-around px-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-6 h-5 sm:w-8 h-6 bg-white rounded-full frosting-drip" style={{ marginTop: `${Math.random() * 5}px` }} />
              ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-around items-center px-4 sm:px-6 opacity-30">
              <Heart className="w-5 h-5 sm:w-6 h-6 text-white fill-current" />
              <Star className="w-5 h-5 sm:w-6 h-6 text-white fill-current" />
              <Heart className="w-5 h-5 sm:w-6 h-6 text-white fill-current" />
            </div>
          </div>
          {/* Plate */}
          <div className="w-72 sm:w-80 h-5 sm:h-6 bg-white rounded-full shadow-md border-b-2 border-gray-100 mt-[-2px]" />
        </div>
      </div>

      {blownOut && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 sm:mt-12 text-3xl sm:text-5xl font-cursive text-rose-500"
        >
          Chúc mừng sinh nhật cậu! ✨
        </motion.div>
      )}
    </motion.div>
  );
};

const FinalSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[90vw] max-w-lg mx-auto text-center space-y-6 sm:space-y-10 glass p-8 sm:p-12 rounded-[3rem] sm:rounded-[4rem] shadow-lg"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="inline-block"
      >
        <div className="relative">
          <Gift className="w-20 h-20 sm:w-28 h-28 text-rose-400 mx-auto" />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-0 left-0 w-full h-full text-rose-300"
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        </div>
      </motion.div>
      
      <h2 className="font-cursive text-5xl sm:text-7xl text-rose-500 leading-tight">Tuổi mới rực rỡ nhé!</h2>
      <p className="text-lg sm:text-2xl text-gray-500 font-medium italic">
        Hy vọng cậu đã có những giây phút thật vui vẻ (và bớt lầy lội hơn).
      </p>
      
      <div className="flex justify-center gap-6 sm:gap-10 pt-4 sm:pt-8">
        <motion.div whileHover={{ scale: 1.2 }} className="text-rose-300"><Heart className="w-8 h-8 sm:w-10 h-10 fill-current" /></motion.div>
        <motion.div whileHover={{ scale: 1.2 }} className="text-rose-300"><Star className="w-8 h-8 sm:w-10 h-10 fill-current" /></motion.div>
        <motion.div whileHover={{ scale: 1.2 }} className="text-rose-300"><Sparkles className="w-8 h-8 sm:w-10 h-10 fill-current" /></motion.div>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="text-rose-300 hover:text-rose-500 transition-colors text-xs sm:text-base font-bold tracking-widest uppercase pt-6 sm:pt-10"
      >
        Quay lại từ đầu
      </button>
    </motion.div>
  );
};

export default function App() {
  const [step, setStep] = useState<Step>('envelope');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setStep('message');
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fbcfe8', '#fda4af', '#fb7185']
    });
    // Try to play audio on interaction
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(e => console.log("Audio play failed", e));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafb] font-sans selection:bg-rose-100 selection:text-rose-800 overflow-hidden">
      <FloatingBalloons />
      
      {/* Background Music */}
      <audio 
        ref={audioRef}
        src="/Happy-Birthday-Beat.mp3" // Placeholder birthday-like upbeat song
        loop
      />

      <main className="relative z-10 h-screen flex items-center justify-center p-0">
        <AnimatePresence mode="wait">
          {step === 'envelope' && (
            <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <Envelope onOpen={handleOpen} />
            </motion.div>
          )}
          
          {step === 'message' && (
            <motion.div key="message" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 1.2 }}>
              <MessageSection 
                onNext={() => setStep('gallery')} 
              />
            </motion.div>
          )}
          
          {step === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
              <PhotoBook 
                onNext={() => setStep('cake')} 
                onBack={() => setStep('message')}
              />
            </motion.div>
          )}
          
          {step === 'cake' && (
            <motion.div key="cake" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }}>
              <CuteCake 
                onFinish={() => setStep('final')} 
              />
            </motion.div>
          )}
          
          {step === 'final' && (
            <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FinalSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Music Control */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className={`p-5 rounded-full shadow-2xl transition-all flex items-center justify-center ${isAudioPlaying ? 'bg-rose-400 text-white animate-pulse' : 'bg-white text-rose-400 border border-rose-100'}`}
        >
          {isAudioPlaying ? <Volume2 className="w-7 h-7" /> : <VolumeX className="w-7 h-7" />}
        </motion.button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
