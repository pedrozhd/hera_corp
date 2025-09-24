import { Link } from 'react-router-dom'
import mockup from '../assets/mockup.png'

const Solution = () => {
  return (
    <main className="solution">
      <section className="telemedicina">
        <div className="imagem">
          <img src={mockup} alt="Sobre nós" />
        </div>
        <div className="texto">
          <h4>Sobre a solução</h4>
          <p>
            Nosso projeto visa facilitar o acesso às teleconsultas do IMREA para pacientes
            com dificuldades tecnológicas, como idosos ou pessoas com deficiência, por meio
            de mensangens via whatssap, porém usaremos telegram como demostração. Essas
            mensagens, já verificam as informações do paciente e já manda um link direto para
            a página da consulta.
          </p>
          <Link to="/betasolution" className="button__solucao">
            Veja a solução
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Solution