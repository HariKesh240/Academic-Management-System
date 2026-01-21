import React from 'react'
import SideNavbar from '../components/SideNavbar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';


//Import API_URL
const API_URL = "http://localhost:5000/addstudent"
const AddStudent = () => {

  //Create state to store Name, Email, Department, Gender, CGPA
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [cgpa, setCgpa] = useState("");

  const addData = () => {

    if (!name || !email || !department || !gender || !cgpa) {
      alert("Feilds should not be empty");
      return;
    }

    axios.post(API_URL, { name, email, department, gender, cgpa }) //Request send to server
      .then(() => {
        setName("");
        setGender("");
        setEmail("");
        setDepartment("");
        setCgpa("");
        alert("Student Details Added");
      })
  }

  return (
    <div>
      <Row>
        {/* Navigation Bar */}
        <Col md={3}>
          <SideNavbar />
        </Col>
        {/* Main Content */}
        <Col md={9} className='mt-3'>
          {/* Container Starts*/}
          <Container>
            <h2>Add New Student</h2>
            <p>Student / Add Student</p>

            {/* New Student Form*/}
            <h3 className='mt-5 ps-3'>Enter the Details</h3>
            <div className='mt-3 p-3 box-shadow rounded m-3'>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control type="text" value={name} placeholder="Enter Student's Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Department</Form.Label>
                      <Form.Select defaultValue="Select Department" value={department} onChange={(e)=>setDepartment(e.target.value)}>
                        <option>Choose...</option>
                        <option>Artificial Intelligence & Data Science</option>
                        <option>Artificial Intelligence & Machine Learning</option>
                        <option>Computer Science & Engineering</option>
                        <option>Information Technology</option>
                        <option>Electronics and Communication Engineering</option>
                        <option>Electrical and Electronics Engineering</option>
                      </Form.Select>                    
                      </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Current CGPA</Form.Label>
                      <Form.Control type="number" value={cgpa} placeholder="Enter CGPA" onChange={(e) => setCgpa(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" value={email} placeholder="Enter Student's Email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <div className="d-flex gap-3">
                        <Form.Check type="radio" label="Male" value="Male" name="gender" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} />
                        <Form.Check type="radio" label="Female" value="Female" name="gender" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Button className='mt-3' onClick={addData}>Add</Button>
              </Form>
            </div>


          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default AddStudent
