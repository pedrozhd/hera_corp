const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400 rounded-full opacity-15 animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-indigo-400 rounded-full opacity-15 animate-heartbeat"></div>
        
        <div className="absolute top-1/4 left-1/3 text-blue-300 opacity-10 text-6xl animate-spin-slow font-bold">+</div>
        <div className="absolute bottom-1/3 right-1/4 text-cyan-300 opacity-15 text-4xl animate-float font-bold">+</div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow">
          <div className="relative w-64 h-64">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-pulse-slow"
                style={{
                  top: `${50 + 35 * Math.sin((i * Math.PI) / 8)}%`,
                  left: `${50 + 35 * Math.cos((i * Math.PI) / 8)}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-25 animate-heartbeat"></div>
        <div className="absolute bottom-1/2 left-1/6 w-5 h-5 bg-indigo-400 rounded-full opacity-20 animate-float"></div>
        
        <div className="absolute top-16 right-1/4 w-8 h-8 border-2 border-blue-300 opacity-20 animate-spin transform rotate-45"></div>
        <div className="absolute bottom-1/4 left-16 w-6 h-6 border-2 border-cyan-300 opacity-25 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/6 w-10 h-10 border border-blue-400 opacity-15 animate-bounce-slow transform rotate-12"></div>
        
        <svg className="absolute inset-0 w-full h-full opacity-15">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse-slow" />
          <line x1="70%" y1="30%" x2="90%" y2="50%" stroke="url(#lineGradient2)" strokeWidth="1" className="animate-fade-in-out" />
          <line x1="20%" y1="70%" x2="40%" y2="90%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
          <line x1="60%" y1="60%" x2="80%" y2="80%" stroke="url(#lineGradient2)" strokeWidth="1" className="animate-fade-in-out" />
          <line x1="15%" y1="50%" x2="35%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse-slow" />
          <line x1="65%" y1="25%" x2="85%" y2="45%" stroke="url(#lineGradient2)" strokeWidth="1" className="animate-fade-in-out" />
        </svg>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80 h-20 opacity-25">
          <svg viewBox="0 0 300 60" className="w-full h-full">
            <path
              d="M0,30 L60,30 L65,15 L70,45 L75,30 L135,30 L140,15 L145,45 L150,30 L210,30 L215,15 L220,45 L225,30 L300,30"
              stroke="#06B6D4"
              strokeWidth="2"
              fill="none"
              className="animate-pulse-slow"
            />
          </svg>
        </div>
        
        <div className="absolute top-1/4 right-1/6 opacity-10">
          <div className="flex space-x-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-blue-400 animate-pulse-slow"
                style={{
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/30"></div>
    </div>
  )
}

export default AnimatedBackground
