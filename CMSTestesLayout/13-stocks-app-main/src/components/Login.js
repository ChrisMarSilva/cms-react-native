import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { signIn } from '../auth/Authentication';
import validator from 'validator';
import UserContext from '../user-context/user-context';

export default function Login() {
    const [login, setLogin] = useState(false);
    const [err, setErr] = useState(null);
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            setLogin(true);
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        if (validator.isEmail(username) && password) {
            const response = await signIn(username, password);

            if (response.status === 0) {
                setLogin(true);
                console.log(response);
                setUser({ username });
            } else {
                setErr('Check login credentials');
            }
        } else {
            setErr('Check login credentials');
        }
    }
    return (
        <div>
            <h1>Login</h1>
            {err && <p>{err}</p>}
            <form onSubmit={handleSubmit}>
                Username: <input type="text" name="username"></input><br />
                Password: <input type="password" name="password"></input><br />
                <button type="submit">Submit</button>
            </form>
            {login && (<Redirect to="/portfolio" />)}
        </div>
    );
}