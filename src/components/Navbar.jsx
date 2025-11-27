import { HeartIcon } from "@heroicons/react/24/outline";
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
export function Favourites({ numOfFavourites }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{numOfFavourites}</span>
    </button>
  );
}
