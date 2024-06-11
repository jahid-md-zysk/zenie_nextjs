// components/GenericTable.tsx
"use client";
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from "@/components/ui/table"; // Adjust the import based on the actual shadcn/ui library structure
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';
import ConfirmDialog from '@/app/components/ConfirmDialog';

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
    bgColor: string;
  }

interface GenericTableProps {
  columns: Column[];
  data: RowData[];
  isAdmin: boolean;
  actions: Action[];
}

const GenericTable: React.FC<GenericTableProps> = ({ columns, data, isAdmin,actions }) => {
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);

  const handleActionClick = async (action: Action, row: RowData) => {
    setSelectedRow(row);
    setCurrentAction(action);
    setDialogOpen(true);
   
  };
  const handleDialogAction = () => {
    if (currentAction) {
      if (selectedRow) currentAction.onClick(selectedRow);
    }
    setDialogOpen(false);
  };
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
                <span className='px-1' key={index} >
                  <Button className={action.bgColor} onClick={() => handleActionClick(action, row)}>
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
      {
        dialogOpen && (
          <div className='hidden'>
            <ConfirmDialog
              triggerLabel=""
              title="Are you sure?"
              description="Please confirm your action."
              actions={[{ ...currentAction, onClick: handleDialogAction } as Action]}
              cancelLabel="Cancel"
              onCancel={() => setDialogOpen(false)}
              open={dialogOpen}
              onOpenChange={setDialogOpen}
            />
          </div>)
      }
      
    </div>
  );
};

export default GenericTable;
