import { Link } from 'react-router-dom'
import aboutImage from '../assets/image 2.png'
import FloatingElements from './FloatingElements'

const AboutProject = () => {
  return (
    <section className="flex items-center justify-between min-h-[600px] gap-8 px-5 py-16 bg-gradient-to-r from-gray-50 to-blue-50 mb-10 lg:flex-row lg:px-20 flex-col text-center lg:text-left relative overflow-hidden" id="sobre">
      <FloatingElements theme="light" density="medium" />
      <div className="flex-1 flex flex-col gap-4 ml-0 lg:ml-12 max-w-2xl">
        <p className="text-xl text-blue-600 font-semibold mb-2">Conectando</p>
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Sobre</h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          Bem-vindo ao ConectaSaúde, um projeto inovador desenvolvido para facilitar o acesso à
          saúde digital e melhorar a experiência de pacientes e profissionais do IMREA (Instituto de
          Medicina Física e Reabilitação do HC-FMUSP).
        </p>
        <Link 
          to="/about" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-sm hover:bg-blue-700 hover:-translate-x-1 active:translate-y-0.5 focus:outline-2 focus:outline-blue-300 focus:outline-offset-2 self-start"
        >
          Veja mais
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-md">
          <img 
            src={aboutImage} 
            alt="ConectaSaúde - Telemedicina" 
            className="w-full h-auto rounded-lg shadow-lg hover:transform hover:-translate-y-2 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutProject