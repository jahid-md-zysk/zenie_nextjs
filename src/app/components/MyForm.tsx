// components/MyForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Dropdown from './Dropdown';
import { Input } from "@/components/ui/input"

interface FormValues {
  name: string;
  email: string;
  address:Object;
  userComment:string;
  interests:Array<string>;
  gender:string;
}

const interestOptions = [
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'movies', label: 'Movies' },
  { value: 'tech', label: 'Tech' },
];

const MyForm: React.FC = () => {
  const [states,setStates] = useState([])
  const initialValues: FormValues = {
    name: '',
    email: '',
    gender:'',
    address : {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    interests:[],
    userComment:''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.object({
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string(),
      zip: Yup.string().required('Zipcode is required'),
      
    }),
    interests: Yup.array().min(1, 'At least one interest must be selected').required('At least one interest must be selected'),
    userComment: Yup.string().required('Comment is required'),
  });
  
  useEffect(() => {
    fetch('/api/states')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.data);
        setStates(res.data);
      });
  }, []);

  const onSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    console.log(values);
    
    try {
      const response = await fetch('/api/users/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      resetForm();
    } catch (error) {
      console.error('Error submitting the form', error);
    } finally {
      setSubmitting(false);
    }
  };
  //                      
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, handleChange, handleBlur}) => (
        <Form className='w-1/3 p-4 border rounded shadow-md'>
          <div className="mb-4" >
            <label className='block text-sm font-medium text-gray-700' htmlFor="name">Name</label>
            <Input type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" placeholder="Name" />
            {/* <input type="text" name="name" value={name} placeholder="Name" />
             */}
             {/* <input type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" placeholder="Name" /> */}
            {/* <Field type="text" name="name" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" /> */}
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4" >
            <label className='block text-sm font-medium text-gray-700' htmlFor="email">Email</label>
            <Field type="email" name="email" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          {/* <div className="mb-4" >
            <label className='block text-sm font-medium text-700' htmlFor="email">Email</label>
            <Field type="email" name="email" className="text-black mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div> */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-1 flex">
              <label className="inline-flex items-center mr-4">
                <Field type="radio" name="gender" value="male" className="form-radio text-indigo-600" />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <Field type="radio" name="gender" value="female" className="form-radio text-indigo-600" />
                <span className="ml-2">Female</span>
              </label>
            </div>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Interests</label>
            <div className="mt-1">
              {interestOptions.map(option => (
                <label key={option.value} className="inline-flex items-center mr-4">
                  <Field type="checkbox" name="interests" value={option.value} className="form-checkbox text-indigo-600" />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
            <ErrorMessage name="interests" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4" >
            <label className='block text-sm font-medium text-gray-700' htmlFor="name">Street</label>
            <Field type="text" name="address.street" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <ErrorMessage name="address.street" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4" >
            <label className='block text-sm font-medium text-gray-700' htmlFor="name">City</label>
            <Field name="address.city" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <ErrorMessage name="address.city" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div  className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">State</label>
              <Field  component={Dropdown} options={states} placeholder="Select a State" name="address.state" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              </Field>
              <ErrorMessage name="address.state" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4" >
            <label className='block text-sm font-medium text-gray-700' htmlFor="name">Zipcode</label>
            <Field type="text" name="address.zip"  className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <ErrorMessage name="address.zip" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label htmlFor="userComment" className="block text-sm font-medium text-gray-700">Comments</label>
            <Field as="textarea" name="userComment" rows="4" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <ErrorMessage name="userComment" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
