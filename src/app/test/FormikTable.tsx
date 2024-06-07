// components/FormikTableField.tsx
import React from 'react';
import { Field, FieldArray, useFormikContext, ErrorMessage } from 'formik';

interface User {
  read: boolean;
  write: boolean;
  pull: boolean;
  push: boolean;
}

interface Collaborator {
  value: string;
  label: string;
}

interface FormikTableFieldProps {
  fieldName: string; // Name of the field for permissions
  onClose: () => void; // Function to call on form submission
}

const FormikTableField: React.FC<FormikTableFieldProps> = ({ fieldName, onClose }) => {
  const { values, setFieldValue } = useFormikContext<{ [key: string]: any }>();

  const collaborators: Collaborator[] = values.collaborators || [];
  const userPermissions: User[] = values[fieldName] || [];

  return (
    <FieldArray name={fieldName}>
      {({ remove, push }) => (
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
              {console.log(collaborators)}
              {collaborators.map((collaborator, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    <span>{collaborator.label}</span>
                    <ErrorMessage name={`collaborators.${index}.label`} component="div" className="text-red-500 text-sm" />
                  </td>
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
                      onClick={() => {
                        remove(index);
                        setFieldValue(
                          'collaborators',
                          collaborators.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button
            type="button"
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Proceed
          </button> */}
        </div>
      )}
    </FieldArray>
  );
};

export default FormikTableField;
