import { useState } from "react";
import "./App.css";
import CharecterDetil from "./components/CharacterDeteil";
import CharecterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";
import useCharacher from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoding, characters } = useCharacher(query);
  const [selectedId, setSelectedId] = useState();
  const [favourites, setFavourites] = useLocalStorage("FAVOURITS", []);
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
