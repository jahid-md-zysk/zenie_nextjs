import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  option1: string;
  input1: string;
  option2: string;
  input2: string;
}

const validationSchema = Yup.object().shape({
  option1: Yup.string().required('Option 1 is required'),
  input1: Yup.string().required('Input 1 is required'),
  option2: Yup.string().required('Option 2 is required'),
  input2: Yup.string().required('Input 2 is required'),
});

const DynamicForm: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>('option1');
  const [selectedOption2, setSelectedOption2] = useState<string>('option1');

  const initialValues: FormValues = {
    option1: 'option1',
    input1: '',
    option2: 'option1',
    input2: '',
  };

  const handleOption1Change = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const value = event.target.value;
    setSelectedOption1(value);
    setFieldValue('option1', value);
  };

  const handleOption2Change = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const value = event.target.value;
    setSelectedOption2(value);
    setFieldValue('option2', value);
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log('Form Submitted:', values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="max-w-lg mx-auto p-4">
          <div className="mb-4">
            <label htmlFor="option1" className="block text-gray-700">Select Option 1</label>
            <Field
              as="select"
              name="option1"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                handleOption1Change(event, setFieldValue)
              }
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Field>
            <ErrorMessage name="option1" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="input1" className="block text-gray-700">Input 1</label>
            <Field
              type="text"
              name="input1"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage name="input1" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="option2" className="block text-gray-700">Select Option 2</label>
            <Field
              as="select"
              name="option2"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                handleOption2Change(event, setFieldValue)
              }
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Field>
            <ErrorMessage name="option2" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="input2" className="block text-gray-700">Input 2</label>
            <Field
              type="text"
              name="input2"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage name="input2" component="div" className="text-red-600 text-sm mt-1" />
          </div>

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
// {{ jfjdccxcxfjff}}
export default DynamicForm;
