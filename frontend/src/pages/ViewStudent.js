import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import SideNavbar from '../components/SideNavbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';


//Import API_URL
const API_URL = "http://localhost:5000/viewstudent"


const ViewStudent = () => {

  // Create state to store student data
  const [student, setStudent] = useState([]);

    //Create state to store Name, Email, Department, Gender, CGPA, Id
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [department,setDepartment]=useState("");
    const [gender,setGender]=useState("");
    const [cgpa,setCgpa]=useState("");
    const [id,setId]  = useState(null);

    //State to state to store search and tempsearch element
    const [search,setSearch] = useState('');
    const [tempSearch, setTempSearch] = useState('');

  // State and function to handle Modal Form
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = (student) => {
    setShow(true);
    setName(student.name);
    setEmail(student.email);
    setDepartment(student.department);
    setGender(student.gender);
    setCgpa(student.cgpa);
    setId(student.id);
  }


  //Function to Update the Student Data
  const updateData = ()=>
  {
    axios.put(`${API_URL}/${id}`, {name, email, department, cgpa, gender}) //Request send to server
    .then(()=>
    {
      setStudent(student.map( 
        s => s.id === id ? {...s,name,department,email,cgpa,gender} : s
      ));
      setShow(false);
    })
    alert("Updated Sucessfully")
  }

  //Function to delete the Student Data
  const deleteData = (id) =>
  {
    axios.delete(`${API_URL}/${id}`) //Request send to server
    .then(()=> {
      setStudent(student.filter(s => s.id !== id));
      alert("Deleted Successfully")
    })
  }


  // useEffect - to fetch data from API_URL
  useEffect(() => {
    fetchdata();
  }, []
  );

  const fetchdata = () => {
    axios.get(API_URL)
      .then(res => setStudent(res.data))
  }

  //Search Filtered
  const searchData = student.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.gender.toLowerCase().includes(search.toLowerCase()) || s.cgpa.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <Row>
        {/* Navigation bar */}
        <Col md={3}>
          <SideNavbar />
        </Col>
        {/* Main content */}
        <Col md={9} className='mt-3'>
          {/* Container */}
          <Container>
            <h2>Student List</h2>

            {/* Search Bar */}
            <Row className='mt-5'>
              <Col md={10}>
                <Form.Control type="text" placeholder="Search" className="rounded-pill" value={tempSearch} onChange={(e)=>setTempSearch(e.target.value)}/>
              </Col>
              <Col md={1}>
              <Button disabled={!tempSearch} onClick={()=>setSearch(tempSearch)}>Search</Button>
              </Col>
              <Col md={1}>
              <Button disabled={!tempSearch} onClick={()=>{setSearch(""); setTempSearch("")}}>Clear</Button>
              </Col>

            </Row>

              <Table hover striped  className='mt-5'>
                <thead>
                  <tr>
                    <th>SNo</th>
                    <th>Student Name</th>
                    <th>RegNo</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>CGPA</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
            {searchData.map(student =>
            (
                  <tr key={student.id}>
                    <td>{student.index}</td>
                    <td>{student.name}</td>
                    <td>{student.id}</td>
                    <td>{student.department}</td>
                    <td>{student.email}</td>
                    <td>{student.cgpa}</td>
                    <td>
                      <Button size='sm' onClick={()=>handleShow(student)}>Edit</Button> &nbsp;
                      <Button size='sm' onClick={()=>deleteData(student.id)}>Delete</Button>
                    </td>
                  </tr>
            )
          )}
          </tbody>
              </Table>
          </Container>
        </Col>
      </Row>



      {/* Modal form */}


      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control type="text" value={name} placeholder="Enter Student's Name" onChange={(e)=> setName(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Department</Form.Label>
                      <Form.Control type="text" value={department} placeholder="Enter Department" onChange={(e)=>setDepartment(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Current CGPA</Form.Label>
                      <Form.Control type="number" value={cgpa} placeholder="Enter CGPA" onChange={(e)=>setCgpa(e.target.value)}/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" value={email} placeholder="Enter Student's Email" onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <div className="d-flex gap-3">
                        <Form.Check type="radio" label="Male" value="Male" name="gender" checked={gender === "Male"} onChange={(e)=>setGender(e.target.value)} />
                        <Form.Check type="radio" label="Female" value="Female" name="gender" checked={gender === "Female"} onChange={(e)=>setGender(e.target.value)}/>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>   
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ViewStudent
