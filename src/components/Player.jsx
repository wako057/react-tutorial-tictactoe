import {useState} from "react";

export default function Player({name, symbol}) {
    const [ isEditing, setIsEditing ] = useState(false);

    console.log(`Player - isEditing: ${isEditing}`);
    function handleEditClick() {
        console.log(`handleIsEditing - isEditing: ${isEditing}`);
        setIsEditing((editing) => !editing);
    }

    return (
        <li>
                <span className="player">
                    { (!isEditing) ? <span className="player-name">{name}</span> : null}
                    { (isEditing) ? <input type="text" required/> : null}
                    <span className="player-symbol">{symbol}</span>
                </span>
            <button onClick={handleEditClick}>{ !isEditing ? 'Edit' : 'Save'}</button>
        </li>
    );
}