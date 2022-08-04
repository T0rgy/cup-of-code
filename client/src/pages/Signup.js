import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ 
    email: '', password: '', username: '' 
    });
  const [ addUser ] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div id='login'>
      
      <div className='container'>
        <Link to="/login">← Go to Login</Link>
        <div id='login-row' className='row justify-content-center align-items-center'>
          <div id='login-column' className='col-md-6'>
            <div id='login-box' className='col-md-12'>
            <form  id="login-form" onSubmit={handleFormSubmit}>
              <h2 className='text-center text-info pt-5'>Signup</h2>
              <div className="form-group">

                <label htmlFor="username">Username:</label>
                <input
                className='form-control'
                  placeholder="username"
                  name="username"
                  type="username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                className='form-control'
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                className='form-control'
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <button className=" mt-3 btn btn-info btn-md" type="submit">Submit</button>
              </div>
            </form>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Signup;
