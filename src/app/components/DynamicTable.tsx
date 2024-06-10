// components/GenericTable.tsx
"use client";
import React from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from "@/components/ui/table"; // Adjust the import based on the actual shadcn/ui library structure
import { Button } from "@/components/ui/button";

export interface RowData {
  [key: string]: string | number;
}

export interface Column {
    key: string;
    header: string;
    widthClass: string; // Class for column width
  }

export interface Action {
    label: string;
    onClick: (row: RowData) => void;
    bg_color: string;
  }

interface GenericTableProps {
  columns: Column[];
  data: RowData[];
  isAdmin: boolean;
  actions: Action[];
}

const GenericTable: React.FC<GenericTableProps> = ({ columns, data, isAdmin,actions }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.key} className={column.widthClass}>{column.header}</TableHead>
            ))}
            {isAdmin && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map(column => (
                <TableCell key={column.key} className={column.widthClass}>
                  {row[column.key]}
                </TableCell>
              ))}
              {isAdmin && (
                <TableCell>
                {actions.map((action, index) => (
                <span className='px-1'>
                  <Button className={action.bg_color} key={index} onClick={() => action.onClick(row)}>
                    {action.label}
                  </Button>
                </span>
                ))}
              </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// {zszasd}

export default GenericTable;
