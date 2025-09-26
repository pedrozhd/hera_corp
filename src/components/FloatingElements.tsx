interface FloatingElementsProps {
  theme?: 'light' | 'dark'
  density?: 'low' | 'medium' | 'high'
}

const FloatingElements = ({ theme = 'light', density = 'low' }: FloatingElementsProps) => {
  const isDark = theme === 'dark'
  const elementCount = density === 'low' ? 3 : density === 'medium' ? 6 : 9

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: elementCount }).map((_, i) => (
        <div
          key={`circle-${i}`}
          className={`absolute rounded-full ${
            isDark 
              ? 'bg-blue-400 opacity-5' 
              : 'bg-blue-600 opacity-10'
          } animate-float`}
          style={{
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 4 + 4}s`,
          }}
        />
      ))}

      {density !== 'low' && (
        <>
          <div 
            className={`absolute text-2xl ${
              isDark ? 'text-blue-300 opacity-5' : 'text-blue-600 opacity-10'
            } animate-pulse-slow`}
            style={{
              top: '20%',
              left: '15%',
              animationDelay: '1s',
            }}
          >
            ⚕️
          </div>
          <div 
            className={`absolute text-xl ${
              isDark ? 'text-cyan-300 opacity-5' : 'text-cyan-600 opacity-10'
            } animate-bounce-slow`}
            style={{
              top: '70%',
              right: '20%',
              animationDelay: '2s',
            }}
          >
            🩺
          </div>
        </>
      )}
      {density === 'high' && (
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient id={`dotGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#3B82F6" : "#1E40AF"} />
              <stop offset="100%" stopColor={isDark ? "#06B6D4" : "#0891B2"} />
            </linearGradient>
          </defs>
          {Array.from({ length: 5 }).map((_, i) => (
            <circle
              key={`dot-${i}`}
              cx={`${Math.random() * 80 + 10}%`}
              cy={`${Math.random() * 80 + 10}%`}
              r="2"
              fill={`url(#dotGradient-${theme})`}
              className="animate-pulse-slow"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      )}
    </div>
  )
}

export default FloatingElements