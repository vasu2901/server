import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from "./loginori.png"
const Deactivate = () => {
    const [login, setlogin] = useState({ email: "", password: "" });
    let history = useNavigate();
    const user = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:3000/api/deactivate", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: login.email, password: login.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.message === "please verify") {
            localStorage.setItem("token", json.token);
            alert(`your otp is ${json.otp}`)
            history("/reverify")
        }
        else{
                alert("wrong credentials")
                history('/deactivate')
            }
        }
    const onChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
        document.body.style.backgroundSize = "cover";

    }, [])
    return (
        <>
            <div className="container-fluid" id='nav1'>
                <Link className="mx-auto" to="/" style={{textDecoration: "none",}}>Book Mania</Link>
            </div>
            <div className="container mx-auto" id='loginpage1' >
                <div className='row mx-auto'>
                    <div className='col md-2'>
                        <img id="loginpht1" className='mx-auto' src={image} alt="Girl in a jacket" style={{ opacity: "85%" }} />
                    </div>
                    <div className='col' id='lgdv1'><p className='text-center' style={{ color: "black", fontSize: "35px" }}><strong>Account  Deletion</strong></p>
                        <div>
                            <br />
                            <form className='loginform1'>
                                <label htmlFor="Username" style={{fontSize: "25px", color: "red", marginLeft: "-2%"}}><strong>Email : </strong></label><input type="text" id="email" value={login.email} name="email" onChange={onChange} />
                                <hr />
                                <label htmlFor="Password" style={{fontSize: "25px", color: "red", marginLeft: "-2%"}}>Password : </label><input type="password" id="password" value={login.password} name="password" onChange={onChange} />
                                <hr />
                                <button type="button" id="Login" className="btn btn-outline-primary" style={{ marginLeft: "35%" }} onClick={user}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deactivate