// components/MultiSelectDropdown.tsx
import React from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  value: Option[];
  onChange: (selectedOptions: Option[]) => void;
  field: any;
  form: any;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, value, onChange, field, form }) => {
  const handleChange = (selectedOptions: Option[]) => {
    form.setFieldValue(field.name, selectedOptions);
    onChange(selectedOptions);
  };

  return (
    <Select
      isMulti
      options={options}
      value={field.value}
      onChange={handleChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

export default MultiSelectDropdown;
