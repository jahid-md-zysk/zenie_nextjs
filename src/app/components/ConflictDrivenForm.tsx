import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormValues {
field1: string;
field2?: string;
fieldGroup: { subField1: string; subField2: string }[];
[key: string]: any;
}
// 
const schema = Yup.object().shape({
	field1: Yup.string().required('Field 1 is required'),
	field2: Yup.string().when('field1', {
		is: 'trigger',
		then: Yup.string().required('Field 2 is required when Field 1 is "trigger"'),
	}),
	fieldGroup: Yup.array().of(
		Yup.object().shape({
		subField1: Yup.string().required('Sub Field 1 is required'),
		subField2: Yup.string().required('Sub Field 2 is required'),
		})
	),
});

const ComplexConflictForm: React.FC = () => {
	const [showFieldGroup, setShowFieldGroup] = useState(false);
	const [dynamicFields, setDynamicFields] = useState<string[]>([]);

	const { control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
		resolver: yupResolver(schema),
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'fieldGroup',
	});

	const field1Value = watch('field1');

	useEffect(() => {
		if (field1Value === 'trigger') {
		setShowFieldGroup(true);
		} else {
		setShowFieldGroup(false);
		}
	}, [field1Value]);

	const addDynamicField = () => {
		setDynamicFields([...dynamicFields, `dynamicField${dynamicFields.length}`]);
	};

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
	};
	// 
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
		<div>
			<label>Field 1</label>
			<Controller
			name="field1"
			control={control}
			defaultValue=""
			render={({ field }) => <input {...field} />}
			/>
			{errors.field1 && <p>{errors.field1.message}</p>}
		</div>

		{showFieldGroup && (
			<>
			<div>
				<label>Field 2</label>
				<Controller
				name="field2"
				control={control}
				defaultValue=""
				render={({ field }) => <input {...field} />}
				/>
				{errors.field2 && <p>{errors.field2.message}</p>}
			</div>

			{fields.map((item, index) => (
				<div key={item.id}>
				<label>Sub Field 1</label>
				<Controller
					name={`fieldGroup[${index}].subField1`}
					control={control}
					defaultValue={item.subField1}
					render={({ field }) => <input {...field} />}
				/>
				{errors.fieldGroup && errors.fieldGroup[index] && errors.fieldGroup[index].subField1 && (
					<p>{errors.fieldGroup[index].subField1.message}</p>
				)}

				<label>Sub Field 2</label>
				<Controller
					name={`fieldGroup[${index}].subField2`}
					control={control}
					defaultValue={item.subField2}
					render={({ field }) => <input {...field} />}
				/>
				{errors.fieldGroup && errors.fieldGroup[index] && errors.fieldGroup[index].subField2 && (
					<p>{errors.fieldGroup[index].subField2.message}</p>
				)}

				<button type="button" onClick={() => remove(index)}>
					Remove
				</button>
				</div>
			))}
			<button type="button" onClick={() => append({ subField1: '', subField2: '' })}>
				Add More Fields
			</button>
			</>
		)}

		{dynamicFields.map((field, index) => (
			<div key={field}>
			<label>{field}</label>
			<Controller
				name={field}
				control={control}
				defaultValue=""
				render={({ field }) => <input {...field} />}
			/>
			{errors[field] && <p>{errors[field].message}</p>}
			</div>
		))}

		<button type="button" onClick={addDynamicField}>
			Add Dynamic Field
		</button>

		<button type="submit">Submit</button>
		</form>
	);
};

export default ComplexConflictForm;
