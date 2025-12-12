import { useEffect, useState } from "react";
import "./App.css";
import CharecterDetil from "./components/CharacterDeteil";
import CharecterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const [characters, setCharaters] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const contorller = new AbortController();
    const signal = contorller.signal;
    async function FetcheData() {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setCharaters(data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel()) {
          setCharaters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoding(false);
      }
    }
    // if (query.length < 3) {
    //   setCharaters([]);
    //   return;
    // }
    FetcheData();
    return () => {
      contorller.abort();
    };
  }, [query]);
  const handlerSelcteCharcter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handlerDeletedFavourite = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
  const handleAddFavourite = (character) => {
    setFavourites((prevFav) => [...prevFav, character]);
  };
  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  {
    return (
      <div className="app">
        <Toaster />
        <Navbar>
          <Search quary={query} setQuery={setQuery} />
          <SearchResult numOfResult={characters.length} />
          <Favourites
            favourites={favourites}
            onDeletFavourites={handlerDeletedFavourite}
          />
        </Navbar>
        <Main characters={characters}>
          <CharecterList
            characters={characters}
            isLoding={isLoding}
            onSelectCharacter={handlerSelcteCharcter}
            selectedId={selectedId}
          />
          <CharecterDetil
            selectedId={selectedId}
            onAddFavourites={handleAddFavourite}
            isAddToFavourite={isAddToFavourite}
          />
        </Main>
      </div>
    );
  }
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
