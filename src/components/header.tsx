import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Header = () => {
  return (
    <header>
      <h1><Link to="/">Hera Corp.</Link></h1>
      <div className="menu_overlay">
        <button className="close_menu">{/* <img src="../../Images/close.png" alt="imagem close menu" width="20px" height="20px" /> */}</button>
        <aside className="menu_hidden">
          <ul>
            <li className="item_inicio"><Link to="/">Início</Link></li>
            <li className="item_sobre"><HashLink smooth to="/#sobre">Sobre</HashLink></li>
            <li className="item_integrantes"><HashLink smooth to="/#integrantes">Integrantes</HashLink></li>
            <li className="item_faq"><HashLink smooth to="/#faq">FAQ</HashLink></li>
            <li className="item_solucao"><HashLink smooth to="/#solucao">Solução</HashLink></li>
            <li className="item_contato"><HashLink smooth to="/#contato">Contato</HashLink></li>
          </ul>
        </aside>
      </div>
      {/* <img src="../../Images/Menu (1).png" alt="menu hamburguer" className="menu__hamburguer" /> */}
    </header>
  )
}

export default Header
