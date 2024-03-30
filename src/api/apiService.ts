import axios, { AxiosError } from 'axios';

export const fetchCharacters = async (page: number, name?: string) => {
  const url = name
    ? `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
    : `https://rickandmortyapi.com/api/character/?page=${page}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error: ${(error as AxiosError).message}`);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};