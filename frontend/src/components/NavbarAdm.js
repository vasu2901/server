import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const NavbarAdm = () => {
    const history = useNavigate()
  return (
    <div>
        <nav className="navbar bg-light fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/adminhome">Book Mania</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Book Mania</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/adminhome">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/addabook">Add a Book</Link>
                                </li>
                                <li><Link className="nav-link" to="/updatestock">Update Stock</Link></li>
                            </ul>
                            <button className="btn btn-outline-success" type="submit" id="logout" onClick={()=>{
                                localStorage.removeItem("admin-token");
                                history("/login")
                            }}>LogOut</button>
                        </div>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default NavbarAdm