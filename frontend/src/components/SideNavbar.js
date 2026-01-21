import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
const SideNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" style={{width : "350px"}} className="position-sticky sticky-top vh-100 d-flex flex-column align-items-start p-4">
          <Navbar.Brand className="mt-3 mb-3">Student Management System</Navbar.Brand>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/addstudent" >Add Student</Nav.Link>
            <Nav.Link as={Link} to="/viewstudent">View Student</Nav.Link>
          </Nav>
      </Navbar>

    </div>
  ) 
}

export default SideNavbar
