import Header from './components/header'
import Footer from './components/footer'
import Principal from './components/principal'
import AboutProject from './components/aboutproject'
import Members from './components/members'  
import Faq from './components/faq'
import Contact from './components/contact'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Solution from './pages/solution'
import BetaSolution from './pages/betasolution'
import FaqPage from './pages/faqpage'
import About from './pages/about'
import ScrollToTop from './components/scrolltotop'
import Member from './components/members'
import FaqAnswer from './components/faqanswer'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/dashboard'
import PacienteForm from './pages/pacienteform'
import MedicoForm from './pages/medicoform'
import ConsultaForm from './pages/consultaform'
import AtualizarPacienteForm from './pages/atualizarpacienteform'
import AtualizarMedicoForm from './pages/atualizarmedicoform'
import AtualizarConsultaForm from './pages/atualizarconsulta'
import ListaPacientes from './pages/ListaPacientes'
import ListaMedicos from './pages/ListaMedicos'
import ListaConsultas from './pages/ListaConsultas'
import ExcluirPaciente from './pages/ExcluirPaciente'
import ExcluirMedico from './pages/ExcluirMedico'
import ExcluirConsulta from './pages/ExcluirConsulta'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Principal />
              <AboutProject />
              <Members />
              <Faq />
              <Contact />
            </>
          }
        />
      {/* Todas as rotas estão públicas temporariamente */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Principal />} />
      <Route path="/solution" element={<Solution />} />
      <Route path="/betasolution" element={<BetaSolution />} />
      <Route path="/faqpage" element={<FaqPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq/:slug" element={<FaqAnswer />} />
      <Route path="/members/:id" element={<Member />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/paciente/cadastrar" element={<PacienteForm />} />
      <Route path="/medico/cadastrar" element={<MedicoForm />} />
      <Route path="/consulta/cadastrar" element={<ConsultaForm />} />
      <Route path="/paciente/atualizar/:id" element={<AtualizarPacienteForm />} />
      <Route path="/medico/atualizar/:id" element={<AtualizarMedicoForm />} />
      <Route path="/consulta/atualizar/:id" element={<AtualizarConsultaForm />} />
      <Route path="/pacientes" element={<ListaPacientes />} />
      <Route path="/medicos" element={<ListaMedicos />} />
      <Route path="/consultas" element={<ListaConsultas />} />
      <Route path="/paciente/excluir/:id" element={<ExcluirPaciente />} />
      <Route path="/medico/excluir/:id" element={<ExcluirMedico />} />
      <Route path="/consulta/excluir/:id" element={<ExcluirConsulta />} />
      {/* Rota de fallback - Redireciona para login se não encontrar a rota */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App