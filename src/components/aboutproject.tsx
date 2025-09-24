import { Link } from 'react-router-dom'

const AboutProject = () => {
  return (
    <section className="container-sobre" id="sobre">
      <div className="sobre-1">
        <p className="sobre-1-p ">Conectando </p>
        <h2>Sobre</h2>
        <p>
          Bem-vindo ao ConectaSaúde, um projeto inovador desenvolvido para facilitar o acesso à
          saúde digital e melhorar a experiência de pacientes e profissionais do IMREA (Instituto de
          Medicina Física e Reabilitação do HC-FMUSP).
        </p>
        <Link to="/about" className="btn-solucao">Veja mais</Link>
      </div>
      <div className="sobre-2">
        {/* <img src="../../Images/img-sobre-1.jpg" alt="" /> */}
      </div>
    </section>
  )
}

export default AboutProject