import Header from './components/Header'
import Footer from './components/Footer'
import Principal from './components/Principal'
import AboutProject from './components/AboutProject'
import Members from './components/Members'  
import Faq from './components/Faq'
import Contact from './components/Contact'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Solution from './pages/Solution'
import BetaSolution from './pages/BetaSolution'
import FaqPage from './pages/FaqPage'
import About from './pages/About'
import ScrollToTop from './components/ScrollToTop'
import Member from './components/Members'
import FaqAnswer from './components/FaqAnswer'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import PacienteForm from './pages/PacienteForm'
import MedicoForm from './pages/MedicoForm'
import ConsultaForm from './pages/ConsultaForm'
import AtualizarPacienteForm from './pages/AtualizarPacienteForm'
import AtualizarMedicoForm from './pages/AtualizarMedicoForm'
import AtualizarConsultaForm from './pages/AtualizarConsulta'
import ListaPacientes from './pages/ListaPacientes'
import ListaMedicos from './pages/ListaMedicos'
import ListaConsultas from './pages/ListaConsultas'
import ExcluirPaciente from './pages/ExcluirPaciente'
import ExcluirMedico from './pages/ExcluirMedico'
import ExcluirConsulta from './pages/ExcluirConsulta'
import PrivateRoute from './components/PrivateRoute'
import { ToastProvider } from './contexts/ToastContext'

function App() {
  return (
    <ToastProvider>
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
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/solution" element={<Solution />} />
      <Route path="/betasolution" element={<BetaSolution />} />
      <Route path="/faqpage" element={<FaqPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq/:slug" element={<FaqAnswer />} />
      <Route path="/members/:id" element={<Member />} />

      {/* Rotas privadas - requerem autenticação */}
      <Route element={<PrivateRoute />}>
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
      </Route>
      {/* Rota de fallback - Redireciona para home se não encontrar a rota */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </ToastProvider>
  )
}

export default App