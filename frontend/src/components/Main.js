import React, { useEffect } from 'react'
import { Link} from 'react-router-dom'
const Main = () => {
  useEffect(() => {
    localStorage.clear()
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
      document.body.style.backgroundSize = "cover";
  }, [])
  return (
    <div className='container mx-auto' id='main'>
      <div className="container-fluid" id="nav2">
        <Link className="mx-auto" to="/" style={{ textDecoration: "none" }}>Book Mania</Link>
      </div>
      <h1 className='mx-auto ' style={{ color: "Black", fontFamily: "Times New Roman" }}>Welcome to BookMania</h1>
      <h3 style={{ color: "White", fontFamily: "Times New Roman"  }}>For Login/Signup- <Link to="/login" style={{ color: "blueviolet", textDecoration: "none" }}>Click Here</Link></h3>
    </div>
  )
}

export default Main