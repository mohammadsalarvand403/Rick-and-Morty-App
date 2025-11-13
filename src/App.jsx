import { allCharacters, character, episodes } from "../data/data";
import "./App.css";
import CharecterDetil from "./components/CharacterDeteil";
import CharecterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharecterList charecters={allCharacters} />
        <CharecterDetil charecter={character} episodes={episodes} />
      </div>
    </div>
  );
}

export default App;
