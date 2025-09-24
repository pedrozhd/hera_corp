const BetaSolution = () => {
    return (
      <main className="betasolution">
        <section className="container__cima">
          <h1>Olá, Sr. Marcili!</h1>
          <button className="button__consulta">
            <span>Iniciar Consulta</span>
            <img
              src="/Images/Natural User Interface.png"
              alt="Imagem de clique"
              height={60}
            />
          </button>
        </section>
  
        <section className="container__baixo">
          <div className="container__video">
            {/* Adicione o vídeo aqui (iframe ou player) */}
            <p>Vídeo de como acessar a consulta em 20 segundos!</p>
          </div>
        </section>
      </main>
    );
  };
  
  export default BetaSolution;