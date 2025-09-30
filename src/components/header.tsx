import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] flex justify-between items-center px-8 py-6 bg-white shadow-md">
      <h1 className="m-0 uppercase text-black font-bold text-xl group relative p-1">
        <Link to="/" className="inline-block transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:text-blue-600 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]">
          Hera Corp.
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-600 ease-out pointer-events-none"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-600 rounded-lg blur opacity-0 group-hover:opacity-15 transition-all duration-500 -z-10 pointer-events-none"></div>
        </Link>
      </h1>
      
      <nav className="hidden lg:block">
        <ul className="flex justify-end gap-8 list-none font-bold text-gray-600 p-0 m-0">
          <li className="relative cursor-pointer inline-block px-3 py-2 text-base transition-colors duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            <Link to="/">Início</Link>
          </li>
          <li className="relative cursor-pointer inline-block px-3 py-2 text-base transition-colors duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            <HashLink smooth to="/#sobre">Sobre</HashLink>
          </li>
          <li className="relative cursor-pointer inline-block px-3 py-2 text-base transition-colors duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            <HashLink smooth to="/#integrantes">Integrantes</HashLink>
          </li>
          <li className="relative cursor-pointer inline-block px-3 py-2 text-base transition-colors duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            <Link to="/faqpage">FAQ</Link>
          </li>
          <li className="relative cursor-pointer inline-block px-3 py-2 text-base transition-colors duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            <HashLink smooth to="/#solucao">Solução</HashLink>
          </li>
          <li className="relative cursor-pointer inline-block px-3 py-2 text-base transition-colors duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            <HashLink smooth to="/#contato">Contato</HashLink>
          </li>
        </ul>
      </nav>

      <button 
        className="lg:hidden p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded hover:bg-gray-100 transition-colors duration-200"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center relative">
          <div className={`w-5 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-4px]'
          }`}></div>
          <div className={`w-5 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}></div>
          <div className={`w-5 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${
            isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[4px]'
          }`}></div>
        </div>
      </button>

      <div className={`fixed top-0 left-0 w-full h-full bg-white flex-col items-center justify-center z-[1001] transition-all duration-300 lg:hidden ${isMenuOpen ? 'flex opacity-100 visible' : 'hidden opacity-0 invisible'}`}>
        <button 
          className="absolute top-5 right-5 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
        
        <aside className="w-4/5">
          <ul className="list-none p-0 w-full">
            <li className="py-4 border-b border-gray-200 text-center">
              <Link to="/" className="text-gray-600 text-lg block hover:text-blue-600" onClick={toggleMenu}>Início</Link>
            </li>
            <li className="py-4 border-b border-gray-200 text-center">
              <HashLink smooth to="/#sobre" className="text-gray-600 text-lg block hover:text-blue-600" onClick={toggleMenu}>Sobre</HashLink>
            </li>
            <li className="py-4 border-b border-gray-200 text-center">
              <HashLink smooth to="/#integrantes" className="text-gray-600 text-lg block hover:text-blue-600" onClick={toggleMenu}>Integrantes</HashLink>
            </li>
            <li className="py-4 border-b border-gray-200 text-center">
              <Link to="/faqpage" className="text-gray-600 text-lg block hover:text-blue-600" onClick={toggleMenu}>FAQ</Link>
            </li>
            <li className="py-4 border-b border-gray-200 text-center">
              <HashLink smooth to="/#solucao" className="text-gray-600 text-lg block hover:text-blue-600" onClick={toggleMenu}>Solução</HashLink>
            </li>
            <li className="py-4 border-b border-gray-200 text-center">
              <HashLink smooth to="/#contato" className="text-gray-600 text-lg block hover:text-blue-600" onClick={toggleMenu}>Contato</HashLink>
            </li>
          </ul>
        </aside>
      </div>
    </header>
  )
}

export default Header
