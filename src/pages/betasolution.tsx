import { useNavigate } from 'react-router-dom'

const BetaSolution = () => {
  const navigate = useNavigate()

  function iniciarConsulta() {
    // ...lógica antes
    navigate('/solution') // vai para solution depois da ação
  }

  return (
    <main className="betasolution">
      <section className="container__cima">
        <h1>Olá, Sr. Marcili!</h1>
        <button className="button__consulta" onClick={iniciarConsulta}>
          <span>Iniciar Consulta</span>
          {/* sua img aqui */}
        </button>
      </section>
    </main>
  )
}

export default BetaSolution
