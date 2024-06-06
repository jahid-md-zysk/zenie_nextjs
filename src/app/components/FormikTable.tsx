// components/FormikTable.tsx

import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface TableProps {
  initialValues: Array<{ label: string, value: string }>;
  onSubmit: (values: FormValues) => void;
}

interface User {
  name: string;
  read: boolean;
  write: boolean;
  pull: boolean;
  push: boolean;
}

interface FormValues {
  users: User[];
}

const FormikTable: React.FC<TableProps> = ({ initialValues, onSubmit }) => {
  const usersData = initialValues.map(user => ({
    name: user.label,
    read: true,
    write: false,
    pull: false,
    push: false
  }));

  const validationSchema = Yup.object().shape({
    users: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Required'),
      })
    ),
  });

  return (
    <Formik
      initialValues={{ users: usersData }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className="space-y-4">
          <FieldArray name="users">
            {({ remove }) => (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Read</th>
                        <th className="py-2 px-4 border-b">Write</th>
                        <th className="py-2 px-4 border-b">Pull</th>
                        <th className="py-2 px-4 border-b">Push</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {values.users.length > 0 &&
                      values.users.map((user, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">
                            <span>{user.name}</span>
                            <ErrorMessage
                              name={`users.${index}.name`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <Field
                              type="checkbox"
                              name={`users.${index}.read`}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <Field
                              type="checkbox"
                              name={`users.${index}.write`}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <Field
                              type="checkbox"
                              name={`users.${index}.pull`}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <Field
                              type="checkbox"
                              name={`users.${index}.push`}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <button
                              type="button"
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => remove(index)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* Submit button */}
                <button
                  type="submit"
                  className="ml-2 mt-2 bg-green-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default FormikTable;















// import React from 'react';
// import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// interface TableProps {
//   initialValues: Array<{ label: string, value: string }>;
//   onSubmit: (values: FormValues) => void;
// }
// interface User {
//   name: string;
//   read: boolean;
//   write: boolean;
//   pull: boolean;
//   push: boolean;
// }

// interface FormValues {
//   users: User[];
// }

// interface FormikTableProps {
//   initialValues: FormValues;
//   onSubmit: (values: FormValues) => void;
// }
// const FormikTable: React.FC<TableProps> = ({initialValues,onSubmit}) => {
//   const usersData = initialValues.map(user => ({
//     name: user.label,
//     read: true,
//     write: false,
//     pull: false,
//     push: false
//   }));
//   const TransfromInitialValues: FormValues = {
//     users: usersData
//   };

//   const validationSchema = Yup.object().shape({
//     users: Yup.array().of(
//       Yup.object().shape({
//         name: Yup.string().required('Required'),
//       })
//     ),
//   });

//   const handleSubmit = (values: FormValues) => {
//     console.log(values);
//   };

//   return (
//     <Formik
//       initialValues={TransfromInitialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ values }) => (
//         <Form className="space-y-4">
//           <FieldArray name="users">
//             {({ remove, push }) => (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-300">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       <th className="py-2 px-4 border-b">Name</th>
//                       <th className="py-2 px-4 border-b">Read</th>
//                       <th className="py-2 px-4 border-b">Write</th>
//                       <th className="py-2 px-4 border-b">Pull</th>
//                       <th className="py-2 px-4 border-b">Push</th>
//                       <th className="py-2 px-4 border-b">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {values.users.length > 0 &&
//                       values.users.map((user, index) => (
//                         <tr key={index}>
//                           <td className="py-2 px-4 border-b">
//                             <span>{user.name}</span>
//                             <ErrorMessage
//                               name={`users.${index}.name`}
//                               component="div"
//                               className="text-red-500 text-sm"
//                             />
//                           </td>
//                           <td className="py-2 px-4 border-b text-center">
//                             <Field
//                               type="checkbox"
//                               name={`users.${index}.read`}
//                               className="form-checkbox h-5 w-5 text-blue-600"
//                             />
//                           </td>
//                           <td className="py-2 px-4 border-b text-center">
//                             <Field
//                               type="checkbox"
//                               name={`users.${index}.write`}
//                               className="form-checkbox h-5 w-5 text-blue-600"
//                             />
//                           </td>
//                           <td className="py-2 px-4 border-b text-center">
//                             <Field
//                               type="checkbox"
//                               name={`users.${index}.pull`}
//                               className="form-checkbox h-5 w-5 text-blue-600"
//                             />
//                           </td>
//                           <td className="py-2 px-4 border-b text-center">
//                             <Field
//                               type="checkbox"
//                               name={`users.${index}.push`}
//                               className="form-checkbox h-5 w-5 text-blue-600"
//                             />
//                           </td>
//                           <td className="py-2 px-4 border-b text-center">
//                             <button
//                               type="button"
//                               className="bg-red-500 text-white px-2 py-1 rounded"
//                               onClick={() => remove(index)}
//                             >
//                               X
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//                 {/* <button
//                   type="button"
//                   className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//                   onClick={() => push({ name: 'New User', read: false, write: false, pull: false, push: false })}
//                 >
//                   Updated Permissions
//                 </button> */}
//                 <button
//                   className="ml-2 mt-2 bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                   Submit
//                 </button>
//               </div>
//             )}
//           </FieldArray>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default FormikTable;
