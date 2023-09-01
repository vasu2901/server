import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/NoteContext';
import NavbarUser from './NavbarUser';

const Home = () => {
    const history = useNavigate()
    const context = useContext(NoteContext);
    const { book, getallbooks } = context;
    const [search, setsearch] = useState({ title: "" })
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history('/login')
        }
        else {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
            document.body.style.backgroundSize = "cover";
            getallbooks();
        }
    }, [history, getallbooks])
    const handleClick = (e) => {
        e.preventDefault();
        const filter0 = search.title;
        console.log(filter0)
        const myTable = document.getElementById('myTable');
        const tr = myTable.getElementsByTagName('tr');
        if (filter0 !== '') {
            var flag = false;
            for (let index = 0; index < tr.length; index++) {
                const td0 = tr[index].getElementsByTagName('th')[1];
                console.log(td0)
                if (td0) {
                    let txt1 = td0.textContent || td0.innerHTML;
                    if (txt1 === filter0) {
                        flag = true;
                    }
                }
            }
            if (flag === true) {
                alert("This book is available")
            }
            else {
                alert("This book is not available");
            }
        }
        else {
            alert("Please give Some input")
        }
    }
    const onchange = (e) => {
        setsearch({ ...search, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <NavbarUser />
            <div style={{ color: 'red', background: 'none', marginLeft: '400px', marginRight: "400px", marginTop: " 5%", borderTop: "5px solid red", borderBottom: "5px solid red", borderRadius: " 10px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", paddingBottom: "5px", paddingLeft: " 5px", fontWeight: "bold" }}>
                <p className='text-center'>Search for Books</p>
                <hr />
                <form className='text-center'>
                    <label htmlFor="title">Book Title : </label><input type="text" id="title" name="title" value={search.title} style={{ marginLeft: "10px" }} onChange={onchange} />
                    <hr />
                </form>
                <hr />
                <button type="button" id="Login" className="btn btn-outline-danger" style={{ marginLeft: "50px" }} onClick={handleClick}>Submit</button>
            </div>
            <div className='container mx-auto' style={{ backgroundColor: "black", marginTop: "10%" }}>
                <table id='myTable' className='table table-dark table-striped'>
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>S. No</th>
                            <th style={{ width: "25%" }}>Title</th>
                            <th style={{ width: "25%" }}>Author</th>
                            <th style={{ width: "25%" }}>Publication</th>
                            <th style={{ width: "25%" }}>Genre</th>
                            <th style={{ width: "15%" }}>Stock</th>
                            <th style={{ width: "15%" }}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            book.map(element => {
                                return (
                                    <tr className={book.id}>
                                        <th>{element.id}</th>
                                        <th className={element.title}>{element.title}</th>
                                        <th className={element.author}>{element.author}</th>
                                        <th className={element.publication}>{element.publication}</th>
                                        <th className={element.genre}>{element.genre}</th>
                                        <th className={element.stock}>{element.stock}</th>
                                        <th className={element.price}>{element.price}</th>
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

export default Home