import {useState} from "react";

export default function Player({ initialName, symbol, isActive, onChangedName }) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ playerName, setPlayerName ] = useState(initialName);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
          onChangedName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
                <span className="player">
                    { (!isEditing) ? <span className="player-name">{playerName}</span> : null}
                    { (isEditing) ? <input type="text" required defaultValue={playerName} onChange={handleChange}/> : null}
                    <span className="player-symbol">{symbol}</span>
                </span>
            <button onClick={handleEditClick}>{ !isEditing ? 'Edit' : 'Save'}</button>
        </li>
    );
}