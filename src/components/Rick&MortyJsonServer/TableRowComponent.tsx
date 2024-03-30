import React, { useEffect, useState } from "react";
import axios from "axios";
import { Character } from "../../model";

interface TableRowComponentProps {
  character: Character;
  handleSentencesUpdate: () => void;
}

export const TableRowComponent: React.FC<TableRowComponentProps> = ({ character, handleSentencesUpdate }) => {
  const [bestSentencesForCharacter, setBestSentencesForCharacter] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/bestSentences');
        const bestSentences = response.data;
        setBestSentencesForCharacter(filterBestSentencesByCharacterId(bestSentences, character.id.toString()));
      } catch (error) {
        console.error("Error al obtener las mejores frases:", error);
      }
    };

    fetchData();
  }, [character.id, handleSentencesUpdate]);

  const filterBestSentencesByCharacterId = (bestSentences: Record<string, string>[], characterId: string): Record<string, string> => {
    const filteredSentences: Record<string, string> = {};
    bestSentences.forEach(sentence => {
      for (const key in sentence) {
        if (key === characterId) {
          // Usar una clave única para cada frase
          const sentenceId = sentence.id;
          // Agregar la frase al objeto usando el ID de la frase como clave
          filteredSentences[sentenceId] = sentence[key];
        }
      }
    });
    return filteredSentences;
  };

  return (
    <>
      <td>
        <img
          className='elemento'
          src={character.image}
          alt={`avatar de ${character.name}`}
        />
      </td>
      <td>{character.id}</td>
      <td>{character.name}</td>
      <td>{character.gender}</td>
      <td>{character.status}</td>
      <td>{character.species}</td>
      <td>
        {Object.values(bestSentencesForCharacter).map((frase, index) => (
          <p key={index}>{frase}</p>
        ))}
      </td>
    </>
  );

};
