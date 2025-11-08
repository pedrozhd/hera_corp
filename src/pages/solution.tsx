import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import imageSolution from '../assets/image.png'
import { isAuthenticated } from '../services/authService'

const Solution = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated())
    }
    
    checkAuth()
    
    // Verifica a cada segundo se o estado mudou
    const interval = setInterval(checkAuth, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 flex justify-center">
          <img src={imageSolution} alt="Sobre nós" className="max-w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h4 className="text-2xl font-bold mb-4 text-blue-600">Sobre a solução</h4>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Nosso projeto visa facilitar o acesso às teleconsultas do IMREA para pacientes
            com dificuldades tecnológicas, como idosos ou pessoas com deficiência, por meio
            de mensangens via whatssap, porém usaremos telegram como demostração. Essas
            mensagens, já verificam as informações do paciente e já manda um link direto para
            a página da consulta.
          </p>
          {!isLoggedIn ? (
            <Link 
              to="/login" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-sm hover:bg-blue-700 hover:translate-y-0.5 active:translate-y-0.5 focus:outline-2 focus:outline-blue-300 focus:outline-offset-2"
            >
              Faça login para ver a solução
            </Link>
          ) : (
            <Link 
              to="/dashboard" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Acessar Dashboard
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}

export default Solution