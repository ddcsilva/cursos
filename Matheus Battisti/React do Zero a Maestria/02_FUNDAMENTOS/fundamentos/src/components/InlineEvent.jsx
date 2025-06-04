const InlineEvent = () => {
  return (
    <div>
      <h3>Funções Inline</h3>

      {/* Função nomeada tradicional */}
      <p>
        <button onClick={handleClick}>Clique com função nomeada</button>
      </p>

      {/* Função inline simples */}
      <p>
        <button onClick={() => console.log("Cliquei com função inline!")}>Clique com função inline</button>
      </p>
    </div>
  );
};

const handleClick = () => {
  console.log("O botão foi clicado!");
};

export default InlineEvent;
