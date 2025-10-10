import { Link } from 'react-router-dom'
import mockup2 from '../assets/mockup2.png'

const Solution = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 flex justify-center">
          <img src={mockup2} alt="Sobre nós" className="max-w-full h-auto rounded-lg shadow-md" />
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
          <Link 
            to="/login" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-sm hover:bg-blue-700 hover:translate-y-0.5 active:translate-y-0.5 focus:outline-2 focus:outline-blue-300 focus:outline-offset-2"
          >
            Faça login para ver a solução
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Solution