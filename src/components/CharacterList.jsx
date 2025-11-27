import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loding from "./Loding";

function CharacterList({
  characters,
  isLoding,
  onSelectCharacter,
  selectedId,
}) {
  if (isLoding)
    return (
      <div className="charecters-list">
        <Loding />
      </div>
    );
  return (
    <div className="charecters-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
          onSelectCharacter={onSelectCharacter}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item, onSelectCharacter, selectedId }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "🧔‍♂️" : "👩"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      <button className="icon red" onClick={() => onSelectCharacter(item.id)}>
        {selectedId === item.id ? (
          <EyeSlashIcon />
        ) : (
          <EyeIcon className="icon" />
        )}
      </button>
    </div>
  );
}
