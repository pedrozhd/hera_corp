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

function App() {
  return (
    <BrowserRouter>
      <Header />
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
        <Route path="/solution" element={<Solution />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App