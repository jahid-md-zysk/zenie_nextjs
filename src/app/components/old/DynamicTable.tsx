// components/DynamicTable.tsx
"use client";
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from "@/components/ui/table"; // Adjust the import based on the actual shadcn/ui library structure
import { Button } from "@/components/ui/button";

interface RowData {
  [key: string]: string | number;
}

interface DynamicTableProps {
  isAdmin: boolean;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ isAdmin }) => {
  const [columns, setColumns] = useState<string[]>(['Name', 'Age', 'Email']);
  const [data, setData] = useState<RowData[]>([
    { Name: 'John Doe', Age: 28, Email: 'john@example.com' },
    { Name: 'Jane Smith', Age: 34, Email: 'jane@example.com' },
  ]);

//   const addColumn = () => {
//     const newColumn = prompt('Enter column name:');
//     if (newColumn) {
//       setColumns([...columns, newColumn]);
//       setData(data.map(row => ({ ...row, [newColumn]: '' })));
//     }
//   };

  const handleEdit = (rowIndex: number) => {
    alert(`Edit clicked on row ${rowIndex + 1}`);
  };

  const handleDelete = (rowIndex: number) => {
    alert(`Delete clicked on row ${rowIndex + 1}`);
  };

  return (
    <div>
      {/* <Button onClick={addColumn}>Add Column</Button> */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column}>{column}</TableHead>
            ))}
            {isAdmin && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map(column => (
                <TableCell key={column}>
                  {row[column]}
                </TableCell>
              ))}
              {isAdmin && (
                <TableCell>
                  <Button onClick={() => handleEdit(rowIndex)}>Edit</Button>
                  <Button onClick={() => handleDelete(rowIndex)}>Delete</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;
