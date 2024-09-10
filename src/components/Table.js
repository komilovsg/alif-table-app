import React from "react";

function Table({ columns, data }) {
  return (
    <table className="table-auto w-full mt-10">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor} className="px-4 py-2 bg-gray-100 border">
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.accessor} className="border px-4 py-2 text-start">
                {row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
