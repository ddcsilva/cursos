const Events = () => {
  return (
    <>
      <h2>Eventos em React</h2>
      <button onClick={handleClick}>Clique aqui!</button>
    </>
  );
};

const handleClick = () => {
  console.log("O botão foi clicado!");
};

export default Events;
