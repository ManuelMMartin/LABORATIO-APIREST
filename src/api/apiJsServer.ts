import axios, { AxiosError } from 'axios';
import { Character } from "../model";

export const fetchCharactersFromJsonServer = async (page: number, searchTerm: string = "") => {
  try {
    const response = await axios.get('http://localhost:3001/characters');

    const charactersArray = response.data || [];

    const filteredCharacters = searchTerm
    ? charactersArray.filter((character: Character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : charactersArray;

  const charactersPerPage = 10; 
  const startIndex = (page - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex);

  return paginatedCharacters;
} catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    throw new Error(`Error: ${(error as AxiosError).message}`);
  } else {
    throw new Error('An unknown error occurred.');
  }
}
};
