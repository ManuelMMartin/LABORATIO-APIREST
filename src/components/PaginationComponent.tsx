import './PaginationComponent.css'

interface PaginationComponentProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handlePagination: (mod: boolean) => void;
  currentPage: number;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({setCurrentPage, handlePagination, currentPage}) => {

  return (
    <div className="pagination">
      <button onClick={() => setCurrentPage(1)}>{"<<"}</button>
      <button onClick={() => handlePagination(false)}>{"<"}</button>
      {currentPage}
      <button onClick={() => handlePagination(true)}>{">"}</button>
    </div>
  )
}