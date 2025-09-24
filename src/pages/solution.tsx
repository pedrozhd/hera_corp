import { Link } from 'react-router-dom'

const Solution = () => {
    return (
        <body>
    <header>
        <h1><a href="./index.html">Conecta Saúde</a></h1>
        <div className="menu_overlay">
            <button className="close_menu">{/*<img src="../../Images/close.png" alt="imagem close menu" width="20px" height="20px">*/}</button>
            <aside className="menu_hidden">
                <ul>
                    <li className="item_inicio"><a href="./index.html">Início</a></li>
                    <li className="item_sobre"><a href="./sobre.html">Sobre</a></li>
                    <li className="item_integrantes"><a href="./index.html">Integrantes</a></li>
                    <li className="item_faq"><a href="./faq.html">FAQ</a></li>
                    <li className="item_solucao"><a href="./solucao.html">Solução</a></li>
                    <li className="item_contato"><a href="./index.html">Contato</a></li>
                </ul>
            </aside>
        </div>
        {/*<img src="../../Images/Menu (1).png" alt="menu hamburguer" className="menu__hamburguer">*/}
    </header>

    <main>
        <section className="telemedicina">
            <div className="imagem">
                <img src="../../Images/Rectangle 177.png" alt="Sobre nós"/>
            </div>
            <div className="texto">
                <h4>Sobre a solução</h4>
                <p>
                    Nosso projeto visa facilitar o acesso às teleconsultas do IMREA para pacientes com dificuldades tecnológicas, como idosos ou pessoas com deficiência, por meio de mensangens via whatssap, porém usaremos telegram como demostração. Essas mensagens, já verificam as informações do paciente e já manda um link direto para a página da consulta. 
                </p>
                <Link to="/betasolution" className="button__solucao">
                    Veja a solução
                </Link>
            </div>
        </section>
    </main>

    <footer className="rodape">
        <p>© 2025 Conecta Saúde — Transformando o acesso à saúde digital com inovação e cuidado.</p>
    </footer>

    <script src="../scripts/scripts.js"></script>
    <script src="../scripts/contato.js"></script>
    <script src="../scripts/menu.js"></script>
</body>
    )
}

export default Solution
