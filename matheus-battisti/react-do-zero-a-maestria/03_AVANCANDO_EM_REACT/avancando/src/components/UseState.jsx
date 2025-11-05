import { useState } from "react";

const UseState = () => {
  let value = 10;
  const [newValue, setNewValue] = useState(10);

  const changeValue1 = () => {
    value = value * 3;
    console.log(value);
  };

  const changeValue2 = () => {
    setNewValue(newValue * 3);
  };

  return (
    <div>
      <div>
        <h2>Variável sem UseState</h2>
        <p>Valor: {value}</p>
        <button onClick={changeValue1}>Clique aqui para alterar</button>
      </div>
      <div>
        <h2>Variável com UseState</h2>
        <p>Valor: {newValue}</p>
        <button onClick={changeValue2}>Clique aqui para alterar</button>
      </div>
    </div>
  );
};

export default UseState;
