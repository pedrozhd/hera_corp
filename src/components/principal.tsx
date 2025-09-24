import { Link } from 'react-router-dom'

const Principal = () => {
  return (
    <section className="container-solucao" id="solucao">
      <h1>Saúde em conexão</h1>
      <p>Clique no botão abaixo para saber mais</p>
      <Link to="/solution" className="btn-solucao">Solução</Link>
    </section>
  )
}

export default Principal