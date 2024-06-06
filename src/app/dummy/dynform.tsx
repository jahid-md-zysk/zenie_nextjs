import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropdown from '@/app/components/Dropdown';
import CustomDropdown from './customDropdown';

interface FormValues {
  template_repo: string;
  checkbox1: boolean;
  checkbox2: boolean;
}

const validationSchema = Yup.object().shape({
  template_repo: Yup.string().required('Template Repo is required'),
  checkbox1: Yup.boolean().oneOf([true], 'Checkbox 1 is required'),
  checkbox2: Yup.boolean().oneOf([true], 'Checkbox 2 is required'),
});

const DynamicForm: React.FC = () => {
  const [isDropdownSelected, setIsDropdownSelected] = useState<boolean>(false);

  const initialValues: FormValues = {
    template_repo: '',
    checkbox1: false,
    checkbox2: false,
  };

  const templateRepos = [
    { label: 'Repo 1', value: 'repo1' },
    { label: 'Repo 2', value: 'repo2' },
    { label: 'Repo 3', value: 'repo3' },
  ];

  const handleOptionChange = (value: string) => {
    setIsDropdownSelected(value !== '');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Form Submitted:', values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue}) => (
        <Form className="max-w-lg mx-auto p-4">
          <div className="mb-4">
            <label htmlFor="template_repo" className="block text-sm font-medium text-gray-700">
              Template Repo
            </label>
            <Field
              name="template_repo"
              component={CustomDropdown}
              options={templateRepos}
              placeholder="Select a Repo"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                const value = event.target.value;
                handleOptionChange(value);
                setFieldValue('template_repo', value);
              }}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <ErrorMessage name="template_repo" component="div" className="text-red-600 text-sm mt-1" />
          </div>
          {isDropdownSelected && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">
                  <Field type="checkbox" name="checkbox1" className="mr-2" />
                  Checkbox 1
                </label>
                <ErrorMessage name="checkbox1" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  <Field type="checkbox" name="checkbox2" className="mr-2" />
                  Checkbox 2
                </label>
                <ErrorMessage name="checkbox2" component="div" className="text-red-600 text-sm mt-1" />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
