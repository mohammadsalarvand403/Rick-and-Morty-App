import { useEffect, useState } from "react";
import "./App.css";
import CharecterDetil from "./components/CharacterDeteil";
import CharecterList from "./components/CharacterList";
import Navbar, { Search, SearchResult } from "./components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharaters] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState();
  useEffect(() => {
    async function FetcheData() {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharaters(data.results.slice(0, 5));
      } catch (err) {
        setCharaters([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoding(false);
      }
    }
    // if (query.length < 3) {
    //   setCharaters([]);
    //   return;
    // }
    FetcheData();
  }, [query]);
  const handlerSelcteCharcter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  {
    return (
      <div className="app">
        <Toaster />
        <Navbar>
          <Search quary={query} setQuery={setQuery} />
          <SearchResult numOfResult={characters.length} />
        </Navbar>
        <Main characters={characters}>
          <CharecterList
            characters={characters}
            isLoding={isLoding}
            onSelectCharacter={handlerSelcteCharcter}
            selectedId={selectedId}
          />
          <CharecterDetil selectedId={selectedId} />
        </Main>
      </div>
    );
  }
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
