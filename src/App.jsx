import { useEffect, useState } from "react";
import "./App.css";
import CharecterDetil from "./components/CharacterDeteil";
import CharecterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import { toast } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharaters] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  useEffect(() => {
    async function FetcheData() {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        setCharaters(data.results.slice(0, 5));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoding(false);
      }
    }
    FetcheData();
  }, []);
  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main characters={characters}>
        <CharecterList characters={characters} isLoding={isLoding} />
        <CharecterDetil />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
