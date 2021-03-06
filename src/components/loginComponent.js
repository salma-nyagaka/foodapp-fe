import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "../assets/styles/loginpage.css";
import Navbar from "../common/navbar";
import Cookies from 'universal-cookie';


const LoginComponent = () => {
    const [error, setErrors] = useState()
    const [successResponse, setSuccessResponse] = useState()
    const cookies = new Cookies();
    let history = useHistory();

    // Login user...
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, psw } = event.target.elements;

        const data = {
            email: email.value,
            password: psw.value
        }

        try {
            const res = await axios.post('https://sapplication.link/users/login', data);
            setSuccessResponse(res.data.message)
            const role = res.data.data.role
            const token = res.data.data.token
            const id = res.data.data.id
            cookies.set('token', token)
            cookies.set('role', role)
            cookies.set('id', id)

            if (role === 'ADMIN')
                setTimeout(() => {
                    history.push('/admin')
                }, 1200);
            else if (role === 'FOOD_ATTENDANT')
                setTimeout(() => {
                    history.push('/attendant')
                }, 1200);
            else if (role === 'NORMAL_USER')
                setTimeout(() => {
                    history.push('/menu/items')
                }, 1200);

        } catch (error) {
            setErrors(error.response)

        }

    };

    const inboxOnClick = (event) => {
        event.preventDefault()
        var errors = document.getElementById(`errors`);
        errors.innerHTML = ''
        var success = document.getElementById('success-response')
        success.innerHTML = ''

    }
    return (
        <div className="login">
            {/* <Navbar /> */}
            <h1>Login</h1>
            <form onSubmit={handleSubmit} id='form'>
                <h3 class="success-response" id="success-response">{successResponse ? `${successResponse}...` : ''}</h3>
                <h3 class="errors" id="errors">{error ? error : ''}</h3>
                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" onClick={inboxOnClick} required />
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" onClick={inboxOnClick} required />

                <hr />

                <button type="submit" class="registerbtn"
                >Log In</button>
            </form>
        </div>
    );
}


export default LoginComponent;
