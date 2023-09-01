import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../Context/NoteContext'
import NavbarUser from './NavbarUser'
const BuyBook = () => {
    const history = useNavigate()
    const context = useContext(NoteContext)
    const { buybook } = context
    const [search, setsearch] = useState({ price: "" })
    const onchange = (e) => {
        setsearch({ ...search, [e.target.name]: e.target.value })

    }
    const handleClick = () => {
        console.log(search)
        buybook(search.price);
        history('/userhome')
    }
    return (
        <div>
            <NavbarUser />
            <div style={{ color: 'red', background: 'none', marginLeft: '400px', marginRight: "400px", marginTop: " 5%", borderTop: "5px solid red", borderBottom: "5px solid red", borderRadius: " 10px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", paddingBottom: "5px", paddingLeft: " 5px", fontWeight: "bold" }}>
                <h1 style={{ fontSize: "75px", color: "black", fontFamily: "Times New Roman" }}>Payment</h1>
                <hr />
                <form className='container mx-auto my-5'>
                    <div className='mb-3'><label htmlFor="price">Amount : </label><input type="text" id="price" name="price" value={search.price} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} /></div>
                </form>
                <hr />
                <button type="submit" className='btn btn-outline-danger' onClick={handleClick}>submit</button>
            </div>
        </div>
    )
}

export default BuyBook