import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const NavbarUser = () => {
    const history = useNavigate();
    return (
        <div>
            <nav className="navbar bg-light fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/userhome">Book Mania</Link>
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
                                    <Link className="nav-link active" aria-current="page" to="/userhome">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/MyCart">My Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/addtocart">Add to Cart</Link>
                                </li>
                                <li><Link className="nav-link" to="/MyPurchases">My Purchases</Link></li>
                                <li><Link className="dropdown-item" to="/deactivate">Delete Account</Link></li>
                                <hr />
                                <li><button className="btn btn-outline-success" type="submit" id="logout" onClick={() => {
                                    localStorage.removeItem("token");
                                    history("/login")
                                }}>LogOut</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarUser