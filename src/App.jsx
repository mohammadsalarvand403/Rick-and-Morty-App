import { useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharecterDetil from "./components/CharacterDeteil";
import CharecterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";

function App() {
  const [characters, setCharaters] = useState(allCharacters);
  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main characters={characters}>
        <CharecterList characters={characters} />
        <CharecterDetil />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
