const FaqPage = () => {
    return (
      <main className="faqpage">
        <h2>Bem-vindo ao nosso FAQ!</h2>
  
        <section className="container__faq">
          <h4>Como agendar a sua consulta?</h4>
          <p>
            Você pode agendar sua teleconsulta através do site ou aplicativo do IMREA, selecionando a
            especialidade desejada, o profissional disponível e um horário que atenda às suas necessidades.
            Após o agendamento, você receberá um e-mail ou mensagem com o link de acesso à consulta.
          </p>
        </section>
  
        <section className="container__faq">
          <h4>O que fazer se tiver problemas técnicos?</h4>
          <p>
            Caso enfrente dificuldades como falha de conexão ou áudio/vídeo, tente reiniciar o dispositivo
            ou reconectar-se à plataforma. Se o problema persistir, entre em contato com o suporte técnico
            do IMREA pelo e-mail/telefone ou utilize o chat de ajuda disponível no site/app.
          </p>
        </section>
  
        <section className="container__faq">
          <h4>Quais equipamentos ou preparos são necessários para a teleconsulta?</h4>
          <p>
            Você precisará de um dispositivo (celular, tablet ou computador) com câmera, microfone e
            acesso à internet. Recomendamos testar a conexão antes da consulta, fechar outros aplicativos
            para evitar lentidão e, se possível, estar em um ambiente tranquilo e bem iluminado.
          </p>
        </section>
      </main>
    )
  }
  
  export default FaqPage