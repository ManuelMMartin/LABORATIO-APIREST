import React from "react";
import { Character } from "../../model";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character | null;
}

export const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, character }) => {
  if (!isOpen || !character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <img src={character.image} />
        <h3>{character.name}</h3>
        <h4>ID: {character.id}</h4>
        <h4>Género: {character.gender}</h4>
        <h4>Especie: {character.species}</h4>
        <h4>{character.type}</h4>
      </div>
    </div>
  )
}
