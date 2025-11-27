import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Loding from "./Loding";
import toast from "react-hot-toast";

function CharacterDetail({ selectedId, onAddFavourites, isAddToFavourite }) {
  const [character, setCharaters] = useState(null);
  const [isLoding, setIsLoding] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    async function FetcheData() {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharaters(data);

        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes([episodeData].flat().slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoding(false);
      }
    }
    if (selectedId) FetcheData();
  }, [selectedId]);

  if (isLoding)
    return (
      <div style={{ flex: 1 }}>
        <Loding />
      </div>
    );
  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        <p>please selected charcters</p>
      </div>
    );

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "🧔‍♂️" : "👩"}</span>
            <span> {character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span> {character.status}</span>
            <span> {character.species}</span>
          </div>
          <div className="location">
            <p>Last know Location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            {isAddToFavourite ? (
              <p>already Add To Favourite💖</p>
            ) : (
              <button
                onClick={() => onAddFavourites(character)}
                className="btn btn--primary"
              >
                Add To Favourite
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List Episodes:</h2>
          <button>
            <ArrowDownCircleIcon className="icon" />
          </button>
        </div>
        <ul>
          {episodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {index + 1} - {item.episode} :<strong> {item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
