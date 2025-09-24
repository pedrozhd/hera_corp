const Contact = () => {
    return (
        <section className="container-mensagem-contato" id="contato">
             <div className="mensagem">
                <p>Fale conosco</p>
                <h1 className="principal-mensagem">Estamos aqui para ajudar voc !</h1>
                <form className="campos-texto" action="">
                    <label htmlFor="fnome">Nome <span>*</span></label> <br />
                    <input type="text" id="fnome" name="fnome" className="fnome" /> <br />
                    <label htmlFor="femail">Email <span>*</span></label> <br />
                    <input type="email" id="femail" name="femail" className="femail" /> <br />
                    <label htmlFor="ftel">Telefone <span>*</span></label> <br />
                    <input type="tel" id="ftel" name="ftel" className="ftel" /> <br />
                    <label htmlFor="mensagem">Mensagem <span>*</span></label> <br />
                    <textarea name="mensagem" id="mensagem" maxLength={100} placeholder="Mensagem at  100 caracteres"></textarea> <br />
                    <button type="submit" className="texto-enviar">Enviar</button>
                 </form> 
            </div>
            <div className="contato-imagem">
                    <img src="/Images/caralegal-telefone.jpg" alt="Cidade" />
                    <p><strong>Nosso e-mail:</strong><br /> conectasaude@gmail.com.br</p>
                </div>
        </section>
    )
}

export default Contact