import React from 'react';

interface DropdownProps {
    field: any;
    form: any;
    options: { value: string, label: string }[];
    label: string;
    placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    field,
    form,
    options,
    label,
    placeholder,
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                {...field}
                className="text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option className='text-black ' value="" label={placeholder || `Select ${label}`} />
                {options.map((option) => (
                <option className='text-black ' key={option.value} value={option.value} label={option.label}>
                    {option.label}
                </option>
                ))}
            </select>
            {form.touched[field.name] && form.errors[field.name] && (
                <div className="text-red-500 text-sm mt-1">{form.errors[field.name]}</div>
            )}
        </div>
    );
};

export default Dropdown;
