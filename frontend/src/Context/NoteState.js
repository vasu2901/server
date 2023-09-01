import NoteContext from "./NoteContext";
import React, { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:3000";
    const books = []
    const receipts = []
    const [book, setbook] = useState(books);
    const [price, setprice] = useState(0);
    const [receipt, setreceipt] = useState(receipts);
    const getallbooks = async () => {
        /*API CALL;*/
        const response = await fetch(`${host}/api/getallbooks`, {
            method: 'GET',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('token') }
        });
        const json = await response.json();
        setbook(json.data);
        return json;
    };
    const addaBook = async (title, author, publication, genre, stock, price) => {
        /*API CALL;*/
        const response = await fetch(`${host}/api/addBook`, {
            method: 'POST',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('admin-token') },
            body: JSON.stringify({title,author, publication, genre,stock, price})
        });
        const json = await response.json();
        if (json.success) {
            alert("book added successfully");
        }
        else {
            alert("Failed to add book");
        }
    }
    const updatestock = async (title, stock, price) => {
        /*API CALL;*/
        const response = await fetch(`${host}/api/update`, {
            method: 'POST',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('admin-token') },
            body: JSON.stringify({ title, stock, price })
        });
        const json = await response.json();
        if (json.success) {
            alert("Stock updated successfully");
        }
        else {
            alert(json.message);
        }
    }
    const addtocart = async(book_title) => {
        /*API CALL;*/
        const response = await fetch(`${host}/api/addtocart`, {
            method: 'POST',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('token') },
            body: JSON.stringify({book_title})
        });
        const json = await response.json();
        if (json.success) {
            alert("Book added to cart successfully");
        }
        else {
            alert(json.message);
        }
    }
    const viewcart = async () => {
        /*API CALL;*/
        const response = await fetch(`${host}/api/mycart`, {
            method: 'GET',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('token') }
        });
        const json = await response.json();
        if (json.success) {
            setbook(json.data);
            setprice(json.total);
        }
        else {
            alert("sorry no book added to cart");
        }
    };
    const buybook = async (price) => {
        const response = await fetch(`${host}/api/buy`, {
            method: 'POST',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('token') },
            body: JSON.stringify({ price })
        });
        const json = await response.json();
        if (json.success) {
            setreceipt(json.receipt);
            alert("Thank you for purchasing the book.")
        }
        else {
            console.log(json.message);
        }
    }
    const removefromcart = async(id) => {
        const response = await fetch(`${host}/api/removefromcart/${id}`, {
            method: 'GET',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('token') },
        });
        const json = await response.json();
        if(json.success)
        {
            alert("Removed from Cart Successfully");
        }
        else
        {
            alert("Sorry some error occured")
        }
    }

    const setreview = async(id, review) => {
        const response = await fetch(`${host}/api/review/${id}`, {
            method: 'POST',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('token') },
            body: JSON.stringify({ review })
        });
        const json = await response.json();
        if(json.success)
        {
            setbook(json.data);
            alert("Review updated successfully");
        }
        else
        {
            alert("Sorry some error occured")
        }
    }
    const mypurchase = async() => {
        const response = await fetch(`${host}/api/mypurchase`, {
            method: 'GET',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('token') },
        });
        const json = await response.json();
        if(json.success)
        {
            setreceipt(json.data);
        }
        else
        {
            alert("Sorry some error occured")
        }
    }
    const allpurchase = async() => {
        const response = await fetch(`${host}/api/allpurchase`, {
            method: 'GET',
            headers: { 'content-type': 'Application/JSON', 'Auth-Token': localStorage.getItem('admin-token') },
        });
        const json = await response.json();
        if(json.success)
        {
            setreceipt(json.data);
        }
        else
        {
            alert("Sorry some error occured")
        }   
    }
    return (
        <NoteContext.Provider value={{book: book, setbook: setbook,price: price, setprice: setprice, receipt: receipt, 
            setreceipt: setreceipt, getallbooks: getallbooks, addaBook: addaBook, updatestock: updatestock, addtocart: addtocart,
            viewcart: viewcart, buybook: buybook, removefromcart: removefromcart, setreview: setreview, mypurchase: mypurchase, allpurchase: allpurchase,
        }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState;