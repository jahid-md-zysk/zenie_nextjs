import React from 'react';

interface DropdownProps {
  field: any;
  form: any;
  options: Array<{ label: string, value: string }>;
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({ field, form, options, placeholder,...props }) => {
  return (
    <select
      {...field}
      {...props}
      onChange={(event) => {
        form.setFieldValue(field.name, event.target.value);
        if (props.onChange) props.onChange(event);
      }}
      className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;



// import React from 'react';

// interface DropdownProps {
//     field: any;
//     form: any;
//     options: { value: string, label: string }[];
//     label: string;
//     placeholder?: string;
// }

// const Dropdown: React.FC<DropdownProps> = ({
//     field,
//     form,
//     options,
//     label,
//     placeholder,
// }) => {
//     return (
//         <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">{label}</label>
//             <select
//                 {...field}
//                 onChange={(event) => {
//                     console.log("change selected")
//                     form.setFieldValue(field.name, event.target.value);
//                     console.log("form ",form)
//                     field.onChange(event);
//                 }}
//                 className="text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             >
//                 <option className='text-black ' value="" label={placeholder || `Select ${label}`} />
//                 {options.map((option) => (
//                 <option className='text-black ' key={option.value} value={option.value} label={option.label}>
//                     {option.label}
//                 </option>
//                 ))}
//             </select>
//             {form.touched[field.name] && form.errors[field.name] && (
//                 <div className="text-red-500 text-sm mt-1">{form.errors[field.name]}</div>
//             )}
//         </div>
//     );
// };

// export default Dropdown;
