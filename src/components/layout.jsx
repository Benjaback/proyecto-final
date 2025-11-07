import React from 'react';

const Layout = ({ tareas, setTareas }) => {
    const tareasCompletadas = tareas.filter(t => t.estado === 'completada');
    const tareasPendientes = tareas.filter(t => !t.estado || t.estado === 'pendiente');
    const tareasPrioridadAlta = tareas.filter(t => t.prioridad && t.prioridad.toLowerCase() === 'alta' && (!t.estado || t.estado === 'pendiente'));

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
                        Tareas pendientes que se requieren completar
                    </p>
                    <div className="contendor-pendientes bg-gray-700 p-4 rounded-xl border border-gray-600">
                        {tareasPendientes.length === 0 ? (
                            <p className="text-gray-400">No hay tareas pendientes</p>
                        ) : (
                            <ul className="space-y-2">
                                {tareasPendientes.map(tarea => (
                                    <li key={tarea.id} className="text-gray-300">
                                        Nombre: {tarea.nombre}
                                        {tarea.fechaVencimiento && (
                                            <p>Vence el: {tarea.fechaVencimiento}</p>
                                        )}
                                        Descripcion: {tarea.descripcion}
                                    </li>
                                ))}
                            </ul>
                        )}
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
                        Tareas concluidas
                    </p>
                    
                    <div className="contendor-terminados bg-gray-700 p-4 rounded-xl border border-gray-600">
                        {tareasCompletadas.length === 0 ? (
                            <p className="text-gray-400">No hay tareas completadas</p>
                        ) : (
                            <ul className="space-y-2">
                                {tareasCompletadas.map(tarea => (
                                    <li key={tarea.id} className="text-gray-300">
                                        Nombre: {tarea.nombre}
                                        <p>Completada el: {tarea.fechaCompletada}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
                <section 
                    className="bg-gray-800 p-6 rounded-2xl shadow-2xl transition duration-500 hover:shadow-pink-500/50 border-b-4 border-pink-500 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1"
                    aria-label="Contenedor Adicional"
                >
                    <h2 className="text-2xl font-bold mb-4 text-pink-400">
                        Prioridad Alta
                    </h2>
                    <p className="text-gray-300 italic mb-4">
                        Tareas urgentes que requieren atención inmediata
                    </p>
                    <div className="contendor bg-gray-700 p-4 rounded-xl border border-gray-600">
                        {tareasPrioridadAlta.length === 0 ? (
                            <p className="text-gray-400">No hay tareas de prioridad alta</p>
                        ) : (
                            <ul className="space-y-2">
                                {tareasPrioridadAlta.map(tarea => (
                                    <li key={tarea.id} className="text-gray-300">
                                        Nombre: {tarea.nombre}
                                        <p className="text-sm">Prioridad: <span className="text-red-400 font-semibold">{tarea.prioridad}</span></p>
                                        {tarea.fechaVencimiento && (
                                            <p className="text-sm">Vence el: {tarea.fechaVencimiento}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Layout;