"use client";
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Dropdown from '@/app/components/Dropdown';
import MultiSelect from '@/app/components/MultiSelectDropdown';
// import { Input } from "@/components/ui/input"

interface FormValues {
	repo_name: string;
	repo_desc: string;
	repo_owner: string;
	temlate_owner:string;
	template_repo:string;
	availabity: string;
	collabarators:Array<Option>;
	// address:Object;
	// userComment:string;
	interests:Array<string>;
}

interface Option {
	value: string;
	label: string;
}

const options: Option[] = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

const interestOptions = [
	{ value: 'sports', label: 'Sports' },
	{ value: 'music', label: 'Music' },
	{ value: 'movies', label: 'Movies' },
	{ value: 'tech', label: 'Tech' },
];

const templateRepos = [
	{ value: 'template_1', label: 'Template 1' },
	{ value: 'template_2', label: 'Template 2' },
	{ value: 'template_3', label: 'Template 3' },
	{ value: 'template_4', label: 'Template 4' },
];

const templateOwners = [
    { value: 'owner_1', label: 'Owner 1' },
    { value: 'owner_2', label: 'Owner 2' },
    { value: 'owner_3', label: 'Owner 3' },
    { value: 'owner_4', label: 'Owner 4' },
]
const CreateRepo:  React.FC = () => {
	const [states,setStates] = useState([])
	const initialValues: FormValues = {
		repo_name: '',
		repo_desc: '',
		repo_owner:'',
		temlate_owner:'',
		template_repo:'',
		availabity: "private",
		collabarators:[],
		// address : {
		// street: '',
		// city: '',
		// state: '',
		// zip: ''
		// },
		interests:[],
		// userComment:''
	};

	const validationSchema = Yup.object({
		repo_name: Yup.string().required('Name is required'),
		repo_desc: Yup.string().required('Repo Description is required'),
		repo_owner:Yup.string().required('Owner is required'),
		temlate_owner:Yup.string().required('Template Owner is required'),
		template_repo: Yup.string().required('Template Repo is required'),
		availabity: Yup.string().required('Private is required'),
		collabarators: Yup.array()
			.of(
			Yup.object().shape({
				value: Yup.string().required(),
				label: Yup.string().required(),
			})
			)
			.required('At least one option must be selected')
			.min(1, 'At least one option must be selected'),
		// address: Yup.object({
		// street: Yup.string().required('Street is required'),
		// city: Yup.string().required('City is required'),
		// state: Yup.string(),
		// zip: Yup.string().required('Zipcode is required'),
		
		// }),
		interests: Yup.array().min(1, 'At least one interest must be selected').required('At least one interest must be selected'),
	});
	
	// useEffect(() => {
	// 	fetch('/api/states')
	// 	.then((res) => {
	// 		return res.json();
	// 	})
	// 	.then((res) => {
	// 		console.log(res.data);
	// 		setStates(res.data);
	// 	});
	// }, []);
	
	const onSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
		console.log(values);
		
		try {
			// sdddddd
		// const response = await fetch('/api/users/addUser', {
		// 	method: 'POST',
		// 	headers: {
		// 	'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(values),
		// });
	
		// if (!response.ok) {
		// 	throw new Error('Network response was not ok');
		// }
	
		// const result = await response.json();
		// console.log(result);
	
		resetForm();
		} catch (error) {
		console.error('Error submitting the form', error);
		} finally {
		setSubmitting(false);
		}
	};
	//                      
	return (
		<div className='w-full h-full p-4 '>
			<div className='w-full text-center p-2 font-bold'>Repo Creation</div>
			<div className='flex flex-row justify-center'>
				<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				>
				{({ isSubmitting, values, handleChange, handleBlur}) => (
					<Form className='w-1/3 p-4 border rounded shadow-md'>
					<div className="mb-4">
						<label className='block text-sm font-medium text-gray-700' htmlFor="repo_name">Repo Name</label>
						<Field type="text" name="repo_name" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
						<ErrorMessage name="repo_name" component="div" className="text-red-500 text-sm mt-1" />
					</div>
					<div className="mb-4">
						<label htmlFor="repo_desc" className="block text-sm font-medium text-gray-700">Repo Description</label>
						<Field as="textarea" name="repo_desc" rows="4" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
						<ErrorMessage name="repo_desc" component="div" className="text-red-500 text-sm mt-1" />
					</div>
					<div className="mb-4">
						<label htmlFor="repo_owner" className="block text-sm font-medium text-gray-700">Repo Owner</label>
						<Field  component={Dropdown} options={templateOwners} placeholder="Select a State" name="repo_owner" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
						</Field>
						{/* <ErrorMessage name="repo_owner" component="div" className="text-red-500 text-sm mt-1" /> */}
					</div>
					<div className="mb-4">
						<label htmlFor="temlate_owner" className="block text-sm font-medium text-gray-700">Template Owner</label>
						<Field  component={Dropdown} options={templateOwners} placeholder="Select a State" name="temlate_owner" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
						</Field>
						{/* <ErrorMessage name="temlate_owner" component="div" className="text-red-500 text-sm mt-1" /> */}
					</div>
					<div className="mb-4">
						<label htmlFor="template_repo" className="block text-sm font-medium text-gray-700">Template Repo</label>
						<Field  component={Dropdown} options={templateRepos} placeholder="Select a State" name="template_repo" className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
						</Field>
						{/* <ErrorMessage name="template_repo" component="div" className="text-red-500 text-sm mt-1" /> */}
					</div>
					<div className="mb-4">
						{/* <label className="block text-sm font-medium text-gray-700"></label> */}
						<div className="mt-1 flex">
						<label className="inline-flex items-center mr-4">
							<Field type="radio" name="availabity" value="public" className="form-radio text-indigo-600" />
							<span className="ml-2">Public</span>
						</label>
						<label className="inline-flex items-center">
							<Field type="radio" name="availabity" value="private" className="form-radio text-indigo-600" />
							<span className="ml-2">Private</span>
						</label>
						</div>
						<ErrorMessage name="is_private" component="div" className="text-red-500 text-sm mt-1" />
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
					<div className="mb-4">
						<label htmlFor="collabarators">Select Options</label>
						<Field
							name="collabarators"
							component={MultiSelect}
							options={options}
						/>
						<ErrorMessage name="collabarators" component="div" />
					</div>
					<div className="mb-4">
						<button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
						Submit
						</button>
					</div>
					</Form>
				)}
				</Formik>
			</div>
		</div>
	);
} 

export default CreateRepo;