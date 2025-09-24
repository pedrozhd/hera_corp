import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import Principal from './components/principal'
import AboutProject from './components/aboutproject'
import Members from './components/members'  
import Faq from './components/faq'
import Contact from './components/contact'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Solution from './pages/solution'
import BetaSolution from './pages/betasolution'
import FaqPage from './pages/faqpage'
import About from './pages/about'
import ScrollToTop from './components/scrolltotop'
import Member from './components/members'
import FaqAnswer from './components/faqanswer'

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
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App