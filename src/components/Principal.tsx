import { Link } from 'react-router-dom'
import AnimatedBackground from './AnimatedBackground'

const Principal = () => {
  return (
    <section 
      className="w-full min-h-screen flex flex-col justify-center items-center px-[5%] py-[5vh] text-white relative overflow-hidden" 
      id="solucao"
    >
      <AnimatedBackground />
      
      <div className="z-10 text-center animate-slide-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-out">
          Saúde em conexão
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Clique no botão abaixo para saber mais
        </p>
        <Link 
          to="/solution" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:from-blue-700 hover:to-cyan-700 transform focus:outline-2 focus:outline-blue-300 focus:outline-offset-2 text-lg animate-heartbeat"
          style={{ animationDelay: '0.6s' }}
        >
          Solução
        </Link>
      </div>
      
      <div className="absolute top-1/4 left-10 text-white opacity-20 text-2xl animate-float">
        🏥
      </div>
      <div className="absolute top-1/3 right-16 text-white opacity-20 text-3xl animate-bounce-slow">
        💊
      </div>
      <div className="absolute bottom-1/4 left-1/4 text-white opacity-20 text-2xl animate-pulse-slow">
        🩺
      </div>
      <div className="absolute bottom-1/3 right-1/3 text-white opacity-20 text-2xl animate-float" style={{ animationDelay: '2s' }}>
        ⚕️
      </div>
    </section>
  )
}

export default Principal