import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [login, { error }] = useMutation(LOGIN_USER);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: {
                    username,
                    password
                }
            })
            Auth.login(data.login.token);
        }
        catch (err) {
            console.error(err);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                name='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder='Username'
                type='text'
                required
            />
            <input
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                type='password'
                required
            />
            <button>Login</button>
            {error && <div>Invalid credentials</div>}
        </form>
    )
}

export default Login;