import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';
import TareasScreens from './tareasScreens';
import Completo from './Completo';
import Crear from './crear';

const colors = {
    primary: '#0E7387',
    secondary: '#fff',
    textDefault: '#666777',
    textActive: '#0E7387',
    bgNavbar: '#fff',
};

const NavMenu = ({ isAuthenticated, handleToggleSession, tareas }) => {
    const location = useLocation();
    const navStyles = {
        navbar: {
            backgroundColor: colors.bgNavbar,
            height: '60px',
            margin: '10px 10px',
            borderRadius: '10px',
            padding: '0.3rem',
            border: `2px solid ${colors.primary}`,
        },
        logo: {
            width: '28px',
            height: '28px',
        },
        navbarBrand: {
            fontWeight: '700',
            color: colors.primary,
            fontSize: '15px',
            paddingLeft: '5px',
            transition: '0.3s color',
        },
        // loginButton: {
        //     background: isAuthenticated ? 'transparent' : colors.primary,
        //     border: `2px ${colors.primary} solid`,
        //     borderRadius: '50px',
        //     textDecoration: 'none',
        //     color: isAuthenticated ? colors.primary : colors.secondary,
        //     padding: '8px 15px',
        //     fontSize: '15px',
        //     cursor: 'pointer',
        // },
        navLink: {
            color: colors.textDefault, 
            fontWeight: '500',
            position: 'relative',
            textDecoration: 'none', 
            transition: 'color 0.3s',
        },
    };
    const getLinkStyle = (path) => {
        const isRootActive = location.pathname === '/' && path === '/';
        const isOtherActive = location.pathname.startsWith(path) && path !== '/';
        const isActive = isRootActive || isOtherActive;
    
        return {
            ...navStyles.navLink,
            color: isActive ? colors.textActive : colors.textDefault
        };
    };

    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={navStyles.navbar}>
            <div className="container-fluid">
                <Link className="navbar-brand me-auto" to="/" style={navStyles.navbarBrand}>
                    Tareas Block 
                </Link>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel" style={{color: colors.primary}}>Alma Canina</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link mx-lg-2" to="/" style={getLinkStyle('/')}>Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-lg-2" to="/tareas" style={getLinkStyle('/tareas')}>Tareas Pendientes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-lg-2" to="/crear" style={getLinkStyle('/crear')}>Agregar Tareas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-lg-2" to="/completadas" style={getLinkStyle('/completadas')}>Tareas Terminadas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-lg-2" to="/catalogo" style={getLinkStyle('/catalogo')}>Eliminar Tareas</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
};

const Index = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tareas, setTareas] = useState([]); // Estado centralizado de tareas
    
    const handleToggleSession = () => {
        setIsAuthenticated(prev => !prev);
    };
    const IndexContent = () => (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Página de Inicio (Index Content)</h2>
            <p>Este contenido se muestra en la ruta `/`.</p>
        </div>
    );

    return (
        <Router>
            <NavMenu 
                isAuthenticated={isAuthenticated}
                handleToggleSession={handleToggleSession}
                tareas={tareas}
            />
            
            <div style={{marginTop: '80px', padding: '20px'}}>
                <Routes>
                    <Route path="/" element={<IndexContent />} /> 
                    <Route path="/tareas" element={<TareasScreens tareas={tareas} setTareas={setTareas} />} />
                    <Route path="/crear" element={<Crear tareas={tareas} setTareas={setTareas} />} />
                    <Route path="/completadas" element={<Completo tareas={tareas} setTareas={setTareas} />} />
                    <Route path="*" element={<h2>404 | Contenido no encontrado</h2>} />
                </Routes>
            </div>
        </Router>
    );
}

export default Index;