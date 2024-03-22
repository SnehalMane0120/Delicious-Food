import React, { useState } from 'react'
import {Link,Navigate, useNavigate} from 'react-router-dom'
export default function Signup ()
{  
    const navigate = useNavigate();
    const handleLogOut = () =>
    {
        navigate( "/login" );
    }
    const [ credentials, setcredentials ] = useState( {name:"",email:"",password:"",geolocation:""} )
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        const response = await fetch( "http://localhost:8000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { name: credentials.name, email: credentials.email, password:credentials.password, location: credentials.geolocation } )
        } );
        const json = await response .json()
        console.log( json );

        if ( !json.success )
        {
            alert("Enter Valid Creditals")
        }
    }
    const onChange = ( event ) =>
    {
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={ handleSubmit }>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="name" className="form-control" name='name' value={ credentials.name } onChange={ onChange }  />
                     
                    </div>
                  
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                           
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={ credentials.password } onChange={ onChange } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={ credentials.geolocation } onChange={ onChange }  />
                    </div>
                   
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                    <Link to="/" className='m-3 btn btn-danger'onClick={handleLogOut}> LogOut</Link>
                </form>
            </div>
        </> 
  )
    
}
