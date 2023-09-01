import React, { useContext, useEffect } from 'react'
import NavbarUser from './NavbarUser'
import { useNavigate, Link } from 'react-router-dom'
import NoteContext from '../Context/NoteContext'

const MyPurchase = () => {
    const context = useContext(NoteContext)
    const {receipt, mypurchase} = context
    const history = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history('/login')
        }
        else {
            console.log(receipt)
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
            document.body.style.backgroundSize = "cover";
            mypurchase();
        }
    }, [history, receipt, mypurchase])
    return (
        <div>
            <NavbarUser />
            <div className='container' style={{ background: "none", marginTop: "10%",}}>
                <h1 style={{fontSize: "75px", color:"white", fontFamily: "Times New Roman"}}>My Purchase History</h1>
                <table id='myTable' className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>S.No.</th>
                            <th style={{ width: "25%" }}>Email</th>
                            <th style={{ width: "25%" }}>Book</th>
                            <th style={{ width: "25%" }}>Price</th>
                            <th style={{ width: "15%" }}>Review</th>
                            <th style={{ width: "25%" }}>Set Review</th>
                            <th style={{ width: "25%" }}>Download Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            receipt.map(element => {
                                return (
                                    <tr key={element.id}>
                                        <th>{element.id}</th>
                                        <th className={element.Email}>{element.Email}</th>
                                        <th className={element.book_title}>{element.book_title}</th>
                                        <th className={element.Price}>{element.Price}</th>
                                        <th className={element.review_title}>{element.review_title}</th>
                                        <th ><Link onClick={()=>{
                                            localStorage.setItem("review_id",element.id);
                                            history("/setreview")
                                        }}>Set Reviews</Link></th>
                                        <th className={"download url"}><Link to="https://www.cole13.com">Download Url</Link></th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyPurchase