import '../index.css';
import { Link } from "react-router-dom";


export default function KinstaBackground() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Base gradient layer - dark navy to deep purple */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0b15 0%, #0c0d19 20%, #121327 45%, #181337 70%, #1e153c 100%)'
        }}
      />
      
      {/* Orange glow at bottom - the signature Kinsta look */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 120%, rgba(255, 135, 80, 0.65) 0%, rgba(255, 110, 60, 0.45) 25%, rgba(255, 90, 50, 0.22) 45%, rgba(20, 10, 20, 0) 75%)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Subtle noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Content area */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 md:px-6 text-center font-['Poppins']">

  {/* MAIN CONTENT */}
  <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-0">

    {/* Heading */}
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 max-w-3xl md:max-w-4xl leading-tight px-2">
      Learn Faster With a Noise-Free You
      <span className="font-['Playfair']">T</span>ube Experience
    </h1>

    {/* Subtext */}
    <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-xl sm:max-w-2xl px-3">
      Add your playlist. Hit play. Learn in a smooth, minimal space designed to keep you completely focused.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none">
      <Link to="/product" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-semibold rounded-lg transition-colors">
          Get Started Free
        </button>
      </Link>

      <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg border-2 border-white/20 hover:border-white/40 transition-all">
        Learn More
      </button>
    </div>

    {/* Watch Demo Button */}
    <button className="mt-8 sm:mt-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
        </svg>
      </div>
      <span className="text-sm sm:text-base">Watch demo</span>
    </button>
  </div>

  {/* FOOTER */}
  <footer className="py-6 text-white opacity-80 text-sm sm:text-base">
    Made With ❤️ by Pratham
  </footer>

</div>
    </div>
  );
}