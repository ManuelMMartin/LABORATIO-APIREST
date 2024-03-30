import React, { useState } from "react";
import { Character } from "../../model";
import { SentencesModal } from "./SentencesModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character | null;
  handleSentencesUpdate: () => void;
}

export const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, character, handleSentencesUpdate }) => {
  const [isSentencesModalOpen, setIsSentencesModalOpen] = useState(false);

  if (!isOpen || !character) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <img src={character.image} alt={`${character.name} avatar`} />
          <h3>{character.name}</h3>
          <h4>ID: {character.id}</h4>
          <h4>Género: {character.gender}</h4>
          <h4>Especie: {character.species}</h4>
          {character.type && <h4>Tipo: {character.type}</h4>}
          <button className="button_sentence button_table" onClick={() => setIsSentencesModalOpen(true)}>Frases</button>
        </div>
      </div>
      <SentencesModal
        isOpen={isSentencesModalOpen}
        onClose={() => setIsSentencesModalOpen(false)}
        character={character}
        handleSentencesUpdate={handleSentencesUpdate}
      />
    </>
  );
};
