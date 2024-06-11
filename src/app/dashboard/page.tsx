"use client";
import React, { useEffect,useState} from 'react';
import GenericTable, {RowData,Column, Action} from '../components/DynamicTable';
import {postData} from '@/utils/api'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Requests = {
  id: string
  request: string
  description: string
}


export default function DemoPage() {
  const [requests, setRequests] = useState<RowData[]>([])
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
  useEffect(() => {

    const fetchOwners = async () => {
			const res = await fetch('/api/v1/requests/getRequests');
			const result = await res.json();
			console.log(result);
			const requests = result.data.map((request:any) =>{ 
				return {
					...request
          // any logic or changes need
				}
			})
			setRequests(requests);
		};

    fetchOwners()
  },[])

  const isAdmin = true;
  const updateRequestStatus = async(row: RowData)=>{
    const postUrl = 'api/v1/requests/updateRequestStatus'
    const response = await postData(postUrl, row);
    console.log(response)
  }
  const handleAccept = (row:RowData) => {
    console.log(`Accept clicked on row id ${row.id}`);
    updateRequestStatus(row)
  };

  const handleReject = (row:RowData) => {
    console.log(`Reject clicked on row id ${row.id}`);
    updateRequestStatus(row)
  };

  const actions: Action[] = [
    { label: 'Accept', 
      onClick: handleAccept,
      bgColor:"bg-lime-500 hover:bg-lime-800"
    },
    { label: 'Reject', 
      onClick: handleReject,
      bgColor:"bg-red-500 hover:bg-red-800"
    },
  ];

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={users}/> */}
      <GenericTable
        columns={columns}
        data={requests}
        isAdmin={isAdmin}
        actions={actions}
      />
    </div>
  )

}

