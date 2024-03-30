import React, { useState, useEffect } from "react";
import axios from "axios";
import { Character } from "../../model";

interface SentencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  handleSentencesUpdate: () => void;
}

export const SentencesModal: React.FC<SentencesModalProps> = ({
  isOpen,
  onClose,
  character,
  handleSentencesUpdate
}) => {
  const [newSentence, setNewSentence] = useState("");
  const [editSentenceIndex, setEditSentenceIndex] = useState<string | null>(null);
  const [editSentence, setEditSentence] = useState<string>("");
  const [bestSentences, setBestSentences] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/bestSentences`);
        const sentencesMap: Record<string, string> = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.forEach((sentence: any) => {
          if (Object.prototype.hasOwnProperty.call(sentence, character.id)) {
            sentencesMap[sentence.id] = sentence[character.id];
          }
        });
        setBestSentences(sentencesMap);
      } catch (error) {
        console.error("Error al obtener las mejores frases:", error);
      }
    };

    fetchData();
  }, [character.id, newSentence]);

  const handleAddSentence = async () => {
    if (!character) return;

    try {
      await axios.post(`http://localhost:3001/bestSentences`, {
        [character.id]: newSentence
      });
      setBestSentences({ ...bestSentences, [character.id]: newSentence });
      setNewSentence("");
      handleSentencesUpdate();

    } catch (error) {
      console.error("Error al agregar la frase:", error);
    }
  };

  const handleEditButtonClick = (sentenceId: string, sentence: string) => {
    setEditSentence(sentence); // Asignar el valor de la frase a editar al estado del input de edición
    setEditSentenceIndex(sentenceId);
  };

  const handleEditSentence = async (sentenceId: string) => {
    if (!character || sentenceId === null) return;

    try {
      const updatedSentences = { ...bestSentences };
      updatedSentences[sentenceId] = editSentence; // Usar el valor del input de edición
      await axios.put(`http://localhost:3001/bestSentences/${sentenceId}`, { [character.id]: editSentence });
      setBestSentences(updatedSentences);
      setEditSentenceIndex(null);
      handleSentencesUpdate();
    } catch (error) {
      console.error("Error al editar la frase:", error);
    }
  };

  const handleDeleteSentence = async (sentenceId: string) => {
    if (!character || sentenceId === null) return;

    try {
      const updatedSentences = { ...bestSentences };
      delete updatedSentences[sentenceId];
      await axios.delete(`http://localhost:3001/bestSentences/${sentenceId}`);
      setBestSentences(updatedSentences);
      handleSentencesUpdate();
    } catch (error) {
      console.error("Error al borrar la frase:", error);
    }
  };

  if (!isOpen || !character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h3>Administrar Frases</h3>
        <ul>
          {Object.entries(bestSentences).map(([sentenceId, sentence]) => (
            <li key={sentenceId}>
              <div className="flex-container">
                {editSentenceIndex === sentenceId ? (
                  <>
                    <input
                      type="text"
                      value={editSentence} // Usar el valor del input de edición
                      onChange={(e) => setEditSentence(e.target.value)} // Actualizar el estado del input de edición
                    />
                    <div className="icon" onClick={() => handleEditSentence(sentenceId)}>✅</div>
                  </>
                ) : (
                  <>
                    <span>{sentence}</span>
                    <div className="icon" onClick={() => handleEditButtonClick(sentenceId, sentence)}>✏️</div>
                  </>
                )}
                <div className="flex-container">
                  <div className="icon" onClick={() => handleDeleteSentence(sentenceId)}>🗑️</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex-container">
          <input
            type="text"
            value={newSentence}
            onChange={(e) => setNewSentence(e.target.value)}
            placeholder="Añadir nueva frase"
          />
          <div className="icon" onClick={handleAddSentence}>➕</div>
        </div>
      </div>
    </div>
  );
};
