import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const history = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history('/')
        }
    }, [history])
    return (
        <div>
            <nav className="navbar bg-white fixed-top shadow p-3 mb-5 bg-body rounded">
                <div className="container-fluid">
                    <Link className="navbar-brand mx-auto" to="/">Book Mania</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Contents</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Books</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">My Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">My Books</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Settings
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/">Log Out</Link></li>
                                        <li><Link className="dropdown-item" to="/">Deactivate</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar