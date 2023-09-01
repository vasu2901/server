import React, { useContext, useEffect, useState } from 'react'
import NavbarUser from './NavbarUser'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../Context/NoteContext'
const SetReview = () => {
    const history = useNavigate()
    const context = useContext(NoteContext)
    const { setreview } = context
    const [search, setsearch] = useState({ review: "", })
    const onchange = (e) => {
        e.preventDefault()
        setsearch({ ...search, [e.target.name]: e.target.value })
    }
    const handleClick = () => {
        console.log(search)
        setreview(localStorage.getItem("review_id"), search.review);
        localStorage.removeItem("review_id");
        history('/MyPurchases')
    }
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            history("/login")
        }
    }, [history])
    return (
        <div>
            <NavbarUser />
            <div style={{ color: 'red', background: 'none', marginLeft: '400px', marginRight: "400px", marginTop: " 5%", borderTop: "5px solid red", borderBottom: "5px solid red", borderRadius: " 10px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", paddingBottom: "5px", paddingLeft: " 5px", fontWeight: "bold" }}>
                <h1 style={{ fontSize: "75px", color: "black", fontFamily: "Times New Roman" }}>Set Review</h1>
                <hr />
                <form style={{ marginTop: "10%" }}>
                    <label htmlFor="review">Review : </label><input type="text" id="review" name="review" value={search.review} style={{ marginLeft: "10px", marginTop: "5px" }} onChange={onchange} />
                </form>
                <hr />
                <button type="submit" className='btn btn-outline-primary' onClick={handleClick}>submit</button>

            </div>
        </div>
    )
}

export default SetReview