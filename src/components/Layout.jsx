import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Layout = () => {
    const navEstilo = {
        width: '100%',
      }
      return (
        <div>
            {/* 1. Usamos Container fluid para que el contenido de la barra se extienda al 100% (con padding) */}
            <Navbar expand="lg" style={navEstilo} bg="secondary" variant="dark">
                <Container fluid> 
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* 2. Eliminamos 'mx-auto' para que la lista de enlaces no flote. 
                           Usamos 'me-auto' para que se alineen a la izquierda.
                        */}
                        <Nav className="me-auto"> 
                            <Nav.Link as={Link} to="/" style={{ color: 'white' }}>Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/about" style={{ color: 'white' }}>Agregar tareas</Nav.Link>
                            <Nav.Link as={Link} to="/contact" style={{ color: 'white' }}>Tareas terminadas</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section className="content-area">
                <Outlet/> 
            </section>
        </div>
    );
}

export default Layout;