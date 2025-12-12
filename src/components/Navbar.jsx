import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";
export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO💕</div>
      {children}
    </nav>
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result"> found {numOfResult} charecter</div>;
}

export function Search({ quary, setQuery }) {
  return (
    <input
      value={quary}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="searche...."
    />
  );
}
export function Favourites({ favourites, onDeletFavourites }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title={"List Of Favourites"}>
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeletFavourites(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
