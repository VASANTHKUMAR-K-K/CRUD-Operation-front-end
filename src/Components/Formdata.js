import React from 'react';
import '../App.css';
import { MdClose } from "react-icons/md";


export default function Formdata({handleSubmit,handleOnchange, handleClose, rest}) {
  return (
    <div>
        <div className="addcontainer">
        <form onSubmit={handleSubmit}>
                {/* <div className="close-btn" onClick={()=>setAddSection(false)}><MdClose /></div> */}
        <div className="close-btn" onClick={handleClose}><MdClose /></div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={handleOnchange} value={rest.name}/>

          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={handleOnchange} value={rest.email} />

          <label htmlFor="mobile">Mobile</label>
          <input type="text" id="mobile" name="mobile" onChange={handleOnchange} value={rest.mobile}/>
          <button className="btn" >Submit</button>
        </form>
      </div>
    </div>
  )
}
