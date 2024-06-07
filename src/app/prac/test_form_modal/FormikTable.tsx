// components/FormikTableField.tsx
import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface User {
  name: string;
  read: boolean;
  write: boolean;
  pull: boolean;
  push: boolean;
}

interface FormikTableFieldProps {
  fieldName: string; // Name of the field
  name:string;
  close: () => void;
}

interface Option {
	value: string;
	label: string;
}

const FormikTableField: React.FC<FormikTableFieldProps> = ({ name, fieldName, close}) => {
  // const initialValues: User[] = [
  //   { name: 'User1', read: false, write: false, pull: false, push: false },
  //   { name: 'User2', read: false, write: false, pull: false, push: false },
  // ];


  return (
    <FieldArray name={fieldName}>
      {({ remove, push, form }) => (
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
              {form.values[name].map((user: Option, index: number) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    <span>{user.label}</span>
                  </td>
                    <Field
                      type="text"
                      hidden
                      value={user.label}
                      name={`${fieldName}.${index}.username`}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  <td className="py-2 px-4 border-b text-center">
                    <Field
                      type="checkbox"
                      name={`${fieldName}.${index}.read`}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Field
                      type="checkbox"
                      name={`${fieldName}.${index}.write`}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Field
                      type="checkbox"
                      name={`${fieldName}.${index}.pull`}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Field
                      type="checkbox"
                      name={`${fieldName}.${index}.push`}
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
          <button
            type="button"
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={()=>{close()}}
          >
            Proceed
          </button>
        </div>
      )}
    </FieldArray>
  );
};

export default FormikTableField;
