import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import image from '../loginpht1.png'
export const Reverify = () => {
    const [note, setnote] = useState({ email: "", otp: "" })
    const history = useNavigate()
    const verify = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/api/reverify", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ email: note.email, otp: Number(note.otp) })
        });
        const json = await response.json();
        console.log(json.message);
        if (json.message === "Account Deactivated") {
            alert("Thank you for beign our user")
            history('/signin');
        }
        else {
            console.log("Failed to verify")
        }
    }
    const onchange = (e) => {
        console.log({ [e.target.name]: e.target.value })
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
        document.body.style.backgroundSize = "cover";
    }, [])
    return (
        <div>
            <div className="container-fluid" id="nav2">
                <Link className="mx-auto" to="/" style={{ textDecoration: "none" }}>Book Mania</Link>
            </div>
            <div className="container mx-auto" id='loginpage1'>
                <div className='row'>
                    <div className='col'>
                        <img id="loginpht1" className='mx-auto' src={image} alt="Girl in a jacket" />
                    </div>
                    <div className='col' id='lgdv1'><p className='text-center' style={{ color: "white", fontSize: "25px" }}>Verification</p>
                        <div>
                            <br />
                            <form className='loginform1'>
                                <label htmlFor="Username" style={{ fontSize: "25px", color: "red", marginLeft: "-2%"}}>Email : </label><input type="text" id="mail" value={note.email} name="email" onChange={onchange} />
                                <hr />
                                <label htmlFor="Password" style={{ fontSize: "25px", color: "red", marginLeft: "-2%"}}>otp : </label><input type="text" id="otp" value={note.otp} name="otp" onChange={onchange} />
                                <hr />
                                <button type="button" id="Login" className="btn btn-outline-primary" style={{ marginLeft: "35%" }} onClick={verify}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
