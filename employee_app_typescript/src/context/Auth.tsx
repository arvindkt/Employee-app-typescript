import React, { useState } from 'react';
import {navigate} from '@reach/router';

export const BASIC_AUTH_TOKEN = 'auth_token'


interface Employeeprops  {
    id ?:string;
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    phoneNo:number | string;
}
const defaultState: Employeeprops = {
    id : '',
    firstName : "",
    lastName : "",
    userName :"",
    email: "", 
    phoneNo :""
  };
type ContextProps  = { 
    employee:Employeeprops;
    authenticated?: boolean;
    message?: string;
    login(any,string) : void;
    register(any,string):void;
    update(any):void;
    logout(string):void;
    setMessage(string):void;
  };

const AuthContext = React.createContext<Partial<ContextProps>>({});

function AuthProvider(props) {
    const [employee,setEmployee] = useState<Employeeprops>(defaultState);
    const [authenticated,setAuth] = useState(false);
    const [message,setMessage] = useState();

    function createBasicAuthToken(username, password) {
        console.log('Basic ' + window.btoa(username + ":" + password));
        return 'Basic ' + window.btoa(username + ":" + password)
    }

  const login = async (employee,redirectURL) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                'authorization':  createBasicAuthToken(employee.userName, employee.password),
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "cache-control": "no-cache"  },
            body: JSON.stringify(employee),
            withCredentials: true,
            crossdomain: true,
        };
        const response = await fetch('http://10.8.211.233:8080/api/employee/login' ,requestOptions);
        if (response.status == 401) {
            setAuth(false);
            setMessage("Invalid username and password");
            setTimeout(
                () =>  
                setMessage(""),
                2000
              )
        }
        else {
            const data = await response.json();
            setAuth(true);
            sessionStorage.setItem(BASIC_AUTH_TOKEN,createBasicAuthToken(employee.userName, employee.password));
            setEmployee(data);
            if (redirectURL) {
                navigate(redirectURL)
            }
        }
        
    }

    const register = async (employee,redirectURL) => {
        setMessage("");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        };
        const response = await fetch('http://10.8.211.233:8080/api/employee/save' ,requestOptions);
        const data = await response.json();
        if(!response.ok) {
            setMessage("Failed to create an account");
            throw { status: response.status, fullError: data } 
        }
        else {
            setAuth(true);
            setEmployee(data);
            if(redirectURL) {
                navigate(redirectURL)
            }
        }
    }

    const update = async (employee) => {
        console.log(employee)
        setMessage("");
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,
            'authorization': sessionStorage.getItem(BASIC_AUTH_TOKEN),
             },
            body: JSON.stringify(employee)
        };
        const response = await fetch('http://10.8.211.233:8080/api/employee/'+employee.id ,requestOptions);
        const data = await response.json();
        if(!response.ok) {
            setMessage("Failed to update");
            throw { status: response.status, fullError: data } 
        }
        else {
            setEmployee(data);
            setMessage("Successfully updated the employee details");
            setTimeout(
                () =>  
                    setMessage(""),
                    3000
            )
        }
    }

    const logout = (redirectURL:string) => {
        setAuth(false);
        setMessage("");
        sessionStorage.removeItem(BASIC_AUTH_TOKEN)
        setEmployee(defaultState);
        if (redirectURL) {
            navigate(redirectURL)
        } 
    }
     return(
        <AuthContext.Provider
            value = {{employee,login,authenticated,register,update,logout,message,setMessage}} {...props} />
    )
}

export const useAuth = () =>React.useContext(AuthContext);

export default AuthProvider;