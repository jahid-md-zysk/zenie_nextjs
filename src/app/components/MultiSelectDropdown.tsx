// components/MultiSelect.tsx
import React, { useEffect, useState } from 'react';
import Select, { OptionsType, ValueType } from 'react-select';
import { FieldProps } from 'formik';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps extends FieldProps {
  options: OptionsType<Option>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  field,
  form,
  options,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onChange = (option: ValueType<Option, true>) => {
    form.setFieldValue(field.name, option);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Select
      {...field}
      isMulti
      options={options}
      value={field.value}
      onChange={onChange}
      onBlur={() => form.setFieldTouched(field.name, true)}
    />
  );
};

export default MultiSelect;
