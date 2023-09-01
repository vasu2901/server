import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../Context/NoteContext'
import NavbarAdm from './NavbarAdm'
const UpdateStock = () => {
    const history = useNavigate()
    const context = useContext(NoteContext)
    const { updatestock } = context
    const [search, setsearch] = useState({ title: "", stock: "", price: "" })
    const onchange = (e) => {
        e.preventDefault()
        setsearch({ ...search, [e.target.name]: e.target.value })
    }
    const handleClick = () => {
        console.log(search)
        updatestock(search.title, search.stock, search.price);
        history('/adminhome')
    }
    useEffect(() => {
        if (!localStorage.getItem("admin-token")) {
            history("/login")
        }
    }, [history])
    return (
        <div>
            <NavbarAdm />
            <div className='container mx-auto' style={{ marginBottom: "5%", color: '#030303', fontSize: "18.5px", background: 'none', maxWidth: "35%", marginTop: " 5%", borderTop: "5px solid red", borderBottom: "5px solid red", borderRadius: " 10px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", paddingBottom: "5px", paddingLeft: " 5px", fontWeight: "bold" }}>
                <p className='text-center'>Update Stock</p>
                <hr />
                <form style={{ marginTop: "10%" }}>
                    <div className='mb-3'><label htmlFor="title">Title : </label><input type="text" id="title" name="title" value={search.title} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} /></div>
                    <div className='mb-3'><label htmlFor="stock">Stock : </label><input type="text" id="stock" name="stock" value={search.stock} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} /></div>
                    <div className='mb-3'><label htmlFor="price">Price : </label><input type="text" id="price" name="price" value={search.price} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} /></div>
                </form>
                <button className='btn btn-outline-danger' type="submit" onClick={handleClick}>submit</button>
            </div>
        </div>
    )
}

export default UpdateStock