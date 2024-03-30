import { useEffect, useState } from "react"
import { Character, RickEntity } from "../../model"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "use-debounce";
import { TableHeaders } from "../TableHeader"
import { ModalComponent } from "./ModalComponent"
import './ModalComponent.css'
import { fetchCharacters } from "../../api/apiService";
import { TableRowComponent } from "./TableRowComponent";
import { PaginationComponent } from "../PaginationComponent";

const characterBase = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
}

export function RickList() {
  const [characters, setCharacters] = useState<RickEntity<Character[]>>(characterBase)
  const [pageRick, setPageRick] = useState(1)
  const [personaje, setPersonaje] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncePersonaje] = useDebounce(personaje, 500)

  const navigate = useNavigate()

  const traerPersonajes = () => {
    fetchCharacters(pageRick)
      .then(setCharacters)
      .catch((error) => console.error('Error fetching data:', error));
  }

  const buscarPersonaje = () => {
    fetchCharacters(pageRick, debouncePersonaje)
      .then(setCharacters)
      .catch((error) => console.error('Error fetching data:', error));
  }

  const handlePagination = (mod: boolean) => {
    setPageRick(
      (prev) =>
        mod
          ? (characters.info?.next === null ? prev : prev + 1)
          : (pageRick === 1 ? prev : prev - 1)
    )
  }

  useEffect(() => {
    if (personaje === "") traerPersonajes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncePersonaje, pageRick])

  useEffect(() => {
    if (personaje) buscarPersonaje()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncePersonaje, pageRick])

  return (<>
    <main className='main'>
      <div className='input_container'>
        <input className='input_table' type="text" value={personaje}
          onChange={(e) => {
            setPageRick(1)
            setPersonaje(e.target.value)
          }} />
        <button className='button_table' onClick={() => (navigate('/'))}>Volver</button>
      </div>
      {characters.results?.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <>
          <table>
            <TableHeaders headers={["Avatar", "Id", "Nombre", "Genero", "Estado", "Especie"]} />
            <tbody>
              {characters.results?.map((character: Character) => (
                <tr className='SelectRow' onClick={() => {
                  setSelectedCharacter(character);
                  setIsModalOpen(true);
                }}
                  key={character.id}
                >
                  <TableRowComponent character={character} />
                </tr>
              ))}
            </tbody>
          </table>
          <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} character={selectedCharacter} />
          <PaginationComponent
            setCurrentPage={setPageRick}
            handlePagination={handlePagination}
            currentPage={pageRick} />
        </>
      )}
    </main>
  </>)
}