// Components
import FirstComponent from "./components/FirstComponent";
import TemplateExpessions from "./components/TemplateExpressions";
import Events from "./components/Events";

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
      <Events />
    </div>
  );
}

export default App;
