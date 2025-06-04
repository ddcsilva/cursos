// Components
import FirstComponent from "./components/FirstComponent";
import TemplateExpessions from "./components/TemplateExpressions";

// Style
import "./App.css";

// Componente Pai
function App() {
  return (
    <div className="App">
      {/* Esta é a forma de comentar no JSX */}
      <h1>Fundamentos React</h1>
      <FirstComponent />
      <TemplateExpessions />
    </div>
  );
}

export default App;
