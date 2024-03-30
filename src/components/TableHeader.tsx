import React from "react";

interface Props {
  headers: string[]
}

export const TableHeaders: React.FC<Props> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  )
}