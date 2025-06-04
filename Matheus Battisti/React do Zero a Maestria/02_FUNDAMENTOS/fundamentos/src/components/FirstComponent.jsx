// Componente filho de App.jsx

import ChildComponent from "./ChildComponent";

const FirstComponent = () => {
  return (
    <div>
      <h2>Componente Pai</h2>
      <h3>Componente Filho (FirstComponent)</h3>
      <ChildComponent />
    </div>
  );
};

export default FirstComponent;
