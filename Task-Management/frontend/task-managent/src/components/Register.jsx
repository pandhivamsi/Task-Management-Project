import React, { useState } from 'react'
import './Register.css'
import Header from './Header'
// import Footer from './Footer'
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()
    const [uname, setUName] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")
    const [error, setError] = useState("");

    const register = (e) => {
        e.preventDefault()
        if (role && password && cpassword && uname) {
            if (password !== cpassword) {
                setError("Password and Confirm password should be same");
                return;
            }
            if (role !== "ROLE_USER" && role !== "ROLE_ADMIN") {
                setError("Role is not proper");
                return;
            }
            fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: uname,
                    role: role,
                    password: password
                })
            })
                .then(res => {
                    navigate("/")
                    return res.text();
                })
                .catch(err => {
                    setError(err.message);
                });
        }
        else {
            setError("Details not proper")
        }
    }

    const signIn = (e) => {
        e.preventDefault()
        navigate("/")
    }

    return (
        <div>
            <Header />
            <div className="card">
                <div className="card-header">
                    <div className="text-header">Register</div>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="card-body">
                    <form action="#">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input required className="form-control" name="username" id="username" type="text" onChange={(e) => { setUName(e.target.value) }} placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Role:</label>
                            <input required className="form-control" name="role" id="role" type="text" onChange={(e) => { setRole(e.target.value) }} placeholder="Enter role : ROLE_USER" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input required className="form-control" name="password" id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input required className="form-control" name="confirm-password" id="confirm-password" type="password" onChange={(e) => { setCPassword(e.target.value) }} placeholder="Enter password" />
                        </div>
                        <button className='btn' onClick={register}>Register</button><br />
                        <a href="" onClick={signIn}>Have account? Sign in</a>
                    </form>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Register