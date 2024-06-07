"use client";
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import FormikTableField from './FormikTable';
import UserPermissions from './UserPermission';
import { Formik, Form, Field, FieldArray, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Dropdown from '@/app/components/Dropdown';
import MultiSelectDropdown from './MultiSelect';
import { permission } from 'process';

export interface FormValues {
	repo_name: string;
	repo_desc: string;
	repo_owner: string;
	template_repo: string;
	collabarators: Array<Option>;
	default_branches: boolean;
	protection: boolean;
   userpermissions:UserPermission[];
}
// ffffff
interface UserPermission {
  username: string;
  read: boolean;
  write: boolean;
  pull: boolean;
  push: boolean;
}
interface Option {
	value: string;
	label: string;
}

const users: Option[] = [
	{ value: '1', label: 'Abdullah' },
	{ value: '2', label: 'John' },
	{ value: '3', label: 'Ravi' },
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
		setModalOpen(false);
	};

	const [isDropdownSelected, setIsDropdownSelected] = useState<boolean>(false);
	const initialValues: FormValues = {
		repo_name: '',
		repo_desc: '',
		repo_owner: '',
		template_repo: '',
		default_branches: false,
		protection:false,
		collabarators: [],
		userpermissions: [],
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
		protection: Yup.boolean(),
		userpermissions: Yup.array().of(
			Yup.object().shape({
				username: Yup.string(),
				read: Yup.boolean(),
				write: Yup.boolean(),
				pull: Yup.boolean(),
				push: Yup.boolean(),
			})
		  ),
	});

	const handleMDropdownChange = (selectedOptions: any, setFieldValue: any, values: any) => {
		setFieldValue('collaborators', selectedOptions || []);
		const existingPermissions = values.userpermissions;
		const newPermissions = selectedOptions.map((option: any) => {
			const existingPermission = existingPermissions.find((permission: any) => permission.username === option.label);
				return existingPermission || {
				username: option.label,
				read: false,
				write: false,
				pull: false,
				push: false,
			};
		});
		setFieldValue('userpermissions', newPermissions);
	};

	const handleOptionChange = (value: string) => {
		setIsDropdownSelected(value !== '');
	};


	const createPayload = (values:FormValues) => {
		const users = values.userpermissions.map((userpermission => {
			return ({
                username: userpermission.username,
                permissions: {
					read: userpermission.read,
					write: userpermission.write,
					pull: userpermission.pull,
					push: userpermission.push,
				}
            })
		}))
		const payload = {
			users : users,
			repo_name : values.repo_name,
			repo_desc : values.repo_desc,
			repo_owner : values.repo_owner,
            template_repo : values.template_repo,
            default_branches : values.default_branches,
            protection : values.protection,
		}

		return payload
	}
	const onSubmit = async (
		values: FormValues,
		{ setSubmitting, resetForm }: FormikHelpers<FormValues>
	) => {
		// console.log(values);
		const payload = createPayload(values)
		console.log(payload);
		// handleOptionChange('');
		try {
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
							component={MultiSelectDropdown}
							options={users}
							value={values.collaborators}
							onChange={(selectedOptions: any) => handleMDropdownChange(selectedOptions, setFieldValue, values)}
						/>
						<ErrorMessage name="collabarators" component="div" />
					</div>
					<div className="mb-4">
						<button
							type='button'
							onClick={()=>{openModal()}}
							className="bg-blue-500 text-white px-4 py-2 rounded bg-indigo-600"
						>
							Permissions
						</button>
						<Modal isOpen={isModalOpen} onClose={closeModal} title="User Permissions">
							<FormikTableField fieldName="userpermissions" onClose={() => console.log('Proceed clicked')} />
						</Modal>
                    </div>
					<div className="mb-4">
						<button type="submit" onClick={()=>{console.log(values)}} disabled={isSubmitting} className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
