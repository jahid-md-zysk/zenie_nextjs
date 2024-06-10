"use client";
import React, { useEffect,useState} from 'react';
import {DataTable}  from "@/app/components/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import DynamicTable from '../components/DynamicTable';
import GenericTable, {RowData,Column, Action} from '../components/DynamicTable';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Requests = {
  id: string
  request: string
  description: string
}


export default function DemoPage() {
  const [columns, setColumns] = useState<Column[]>([
    { 
      key: 'id', 
      header: 'ID', 
      widthClass: 'w-1/6' 
    },
    { 
      key: 'request', 
      header: 'Request', 
      widthClass: 'w-1/4' 
    },
    { 
      key: 'description', 
      header: 'Description', 
      widthClass: 'w-1/3' 
    },
  ]);

  const [data, setData] = useState<RowData[]>([
    {
      "id": 1,
      "request": "Request access to project repository",
      "description": "I need access to the project repository in order to contribute to the development effort. I have experience with similar projects and am familiar with the version control system being used."
    },
    {
      "id": 2,
      "request": "Grant access to repository for team member",
      "description": "One of our team members requires access to the project repository to assist with debugging and testing. They are a trusted member of the team and need access to fulfill their responsibilities effectively."
    },
    {
      "id": 3,
      "request": "Merge branches feature/login and develop",
      "description": "This request merges changes from the feature/login branch into the develop branch."
    },
    {
      "id": 4,
      "request": "Fix bug in user authentication module",
      "description": "This request addresses a critical bug in the user authentication module that causes login failures for some users."
    }
  ]);

  const isAdmin = true;

  const handleAccept = (row:RowData) => {
    alert(`Accept clicked on row id ${row.id}`);
  };

  const handleReject = (row:RowData) => {
    alert(`Reject clicked on row id ${row.id}`);
  };
  const actions: Action[] = [
    { label: 'Accept', 
      onClick: handleAccept,
      bg_color:"bg-lime-500 hover:bg-lime-800"
    },
    { label: 'Reject', 
      onClick: handleReject,
      bg_color:"bg-red-500 hover:bg-red-800"
    },
  ];

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={users}/> */}
      <GenericTable
        columns={columns}
        data={data}
        isAdmin={isAdmin}
        actions={actions}
      />
    </div>
  )

}

