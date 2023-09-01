import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/NoteContext';
import NavbarAdm from './NavbarAdm';
const Addbook = () => {
    const history = useNavigate();
    const context = useContext(NoteContext)
    const { addaBook } = context;
    const [bookdetails, setbookdetails] = useState({ title: "", author: "", publication: "", genre: "", stock: "", price: "" });
    const onchange = (e) => {
        e.preventDefault();
        setbookdetails({ ...bookdetails, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault()
        addaBook(bookdetails.title, bookdetails.author, bookdetails.publication, bookdetails.genre, bookdetails.stock, bookdetails.price);
        history('/adminhome')
    }
    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            history('/login')
        }
        else {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
            document.body.style.backgroundSize = "cover";
        }
    }, [history])
    return (
        <>
            <NavbarAdm />
            <div className='container mx-auto' style={{marginBottom: "5%", color: '#030303',fontSize: "18.5px", background: 'none', maxWidth: "35%", marginTop: " 5%", borderTop: "5px solid red",borderBottom: "5px solid red", borderRadius: " 10px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", paddingBottom: "5px", paddingLeft: " 5px", fontWeight: "bold" }}>
                <p className='text-center'>Add the Book</p>
                <hr />
                <form >
                    <label htmlFor="title">Title of the Book : </label><input type="text" id="title" name="title" value={bookdetails.title} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} />
                    <hr />
                    <label htmlFor="author">Author : </label><input type="text" id="author" name="author" value={bookdetails.author} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} />
                    <hr />
                    <label htmlFor="publication">Publication : </label><input type="text" id="publication" name="publication" value={bookdetails.publication} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} />
                    <hr />
                    <label htmlFor="genre">Genre : </label><input type="text" id="genre" name="genre" value={bookdetails.genre} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} />
                    <hr />
                    <label htmlFor="stock">Stock  : </label><input type="text" id="stock" name="stock" value={bookdetails.stock} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} />
                    <hr />
                    <label htmlFor="price">Price : </label><input type="text" id="price" name="price" value={bookdetails.price} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} />
                    <hr />
                </form>
                <hr />
                <button type="button" id="Login" className="btn btn-outline-danger" style={{ marginLeft: "50px" }} onClick={handleClick}>Submit</button>
            </div>
        </>
    )
}

export default Addbook