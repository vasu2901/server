import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import image from './loginori.png'
import "../App.css"
const Signup = () => {
  const [details, setdetails] = useState({ first_name: "", last_name: "", email: "", Password: "", phone: "" });
  let history = useNavigate();
  const check = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:3000/api/register", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ first_name: details.first_name, last_name: details.last_name, password: details.Password, email: details.email, phone: details.phone })
    });
    const json = await response.json();
    if (json.message === "please verify") {
      localStorage.setItem('token', json.token);
      console.log(json);
      alert(json.user.otp)
      history('/verify')
    }
    else {
      alert(json.message);
      history('/')
    }
  }
const onChange = (e) => {
  setdetails({ ...details, [e.target.name]: e.target.value });
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
    <div className="container mx-auto" id='signuppage1'>
      <div className='row'>
        <div className='col'>
          <img id="signuppht1" className='mx-auto' src={image} alt="Girl in a jacket" />
        </div>
        <div className='col' id='lgdv1'><p className='text-center' style={{ color: "black", fontSize: "35px" }}>Sign Up </p>
          <div>
            <br />
            <form className='loginform1'>
              <label htmlFor="first_name" style={{fontSize: "25px", color: "red", marginLeft: "-2%"}}>First Name : </label><input type="text" id="first_name" value={details.first_name} name="first_name" onChange={onChange} />
              <hr />
              <label htmlFor="last_name" style={{fontSize: "25px", color: "red", marginLeft: "-2%"}}>Last Name : </label><input type="text" id="last_name" value={details.last_name} name="last_name" onChange={onChange} />
              <hr />
              <label htmlFor="email" style={{fontSize: "25px", color: "red", marginLeft: "-2%"}}>Email Id : </label><input type="text" id="email" name="email" value={details.email} onChange={onChange} />
              <hr />
              <label htmlFor="Password" style={{fontSize: "25px", color: "red", marginLeft: "-2%"}}>Password : </label><input type="password" id="Password" value={details.Password} name="Password" onChange={onChange} />
              <hr />
              <label htmlFor="phone" style={{fontSize: "25px", color: "red", marginLeft: "-2%"}}>Phone No.: </label><input type="text" id="phone" value={details.phone} name="phone" onChange={onChange} />
              <hr />
              <button type="button" id="Login" className="btn mx-auto btn-dark" style={{ marginLeft: "35%" }} onClick={check}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default Signup