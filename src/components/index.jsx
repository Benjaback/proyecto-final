import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import TareasScreens from './tareasScreens'; 
import Crear from './crear'; 
import Layout from './layout'; 
import Terminado from './endScreen';

const themeColors = {
    primary: 'text-indigo-400', // El color brillante para el logo y activo
    textDefault: 'text-gray-400', // Texto normal en fondo oscuro
    textActive: 'text-indigo-400',
    bgNavbar: 'bg-gray-800', // Fondo oscuro de la barra de navegación
    border: 'border-indigo-500', // Borde que resalta
};

const AppFooter = () => {
        return (
            <footer className="sticky bottom-0 w-full bg-gray-800 p-6 shadow-inner-2xl rounded-t-2xl border-t-4 border-indigo-500 mt-auto">
                <div className="max-w-7xl mx-auto text-center text-gray-400">
                    <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-2 md:space-y-0 text-sm">
                        <p>
                            <span className="font-semibold text-indigo-400">Tareas Block</span> &copy; {new Date().getFullYear()}
                        </p>
                        <p>
                            Diseñado por Villarroel Loana, Villanueva Benjamin, Marin Marisol
                        </p>
                        <p>
                            <a href="#contacto" className="hover:text-indigo-300 transition duration-150">Contacto</a> | 
                            <a href="#privacidad" className="hover:text-indigo-300 transition duration-150 ml-2">Privacidad</a>
                        </p>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                        Tu organizador personal de tareas.
                    </p>
                </div>
            </footer>
        );
    };
    
    const NavMenu = ({ isAuthenticated, handleToggleSession, tareas }) => {
        const getLinkClasses = ({ isActive }) => {
            let classes = `px-3 py-2 mx-lg-2 rounded-lg transition duration-200 font-medium `;
            
            if (isActive) {
                classes += `${themeColors.textActive} bg-gray-700 shadow-lg`;
            } else {
                classes += `${themeColors.textDefault} hover:text-indigo-300 hover:bg-gray-700`;
            }
            return classes;
        };
    
        return (
            <nav 
                className={`fixed top-0 left-0 right-0 z-50 p-3 shadow-xl ${themeColors.bgNavbar} rounded-b-2xl border-b-4 ${themeColors.border}`}
            >
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <NavLink 
                        to="/" 
                        className={`text-xl font-bold tracking-wider ${themeColors.primary}`}
                    >
                        Tareas Block
                    </NavLink>
                    <div className="hidden md:flex space-x-2">
                        <NavLink to="/" end className={getLinkClasses}>Inicio</NavLink>
                        <NavLink to="/tareas" className={getLinkClasses}>Tareas Pendientes</NavLink>
                        <NavLink to="/crear" className={getLinkClasses}>Agregar Tareas</NavLink>
                        <NavLink to="/terminado" className={getLinkClasses}>Tareas Terminadas</NavLink>
                    </div>
                    <button 
                        className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-700 focus:outline-none" 
                        onClick={() => {
                            const offcanvas = document.getElementById('mobile-menu');
                            if(offcanvas) offcanvas.classList.toggle('hidden');
                        }}
                        aria-label="Toggle navigation"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
                <div id="mobile-menu" className="hidden md:hidden mt-3 pt-3 border-t border-gray-700">
                    <div className="flex flex-col space-y-1">
                        <NavLink to="/" end className={getLinkClasses}>Inicio</NavLink>
                        <NavLink to="/tareas" className={getLinkClasses}>Tareas Pendientes</NavLink>
                        <NavLink to="/crear" className={getLinkClasses}>Agregar Tareas</NavLink>
                        <NavLink to="/terminado" className={getLinkClasses}>Tareas Terminadas</NavLink>
                    </div>
                </div>
            </nav>
        );
    };
    
    const Index = () => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [tareas, setTareas] = useState([]); 
 
        const handleToggleSession = () => {
            setIsAuthenticated(prev => !prev);
        };
    
        return (
            <Router >
                <NavMenu 
                    isAuthenticated={isAuthenticated}
                    handleToggleSession={handleToggleSession}
                    tareas={tareas}
                />
                <div className="pt-24 px-4 w-full min-h-screen bg-gray-900">
                    <Routes>
                        <Route path="/" element={<Layout />} /> 
                        <Route path="/tareas" element={<TareasScreens tareas={tareas} setTareas={setTareas} />} />
                        <Route path="/crear" element={<Crear tareas={tareas} setTareas={setTareas} />} />
                        <Route path="/terminado" element={<Terminado tareas={tareas} setTareas={setTareas} />} />
                    </Routes>
                </div>
                <AppFooter />
            </Router>
        );
    }
    
    export default Index;