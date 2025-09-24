const Header = () => {
    return (
        <header>
            <h1><a href="./index.html">Conecta Saúde</a></h1>
            <div className="menu_overlay">
                <button className="close_menu"> {/*<img src="../../Images/close.png" alt="imagem close menu" width="20px" height="20px">*/}</button>
                <aside className="menu_hidden">
                    <ul>
                        <li className="item_inicio"><a href="./index.html">Início</a></li>
                        <li className="item_sobre"><a href="#sobre">Sobre</a></li>
                        <li className="item_integrantes"><a href="#integrantes">Integrantes</a></li>
                        <li className="item_faq"><a href="#faq">FAQ</a></li>
                        <li className="item_solucao"><a href="#solucao">Solução</a></li>
                        <li className="item_contato"><a href="#contato">Contato</a></li>
                    </ul>
                </aside>
            </div>
            {/*<img src="../../Images/Menu (1).png" alt="menu hamburguer" className="menu__hamburguer">*/}
        </header>
    )
}

export default Header
