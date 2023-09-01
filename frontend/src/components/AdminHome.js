import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarAdm from './NavbarAdm'
import NoteContext from '../Context/NoteContext'
export const AdminHome = () => {
    const history = useNavigate()
    const context = useContext(NoteContext)
    const { receipt, allpurchase } = context;
    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            history('/login')
        }
        else {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
            document.body.style.backgroundSize = "cover";
            allpurchase();
        }
    }, [history, allpurchase])
    return (
        <div>
            <NavbarAdm />
            <div className='container' style={{ backgroundColor: "white", marginTop: "10%", }}>
                <table id='myTable' className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>S.No.</th>
                            <th style={{ width: "25%" }}>Email</th>
                            <th style={{ width: "25%" }}>Book</th>
                            <th style={{ width: "25%" }}>Price</th>
                            <th style={{ width: "15%" }}>Review</th>
                            <th style={{ width: "25%" }}>Download Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            receipt.map(element => {
                                return (
                                    <tr>
                                        <th>{element.id}</th>
                                        <th className={element.Email}>{element.Email}</th>
                                        <th className={element.book_title}>{element.book_title}</th>
                                        <th className={element.Price}>{element.Price}</th>
                                        <th className={element.review_title}>{element.review_title}</th>
                                        <th className={"download url"}>Download Url</th>
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