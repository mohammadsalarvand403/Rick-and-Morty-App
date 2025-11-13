import { allCharacters } from "../data/data";
import "./App.css";
import CharecterDetil from "./components/CharecterDetil";
import CharecterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharecterList charecters={allCharacters} />
        <CharecterDetil />
      </div>
    </div>
  );
}

export default App;
