import AboutCard from '../components/AboutCard'
import nosTresImage from '../assets/nos_tres.jpg'

const About = () => {
  return (
    <main className="about">
      <AboutCard
        title="Sobre nós"
        description="Bem-vindo ao Hera Corporation, um projeto inovador desenvolvido para facilitar o acesso à
        saúde digital e melhorar a experiência de pacientes e profissionais do IMREA (Instituto de
        Medicina Física e Reabilitação do HC-FMUSP). O Hera nasceu com a missão de
        simplificar e humanizar o atendimento em teleconsultas, garantindo que pacientes tenham um
        acesso rápido, seguro e eficiente aos serviços de reabilitação e cuidados médicos. Juntos,
        estamos construindo um futuro onde a tecnologia e a saúde caminhem lado a lado para
        melhorar vidas."
        imageSrc={nosTresImage}
      />
    </main>
  )
}
  
export default About
