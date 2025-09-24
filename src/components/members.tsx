const Members = () => {
    return (
        <section className="container-integrantes">
            <div className="integrantes-titulo">
                <p>Integrantes</p>
                <h2>Saiba quem está por trás de tudo isso</h2>
            </div>
            <div className="integrantes" id="integrantes">
                <div className="item">
                    {/*<img class="item-img" src="/Images/luizfoto.jpg" alt="">*/}
                    <h3>Luiz Gustavo Gonçalves</h3>
                    <p>RM: 564495</p>
                    <p>1TDSR</p>
                    <ul className="item-lista">
                        <li>
                            <a href="https://github.com/luizzggoncalves" target="_blank">
                                {/*<img class="icon-git" src="/Images/git.png" alt="">*/}
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/luiz-gon%C3%A7alves-0378a0205/" target="_blank">
                                {/*<img class="icon-linkedin" src="/Images/linkedin.png" alt="">*/}
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="item">
                    {/*<img className="item-img" src="/Images/pedrofoto.jpg" alt="">*/}
                    <h3>Pedro H. Dias França</h3>
                    <p>RM: 561940</p>
                    <p>1TDSR</p>
                    <ul className="item-lista">
                        <li>
                            <a href="https://github.com/pedrozhd" target="_blank">
                                {/*<img class="icon-git" src="/Images/git.png" alt="">*/}
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/pedrozhd/" target="_blank">
                                {/*<img class="icon-linkedin" src="/Images/linkedin.png" alt="">*/}
                            </a>
                            
                        </li>
                    </ul>
                </div>
                <div className="item">
                    {/*<img className="item-img" src="/Images/OlavoFoto.jpg" alt="">*/}
                    <h3>Olavo Porto Neves</h3>
                    <p>RM: 563558</p>
                    <p>1TDSR</p>
                    <ul className="item-lista">
                        <li>
                            <a href="https://github.com/olavoneves" target="_blank">
                                {/*<img class="icon-git" src="/Images/git.png" alt="">*/}
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/olavo-neves" target="_blank">
                                {/*<img class="icon-linkedin" src="/Images/linkedin.png" alt="">*/}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Members