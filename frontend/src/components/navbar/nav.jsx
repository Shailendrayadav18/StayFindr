import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Logo from './logo';
import NavElement from './NavElement';
import { Link } from "react-router-dom";
import "./nav.css";

export default function navbar({ user }) {
    return (
        <>
            <Navbar expand="md" bg='body-light' sticky='top' className='border-bottom' style={{ backgroundColor: "#f1f3f5" }}>
                <Container fluid>
                    <Navbar.Brand href='/'><Logo /></Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarNavAltMarkup'></Navbar.Toggle>
                    <Navbar.Collapse id='navbarNavAltMarkup' className='ms-5'>
                        <Nav className='w-100'>
                            <Nav.Link as={Link} to="/" className='ms-3'><NavElement element={"Home"} /></Nav.Link>
                            <Nav.Link as={Link} to="/listing/new" className='ms-3'><NavElement element={"Create"} /></Nav.Link>
                            <Nav.Link as={Link} to="/" className='ms-3'><NavElement element={"View All"} /></Nav.Link>

                            <div className="ms-auto d-flex align-items-center">
                                {user ? (
                                    <div className="profile d-flex align-items-center">
                                        <div className="avatar me-2">
                                            {user.username[0].toUpperCase()}
                                        </div>
                                        <span className="me-3">{user.username}</span>
                                        <button className="btn btn-sm btn-outline-dark">
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/login">
                                            <NavElement element={"Login"} />
                                        </Nav.Link>

                                        <Nav.Link as={Link} to="/signup">
                                            <NavElement element={"Signup"} />
                                        </Nav.Link>
                                    </>
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}