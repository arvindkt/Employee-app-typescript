import React, { useState, useEffect} from 'react';
import {
  Form,
  FormField,
  GridRow,
  GridCol,
  Card,
  Heading
} from '@athena/forge';
import '@athena/forge/static/css/forge.css';
import {Link} from '@reach/router';
import { useAuth } from '../context/Auth';


interface IValues {
    userName :string;
    password : string;
}

const defaultState: IValues = {
   userName :"",
   password: "",
};


export default function Login (){
    const [values, setValues] = useState<IValues>(defaultState);
    const [errors, setErrors] = useState<IValues>(defaultState);
    const [ touched, setTouched ] = useState({});
    const {login, message} = useAuth();
  
  
    function validate(values:IValues){
      const validationErrors:(any) = {};
     
      if (!values.userName){
        validationErrors.userName = 'You have not entered a user name';
      }
      if(!values.password){
        validationErrors.password = 'You have not entered a password';
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
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const formErrors = validate(values);
      setErrors(formErrors);
      if (Object.keys(formErrors).length === 0){
       login(values,'/home');
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
      <div className="fe_f_all grid-demo fe_u_padding--large">
         <Heading headingTag="h3" variant="page" text="Employee application" />
     <GridRow>
          <GridCol width={{ small: 6 }}>
     
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </GridCol>
          <GridCol width={{ small: 6 }}>
        <Card>
        <Heading text="Employee Login" variant="section" headingTag="h1" className="fe_u_padding--left-large" />
        <p style ={{'color' :'red'}}> 
			{message &&  <strong> {message} </strong> }
		</p>
          <Form onSubmit={handleSubmit} buttonText="Login" labelWidth={2} layout = 'compact'>
              
        <FormField
              labelText="User name"
              id="userName"
              type ="text"
              value={values.userName || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.userName || ''}
              required
              />
              <FormField
              labelText="Password"
              id="password"
              type="password"
              value={values.password || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password || ''}
              required
              />
          </Form>
          <strong>Don't have an account? <Link to='/signup'> Sign up </Link></strong>
      </Card>
          </GridCol>
      </GridRow>
  </div>
    );
}