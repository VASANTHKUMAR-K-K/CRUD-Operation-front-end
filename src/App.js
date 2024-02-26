import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Formdata from './Components/Formdata';

axios.defaults.baseURL = "http://localhost:8080"

function App() {
  const [addSection, setAddSection]= useState(false);
  const [editSection,setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  })
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id:"",
  })
  const [dataList , setDataList]= useState([])
  const handleOnchange = (e)=>{
    const {value, name} = e.target;
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const data =  await axios.post("/create", formData)
   //console.log(data)
    // console.log(formData)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getfetchData()
      setFormData({
        name: "",
        email: "",
        mobile: "",
      })
    }
  }
  const getfetchData = async ()=>{
    const data= await axios.get("/")
    //console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getfetchData()
  },[])
  //console.log(dataList);

  const handleDelete = async (id)=>{
    const data= await axios.delete("/delete/"+id)
    if(data.data.success){
      getfetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate =async (e)=>{
    e.preventDefault()
    const data= await axios.put("/update",formDataEdit)
    console.log(data)
    if(data.data.success){
    getfetchData()
     alert(data.data.message)
     setEditSection(false)
    }
  }
  const handleEditOnchange = async (e)=>{
    const {value, name} = e.target;
    setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }
  const handleEdit = (ele)=>{
    //console.log(ele)
    setFormDataEdit(ele)
    setEditSection(true)
  }
  return (
    <>
    <div className="container">
      <h1>STUDENTS DETAILS</h1>
      <button className="btn btn-success btn-lg" onClick={()=>setAddSection(true)}>Add</button>
      {
        addSection && (
          <Formdata
          handleSubmit ={handleSubmit}
          handleOnchange={handleOnchange}
          handleClose={()=>setAddSection(false)}
          rest={formData}
          />
        )
      }
      {
        editSection && (
          <Formdata 
          handleSubmit ={handleUpdate}
          handleOnchange={handleEditOnchange}
          handleClose={()=>setEditSection(false)}
          rest={formDataEdit}
          />
        )
      }
      <div className='tablecontainer'>
        <table className="table table-striped">
          <thead>
            <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>MOBILE</th>
            <th>EDIT</th>
            <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            { dataList[0] ? (
              dataList.map((ele,index)=>{
                //console.log(ele)
                return(
                  <tr key={index}>
                  <td >{ele.name}</td>
                  <td>{ele.email}</td>
                  <td>{ele.mobile}</td>
                  <td>
                     <button className="btn btn-warning btn-sm" onClick={()=>handleEdit(ele)}>Edit</button></td>
                     <td>
                     <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(ele._id)}>Delete</button>
                     </td>
                  </tr>
                )
              }))
              :(
                <h5>no data</h5>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default App;
