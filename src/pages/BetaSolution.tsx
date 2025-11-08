import { useNavigate } from 'react-router-dom'

const BetaSolution = () => {
  const navigate = useNavigate()

  function iniciarConsulta() {
    // ...lógica antes
    navigate('/solution') // vai para solution depois da ação
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Olá, Sr. Marcili!</h1>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8 flex items-center justify-center h-40">
          <h2 className="text-xl font-semibold text-blue-900">Add Vídeo</h2>
        </div>
        
        <button 
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg transition-all duration-200 shadow-sm hover:bg-blue-700 hover:translate-y-0.5 active:translate-y-0.5 focus:outline-2 focus:outline-blue-300 focus:outline-offset-2" 
          onClick={iniciarConsulta}
        >
          <span>Iniciar Consulta</span>
          {/* sua img aqui */}
        </button>
      </section>
    </main>
  )
}

export default BetaSolution
