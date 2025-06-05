// Components
import SourceImage from "./components/SourceImage";

// Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Avançando em React</h1>
      <h2>Imagens Públicas</h2>
      <img src="/img1.jpg" alt="Paisagem" />
      <SourceImage />
    </div>
  );
}

export default App;
