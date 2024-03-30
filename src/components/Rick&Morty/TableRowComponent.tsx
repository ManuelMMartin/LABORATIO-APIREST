import { Character } from "../../model"

interface TableRowComponentProps {
  character: Character;
}

export const TableRowComponent: React.FC<TableRowComponentProps> = ({ character }) => {
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
    </>
  );
};