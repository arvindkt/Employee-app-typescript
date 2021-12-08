import React from 'react';
import {
  Card
} from '@athena/forge';
import {useAuth} from '../context/Auth';

export default function Viewprofile () {
    
  const {employee} = useAuth();
  
  return (
    <Card
      headingText="View details"
      className="fe_u_margin--large"
      style={{ maxWidth: '480px' }}
      padded
    >
      <p className="fe_u_color--muted">
        <span className="fe_u_font-weight--semibold">ID:</span>
        <span className="fe_u_font-weight--light">{employee.id}</span><br/>
        <span className="fe_u_font-weight--semibold">First name: </span>
        <span className="fe_u_font-weight--light">{employee.firstName}</span><br/>
        <span className="fe_u_font-weight--semibold">Last Name: </span>
        <span className="fe_u_font-weight--light">{employee.lastName}</span><br/>
        <span className="fe_u_font-weight--semibold">Email Address: </span>
         <span className="fe_u_font-weight--light">{employee.email}</span><br/>
        <span className="fe_u_font-weight--semibold">Phone number: </span>
        <span className="fe_u_font-weight--light">{employee.phoneNo}</span><br/>
      </p>
    </Card>
  );
}