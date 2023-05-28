import React, { useState, useEffect, useContext } from 'react';
import validator from 'validator';
import { register } from '../auth/Authentication'
import { Redirect } from 'react-router-dom';
import UserContext from '../user-context/user-context';

export default function Register() {
    const [registration, setRegistration] = useState(false);
    const [err, setError] = useState(null);
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            setRegistration(true);
        }
    }, [user]);
    const handleSubmit = async (e) => {
        console.log('registering');
        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        console.log(validator.isEmail(username), validator.isStrongPassword(password))

        if (validator.isEmail(username) && validator.isStrongPassword(password)) {
            const registration = await register(username, password);
            if (registration.status === 0) {
                setRegistration(true);
                setUser({ username });
            } else {
                setError(registration.error.message);
            }
        } else {
            setError('Check email and password');
        }
    }
    return (
        <div>
            <h1>Register</h1>
            {err && <p>{err}</p>}
            <form onSubmit={handleSubmit}>
                Username: <input type="text" name="username"></input><br />
                Password: <input type="password" name="password"></input><br />
                <button type="submit">Submit</button>
            </form>
            {
                registration && (<Redirect to="/portfolio" />)
            }
        </div>
    );

}
