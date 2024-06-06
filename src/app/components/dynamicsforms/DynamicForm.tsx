// components/DynamicForm.tsx
import React from 'react';
import { useFormik } from 'formik';

interface Option {
  label: string;
  value: string;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  options?: Option[]; // For select, radio, checkbox
}

interface DynamicFormProps {
  formFields: FormField[];
  onSubmit: (values: { [key: string]: any }) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formFields, onSubmit }) => {
  const initialValues = formFields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
  }, {} as { [key: string]: any });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            onChange={formik.handleChange}
            value={formik.values[field.name]}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'checkbox':
        return (
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values[field.name]}
            className="h-5 w-5 text-blue-600"
          />
        );
      case 'radio':
        return (
          field.options?.map(option => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                id={field.name}
                name={field.name}
                value={option.value}
                onChange={formik.handleChange}
                checked={formik.values[field.name] === option.value}
                className="h-4 w-4 text-blue-600"
              />
              <span>{option.label}</span>
            </label>
          ))
        );
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            onChange={formik.handleChange}
            value={formik.values[field.name]}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {formFields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1 text-gray-700">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;



// // components/DynamicForm.tsx
// import React from 'react';
// import { useFormik } from 'formik';

// interface FormField {
//   name: string;
//   label: string;
//   type: string;
// }

// interface DynamicFormProps {
//   formFields: FormField[];
//   onSubmit: (values: { [key: string]: any }) => void;
// }

// const DynamicForm: React.FC<DynamicFormProps> = ({ formFields, onSubmit }) => {
//   const initialValues = formFields.reduce((acc, field) => {
//     acc[field.name] = '';
//     return acc;
//   }, {} as { [key: string]: any });

//   const formik = useFormik({
//     initialValues,
//     onSubmit: (values) => {
//       onSubmit(values);
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="space-y-4">
//       {formFields.map((field) => (
//         <div key={field.name} className="flex flex-col">
//           <label htmlFor={field.name} className="mb-1 text-gray-700">
//             {field.label}
//           </label>
//           <input
//             id={field.name}
//             name={field.name}
//             type={field.type}
//             onChange={formik.handleChange}
//             value={formik.values[field.name]}
//             className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       ))}
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default DynamicForm;
