import React from 'react';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 font-sans">
            <header className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-indigo-400">
                    Mi App de Tareas
                </h1>
                <p className="text-gray-400 mt-2 text-lg">Organiza tu vida, sección por sección.</p>
            </header>
            <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <section 
                    className="bg-gray-800 p-6 rounded-2xl shadow-2xl transition duration-500 hover:shadow-indigo-500/50 border-b-4 border-indigo-500 transform hover:-translate-y-1"
                    aria-label="Tareas Pendientes"
                >
                    <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                        Tareas Pendientes
                    </h2>
                    <p className="text-gray-300 italic mb-4">
                        aqui va la vista de inicio
                    </p>
                    <div className="contendor-pendientes bg-gray-700 p-4 rounded-xl border border-gray-600">
                        <h3 className="text-xl font-semibold">contenido aqui referente</h3>
                        <p className="text-sm text-gray-400 mt-1">Énfasis en lo que necesita atención inmediata.</p>
                    </div>
                </section>
                <section 
                    className="bg-gray-800 p-6 rounded-2xl shadow-2xl transition duration-500 hover:shadow-green-500/50 border-b-4 border-green-500 transform hover:-translate-y-1"
                    aria-label="Tareas Terminadas"
                >
                    <h2 className="text-2xl font-bold mb-4 text-green-400">
                        Tareas Terminadas
                    </h2>
                    <p className="text-gray-300 italic mb-4">
                        aqui va la vista de inicio
                    </p>
                    
                    <div className="contendor-terminados bg-gray-700 p-4 rounded-xl border border-gray-600">
                        <h3 className="text-xl font-semibold">contenido aqui referente</h3>
                        <p className="text-sm text-gray-400 mt-1">¡Felicidades por lo completado!</p>
                    </div>
                </section>
                <section 
                    className="bg-gray-800 p-6 rounded-2xl shadow-2xl transition duration-500 hover:shadow-pink-500/50 border-b-4 border-pink-500 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1"
                    aria-label="Contenedor Adicional"
                >
                    <h2 className="text-2xl font-bold mb-4 text-pink-400">
                        Otras Funcionalidades
                    </h2>
                    <p className="text-gray-300 italic mb-4">
                        aqui va la vista de inicio
                    </p>
                    <div className="contendor bg-gray-700 p-4 rounded-xl border border-gray-600">
                        <h3 className="text-xl font-semibold">contenido aqui referente</h3>
                        <p className="text-sm text-gray-400 mt-1">Espacio para notas o ajustes.</p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Layout;