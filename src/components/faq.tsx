import { Link } from 'react-router-dom'

const Faq = () => {
  return (
    <section className="container-faq" id="faq">
      <div className="faq-texto">
        <p className="faq-p">Perguntas frequentes</p>
        <h2>Está com dúvida?</h2>
        <p>Não se preocupe, clique no botão abaixo.</p>
        <Link to="/faqpage" className="btn-solucao">FAQ</Link>
      </div>
    </section>
  )
}

export default Faq