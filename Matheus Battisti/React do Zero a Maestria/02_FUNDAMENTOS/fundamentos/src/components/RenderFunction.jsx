const RenderFunction = () => {
  return (
    <div>
      <h2>Funcões de Renderização</h2>
      {renderMessage(true)}
      {renderMessage(false)}
    </div>
  );
};

function renderMessage(x) {
  if (x) {
    return <h3>Renderizou com TRUE</h3>;
  } else {
    return <h3>Renderizou com FALSE</h3>;
  }
}

export default RenderFunction;
