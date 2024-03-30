import { useEffect, useState } from "react"
import { Character } from "../../model"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "use-debounce";
import { TableHeaders } from "../TableHeader"
import { ModalComponent } from "./ModalComponent"
import '../Rick&Morty/ModalComponent.css'
import { fetchCharactersFromJsonServer } from "../../api/apiJsServer";
import { TableRowComponent } from "./TableRowComponent";
import { PaginationComponent } from "../PaginationComponent";

export function RickList2() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pageRick, setPageRick] = useState(1);
  const [personaje, setPersonaje] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncePersonaje] = useDebounce(personaje, 500);
  const navigate = useNavigate();

  const fetchCharacters = async (pageRick: number) => {
    try {
      const charactersData = await fetchCharactersFromJsonServer(pageRick, debouncePersonaje);
      setCharacters(charactersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePagination = (mod: boolean) => {
    setPageRick(prevPage =>
      mod
        ? prevPage + 1
        : (prevPage > 1 ? prevPage - 1 : prevPage)
    );
  };

  useEffect(() => {
    fetchCharacters(pageRick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncePersonaje, pageRick]);

  const handleSentencesUpdate = async () => {
    await fetchCharacters(pageRick);
  };





  return (
    <main className='main'>
      <div className='input_container'>
        <input
          className='input_table'
          type="text"
          value={personaje}
          onChange={(e) => {
            setPageRick(1);
            setPersonaje(e.target.value);
          }}
        />
        <button className='button_table' onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
      {characters.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <>
          <table>
            <TableHeaders headers={["Avatar", "Id", "Nombre", "Género", "Estado", "Especie", "Frases"]} />
            <tbody>
              {characters.map((character) => (
                <tr
                  className='SelectRow'
                  onClick={() => {
                    setSelectedCharacter(character);
                    setIsModalOpen(true);
                  }}
                  key={character.id}
                >
                  <TableRowComponent character={character} handleSentencesUpdate={handleSentencesUpdate}  />
                </tr>
              ))}
            </tbody>
          </table>
          <ModalComponent
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            character={selectedCharacter}
            handleSentencesUpdate={handleSentencesUpdate}
          />
          <PaginationComponent
            setCurrentPage={setPageRick}
            handlePagination={handlePagination}
            currentPage={pageRick}
          />
        </>
      )}
    </main>
  );
}
