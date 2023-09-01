import React, { useEffect, useContext } from 'react'
import NoteContext from '../Context/NoteContext';
import { Link, useNavigate} from 'react-router-dom';
import NavbarUser from './NavbarUser';
const MyCart = () => {
    const history = useNavigate()
    const context = useContext(NoteContext);
    const { book, price, removefromcart, viewcart } = context;
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history('/login')
        }
        else {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
            document.body.style.backgroundSize = "cover";
            viewcart();
        }
    }, [history, viewcart])
    return (
        <div>
            <NavbarUser />
            <div className='container mx-auto' style={{ background: "none", marginTop: "10%" }}>
                <h1 style={{fontSize: "75px", color:"white", fontFamily: "Times New Roman"}}>My Cart</h1>
                <table id='myTable' className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>S.No.</th>
                            <th style={{ width: "25%" }}>Email</th>
                            <th style={{ width: "25%" }}>Book</th>
                            <th style={{ width: "25%" }}>Price</th>
                            <th style={{ width: "15" }}>Remove from Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            book.map(element => {
                                return (
                                    <tr key={element.id}>
                                        <th>{element.id}</th>
                                        <th className={element.email}>{element.email}</th>
                                        <th className={element.book_title}>{element.book_title}</th>
                                        <th className={element.Purchased}>{element.Purchased}</th>
                                        <th><Link onClick={(e) => {
                                            removefromcart(element.id);
                                        }}>Remove from Cart</Link ></th>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <th ></th>
                            <th>Total:-</th>
                            <th ></th>
                            <th>{price}</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>For Payment</th>
                            <th />
                            <th />
                            <th><Link to="/buybooks">Payment</Link></th>
                            <th />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyCart