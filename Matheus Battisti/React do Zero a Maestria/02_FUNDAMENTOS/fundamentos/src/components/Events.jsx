const Events = () => {
  const handleClick = () => {
    console.log("O botão foi clicado!");
  };
  return (
    <>
      <h2>Eventos em React</h2>
      <button onClick={handleClick}>Clique aqui!</button>
    </>
  );
};

export default Events;
