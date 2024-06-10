"use client"

import React, { useEffect,useState} from 'react';
import { User, columns } from "@/app/dashboard/columns"
import {DataTable}  from "@/app/components/DataTable"

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f1",
      username: "Mohammed Zahid",
      email: "m@example.com",
      gender:"male",
      interests: ["sports","reading"]
    },
    {
        id: "728ed52f2",
        username: "John Doe",
        email: "m@example.com",
        gender:"male",
        interests: ["sports","reading"]
      },
      {
        id: "728ed52f3",
        username: "Sunil Shetty",
        email: "m@example.com",
        gender:"male",
        interests: ["sports","reading"]
      },
    // ...
  ]
}
export default function DemoPage() {
//   const data = await getData()

  const [users,setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users/getusers')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.data);
        try {
          setUsers(res.data);
        } catch (error) {
          console.log(error)
        }
      });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users}/>
    </div>
  )

}

