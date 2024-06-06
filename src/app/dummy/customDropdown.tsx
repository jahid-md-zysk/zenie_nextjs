import React from 'react';
import { FieldProps } from 'formik';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps extends FieldProps {
  options: Option[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  field,
  form,
  options,
  ...props
}) => {
  return (
    <select
      {...field}
      {...props}
      onChange={(event) => {
        console.log(props)
        // field.onChange(event)
        console.log(field)
        props.onChange(event);
        form.setFieldValue(field.name, event.target.value);
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomDropdown;
