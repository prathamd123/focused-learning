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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight font-semibold">
          Learn Faster With a Noise-Free You
           <span className="font-['Playfair']">T</span>
          ube Experience
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl">
          Add your playlist. Hit play. Learn in a smooth, minimal space designed to keep you completely focused.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/product">
          <button className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-semibold rounded-lg transition-colors">
            Get Started Free
          </button>
          </Link>
          <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg border-2 border-white/20 hover:border-white/40 transition-all">
            Learn More
          </button>
        </div>
        
        <button className="mt-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
          </div>
          <span>Watch demo</span>
        </button>
      </div>
    </div>
  );
}