"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import FormikTableField from '@/app/components/FormikTable';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Dropdown from '@/app/components/Dropdown';
import MultiSelectDropdown from '@/app/components/MultiSelect';

export interface FormValues {
	repo_name: string;
	repo_desc: string;
	repo_owner: string;
	template_repo: string;
	collaborators: Array<Option>;
	default_branches: boolean;
	protection: boolean;
	userpermissions:UserPermission[];
}

interface UserPermission {
	username: string;
	pull: boolean;
	push: boolean;
	admin: boolean;
	maintain: boolean;
	triage: boolean;
}
interface Option {
	value: string;
	label: string;
}

const CreateRepo: React.FC = () => {
	const [repoOwners, setRepoOwners] = useState([]);
	const [templateRepos, setTemplateRepos] = useState([]);
	const [users,setUsers] = useState([]);
	const [isModalOpen, setModalOpen] = useState(false);
	const [isDropdownSelected, setIsDropdownSelected] = useState<boolean>(false);

	useEffect(() => {
		const fetchTemplateRepos = async () => {
			const res = await fetch('/api/v1/getTemplateRepos');
			const result = await res.json();
			console.log(result);
			const templateReposData = result.data.map((repo:any) =>{ 
				return {
					...repo,
					value: repo.repo_id,
					label: repo.repo_name,
				}
			})
			setTemplateRepos(templateReposData);
		};

		const fetchOwners = async () => {
			const res = await fetch('/api/v1/owners');
			const result = await res.json();
			console.log(result);
			const owners = result.data.map((owner:any) =>{ 
				return {
					...owner,
					value: owner.owner_id,
					label: owner.owner_name,
				}
			})
			setRepoOwners(owners);
		};

		const fetchUsers = async () => {
			const res = await fetch('/api/v1/collaborators');
			const result = await res.json();
			console.log(result);
			const users = result.data.map((user:any) =>{ 
				return {
					// ...user,
					value: user.collaborator_id,
					label: user.collaborator_name,
				}
			})
			setUsers(users);
		};
		fetchUsers()
		fetchOwners();
		fetchTemplateRepos();
	}, []);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const initialValues: FormValues = {
		repo_name: '',
		repo_desc: '',
		repo_owner: '',
		template_repo: '',
		default_branches: false,
		protection:false,
		collaborators: [],
		userpermissions: [],
	};

	const validationSchema = Yup.object({
		repo_name: Yup.string().required('Name is required'),
		repo_desc: Yup.string().required('Repo Description is required'),
		repo_owner: Yup.string().required('Owner is required'),
		template_repo: Yup.string(),
		collaborators: Yup.array()
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
				pull: Yup.boolean(),
				push: Yup.boolean(),
				admin: Yup.boolean(),
				maintain: Yup.boolean(),
				triage: Yup.boolean()
			})
		),
	});

	const handleMDropdownChange = (selectedOptions: any, setFieldValue: any, values: any) => {
		console.log("selectedOptions",selectedOptions)
		setTimeout(() => {setFieldValue('collaborators', selectedOptions || []); console.log("values",values)})
		const existingPermissions = values.userpermissions;
		const newPermissions = selectedOptions.map((option: any) => {
			const existingPermission = existingPermissions.find((permission: any) => permission.username === option.label);
				return existingPermission || {
				username: option.label,
				pull: false,
				push: false,
				admin: false,
				maintain: false,
				triage: false
			};
		});
		setFieldValue('userpermissions', newPermissions);
		console.log("values",values)
	};

	const handleOptionChange = (value: string, setFieldValue: any) => {
		setIsDropdownSelected(value !== '');
		if (value !== '') {
			setFieldValue('default_branches',false)
			setFieldValue('protection', false);
		}
	};


	const createPayload = (values:FormValues) => {
		const users = values.userpermissions.map((userpermission:any )=> {
			return ({
				username: userpermission.username,
				permissions: Object.keys(userpermission).filter(key => userpermission[key] === true),
			})
		})
		const payload = {
			users : users,
			repo_name : values.repo_name,
			repo_desc : values.repo_desc,
			repo_owner_id : values.repo_owner,
			template_repo_id : values.template_repo,
			default_branches : values.default_branches,
			protection : values.protection,
		}

		return payload
	}
	const onSubmit = async (
			values: FormValues,
			{ setSubmitting, resetForm }: FormikHelpers<FormValues>
	) => {
		const payload = createPayload(values)
		console.log(JSON.stringify(payload));
		console.log(payload);
		try {
			resetForm();
			setIsDropdownSelected(false);
		} catch (error) {
			console.error('Error submitting the form', error);
		} finally {
			setSubmitting(false);
		}
	};    

	

	return (
		<div className='w-full h-full p-4'>
			<div className='w-full text-center p-2 font-bold'>Repo Creation</div>
			<div className='flex flex-row justify-center'>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ isSubmitting, values, handleChange, handleBlur, setFieldValue, validateForm, isValid }) =>
						<Form className='w-1/3 p-4 border rounded shadow-md'>
							<div className="mb-4">
								<label className='block text-sm font-medium text-gray-700' htmlFor="repo_name">Repo Name</label>
								<Field 
									type="text" 
									name="repo_name" 
									className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
								/>
								<ErrorMessage 
									name="repo_name" 
									component="div" 
									className="text-red-500 text-sm mt-1" 
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="repo_desc" className="block text-sm font-medium text-gray-700">Repo Description</label>
								<Field 
									as="textarea" 
									name="repo_desc" 
									rows="4" 
									className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
								/>
								<ErrorMessage 
									name="repo_desc" 
									component="div" 
									className="text-red-500 text-sm mt-1" 
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="repo_owner" className="block text-sm font-medium text-gray-700">Repo Owner</label>
								<Field  
									component={Dropdown} 
									options={repoOwners} 
									placeholder="Select Owner" 
									name="repo_owner" 
									className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
								/>
								<ErrorMessage 
									name="repo_owner" 
									component="div" 
									className="text-red-500 text-sm mt-1" 
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="template_repo" className="block text-sm font-medium text-gray-700">Template Repo</label>
								<Field
									component={Dropdown}
									options={templateRepos}
									placeholder="Select Repo"
									name="template_repo"
									onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
										const value = event.target.value;
										handleOptionChange(value,setFieldValue);
										setFieldValue('template_repo', value);
										console.log(values)
									}}
									className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
								/>
								<ErrorMessage 
									name="template_repo" 
									component="div" 
									className="text-red-600 text-sm mt-1" 
								/>
							</div>
							{!isDropdownSelected && (
								<>
									<div className="mb-4">
										<label className='block text-sm font-medium text-gray-700'>
											<Field 
												type="checkbox" 
												name="default_branches"  
												className="mr-2" 
											/>
											Include Default Branches
										</label>
									</div>
									<div className="mb-4">
										<label className='block text-sm font-medium text-gray-700'>
											<Field 
												type="checkbox" 
												name="protection" 
												className="mr-2" 
											/>
											Include Protection
										</label>
									</div>
								</>
							)}
							<div className="mb-4">
								<label htmlFor="collaborators" className="block text-sm font-medium text-gray-700">Select Users</label>
								<Field
									name="collaborators"
									component={MultiSelectDropdown}
									options={users}
									// value={values.collaborators}
									onChange={(selectedOptions: any) => {handleMDropdownChange(selectedOptions, setFieldValue, values);}}
								/>
								<ErrorMessage 
									name="collaborators" 
									component="div"
									className="text-red-500 text-sm mt-1" 
								/>
							</div>
							{/* <div className="mb-4">
								<label htmlFor="collabarators" className="block text-sm font-medium text-gray-700">Select Users</label>
								<Field
									name="collabarators"
									component={MultiSelectDropdown}
									options={users}
									value={values.collaborators}
									onChange={(selectedOptions: any) => {setFieldValue('collaborators', selectedOptions); console.log("setvALUE CALLEDs")}}
								/>
								<ErrorMessage 
									name="collabarators" 
									component="div" 
								/>
							</div> */}
							<div className="mb-4">
								<button
									type='button'
									onClick={() => openModal()}
									className="bg-blue-500 text-white px-4 py-2 rounded bg-indigo-600"
								>
									Permissions
								</button>
								<Modal 
									isOpen={isModalOpen} 
									onClose={closeModal} 
									title="User Permissions"
								>
									<FormikTableField 
										fieldName="userpermissions" 
										onClose={() => console.log('Proceed clicked')} 
									/>
								</Modal>
							</div>
							<div className="mb-4">
								<button 
									type="submit" 
									disabled={isSubmitting || !isValid} 
									className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								>
									Submit
								</button>
							</div>
						</Form>
					}
				</Formik>
			</div>
		</div>

	);
} 

export default CreateRepo;
