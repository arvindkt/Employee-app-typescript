import React, { useState, useEffect } from 'react';
import {
  Form,
  FormField,
  Card
} from '@athena/forge';
import '@athena/forge/static/css/forge.css';
import { useAuth } from '../context/Auth';


function UpdateEmployee (){

    interface IValues {
        firstName : string;
        lastName : string;
        email : string;
        userName :string
        phoneNo : string | number;
      }
      
      const defaultState: IValues = {
        firstName : "",
        lastName : "",
        userName :"",
        email: "", 
        phoneNo :""
      };


  const [ values, setValues ] = useState(defaultState);
  const [ errors, setErrors ] = useState(defaultState);
  const [ touched, setTouched ] = useState({});
  const { employee, message, update } = useAuth();

  useEffect(() => {
       setValues(employee)
  }, [])

 function validate(values:IValues){
    const validationErrors:(any) = {};
    if (!values.firstName ){
        validationErrors.firstName = 'You have not entered a first name';
    }
    if (!values.lastName){
        validationErrors.lastName = 'You have not entered a last name';
    }
    if (!values.userName){
      validationErrors.userName = 'You have not entered a user name';
    }
    if (!values.email){
        validationErrors.email = 'You have not entered an email address';
    }
    else if (!/\S+@\S+.\S+/.test(values.email)){
        validationErrors.email = 'Email address should match the format "person@domain.com"';
    }
    if(!values.phoneNo){
        validationErrors.phoneNo = 'You have not entered a phone number';
    }
    
    return validationErrors;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.id;
    const value = event.target.value;
    setValues( previousValues => ({ ...previousValues, [name]: value }) );
    if (!touched[name]){
      setTouched( previousTouched => ({ ...previousTouched, [name]: true }) );
    }
  };
  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    const formErrors = validate(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0){
     update(values);
    }
  };

  const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.id;
    if (touched[name]){
      const formErrors = validate(values);
      setErrors(previousErrors => ({ ...previousErrors, [name]: formErrors[name] }));
    }

  }
  
  return (
    <Card
    headingText="View details"
    className="fe_u_margin--large"
    style={{ maxWidth: '700px' }}
    padded
  >
    <div className="fe_f_all grid-demo fe_u_padding--large" >
     <Form onSubmit={handleUpdate} buttonText="Update" labelWidth={3} layout = 'compact'>
        <FormField
			labelText="First name"
            id="firstName"
            type ="text"
			value={values.firstName || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.firstName || ''}
			required
			/>
			<FormField
			labelText="Last name"
            id="lastName"
            type ="text"
			value={values.lastName ||''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.lastName || ''}
			required
			/>
      <FormField
			labelText="User name"
             id="userName"
            type ="text"
			value={values.userName ||''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.userName || ''}
			required
			/>
			<FormField
			labelText="Email"
			id="email"
			type="email"
			value={values.email || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.email || ''}
			required
			/>
		<FormField
			labelText="Phone Numer"
			id="phoneNo"
			type="text"
			value={values.phoneNo ||''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.phoneNo || ''}
			required
			/>
        </Form>
        <p style ={{'color' :'green'}}> 
			{message &&  <strong> {message} </strong> }
		</p>
    </div>
    </Card>
  );
}

export default UpdateEmployee;