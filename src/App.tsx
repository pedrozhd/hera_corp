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
import PrivateRoute from './components/PrivateRoute'

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
        <Route path="/faq/:slug" element={<FaqAnswer />} />
        <Route path="/members/:id" element={<Member />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/betasolution" element={<BetaSolution />} />
        <Route path="/faqpage" element={<FaqPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/paciente/cadastrar" element={<PacienteForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/medico/cadastrar" element={<MedicoForm />} />
        <Route path="/consulta/cadastrar" element={<ConsultaForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App