"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import FormikTable from '@/app/components/old/FormikTable';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Dropdown from '@/app/components/Dropdown';
import MultiSelect from '@/app/components/old/MultiSelectDropdown';

interface FormValues {
	repo_name: string;
	repo_desc: string;
	repo_owner: string;
	template_repo: string;
	collabarators: Array<Option>;
	default_branches: boolean;
	protection: boolean;
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


const users: Option[] = [
	{ value: '1', label: 'Abdullah' },
	{ value: '2', label: 'John' },
	{ value: '3', label: 'Ravi' },
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
];

const CreateRepo: React.FC = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		debugger
		setModalOpen(false);
	};
	const handleTableSubmit = ()=>{
		// event.preventDefault()
		closeModal()
		console.log('handleTableSubmit')
	}
	const [isDropdownSelected, setIsDropdownSelected] = useState<boolean>(false);
	const initialValues: FormValues = {
		repo_name: '',
		repo_desc: '',
		repo_owner: '',
		template_repo: '',
		default_branches: false,
		protection:false,
		collabarators: [],
	};

	const validationSchema = Yup.object({
		repo_name: Yup.string().required('Name is required'),
		repo_desc: Yup.string().required('Repo Description is required'),
		repo_owner: Yup.string().required('Owner is required'),
		template_repo: Yup.string(),
		collabarators: Yup.array()
			.of(
				Yup.object().shape({
					value: Yup.string().required(),
					label: Yup.string().required(),
				})
			)
			.required('At least one option must be selected')
			.min(1, 'At least one option must be selected'),
		default_branches: Yup.boolean(),
		protection: Yup.boolean()
	});

	const handleOptionChange = (value: string) => {
		setIsDropdownSelected(value !== '');
	};

	const onSubmit = async (
		values: FormValues,
		{ setSubmitting, resetForm }: FormikHelpers<FormValues>
	) => {
		console.log(values);
		console.log("-------------")
		handleOptionChange('');
		try {
			// const response = await fetch('/api/users/addUser', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
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
	return (
		<div className='w-full h-full p-4 '>
			<div className='w-full text-center p-2 font-bold'>Repo Creation</div>
			<div className='flex flex-row justify-center'>
				<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				>
				{({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
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
						<ErrorMessage name="repo_owner" component="div" className="text-red-500 text-sm mt-1" />
					</div>
					<div className="mb-4">
						<label htmlFor="template_repo" className="block text-sm font-medium text-gray-700">
						Template Repo
						</label>
						<Field
							component={Dropdown}
							options={templateRepos}
							placeholder="Select a Repo"
							name="template_repo"
							onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
								console.log("ffine")
								const value = event.target.value;
								handleOptionChange(value);
								setFieldValue('template_repo', value);
							}}
							className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						/>
						<ErrorMessage name="template_repo" component="div" className="text-red-600 text-sm mt-1" />
					</div>
					{!isDropdownSelected && (
						<>
						<div className="mb-4">
							<label className="block text-gray-700">
							<Field type="checkbox" name="default_branches"  className="mr-2" />
							Include Default Branches
							</label>
							{/* <ErrorMessage name="default_branches" component="div" className="text-red-600 text-sm mt-1" /> */}
						</div>

						<div className="mb-4">
							<label className="block text-gray-700">
							<Field type="checkbox" name="protection" className="mr-2" />
								Include Protection
							</label>
							{/* <ErrorMessage name="protection" component="div" className="text-red-600 text-sm mt-1" /> */}
						</div>
						</>
					)}
					<div className="mb-4">
						<label htmlFor="collabarators">Select Users</label>
						<Field
							name="collabarators"
							component={MultiSelect}
							options={users}
						/>
						<ErrorMessage name="collabarators" component="div" />
					</div>
					<div className="mb-4">
						<button
							onClick={openModal}
							className="bg-blue-500 text-white px-4 py-2 rounded"
						>
							Permissions
						</button>
						{/* <Modal isOpen={isModalOpen} onClose={closeModal} title="User Permissions"> */}
							<FormikTable  initialValues={users} onSubmit={handleTableSubmit}/>
						{/* </Modal> */}
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

// sdsdgg