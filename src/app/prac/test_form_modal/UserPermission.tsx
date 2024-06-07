import React from 'react';
import { Field, FieldArray, FieldArrayRenderProps } from 'formik';

import {FormValues} from './page';
interface UserPermissionsProps {
  values: FormValues
}

const UserPermissions: React.FC<UserPermissionsProps> = ({ values }) => (
  <div>
    <label>User Permissions</label>
    <FieldArray name="userpermissions">
      {({ push, remove }: FieldArrayRenderProps) => (
        <div>
          {values.collabarators.map((_, index) => (
            <div key={index}>
              <Field value={_.label} name={`userpermissions.${index}.username`} placeholder="Username" />
              <label>
                <Field name={`userpermissions.${index}.read`} type="checkbox" />
                Read
              </label>
              <label>
                <Field name={`userpermissions.${index}.write`} type="checkbox" />
                Write
              </label>
              <label>
                <Field name={`userpermissions.${index}.pull`} type="checkbox" />
                Pull
              </label>
              <label>
                <Field name={`userpermissions.${index}.push`} type="checkbox" />
                Push
              </label>
              {/* <button type="button" onClick={() => remove(index)}>Remove</button> */}
            </div>
          ))}
          {/* <button type="button" onClick={() => push({ username: '', read: false, write: false, pull: false, push: false })}>
            Add User Permission
          </button> */}
        </div>
      )}
    </FieldArray>
  </div>
);

export default UserPermissions;
