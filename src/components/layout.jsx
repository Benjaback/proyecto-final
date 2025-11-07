import React from 'react';

const Layout = ({ tareas, setTareas }) => {
    const tareasCompletadas = tareas.filter(t => t.estado === 'completada');
    const tareasPendientes = tareas.filter(t => !t.estado || t.estado === 'pendiente');
    const tareasPrioridadAlta = tareas.filter(t => t.prioridad && t.prioridad.toLowerCase() === 'alta' && (!t.estado || t.estado === 'pendiente'));
    const TareaItem = ({ tarea, colorClass, showDescription, showCompletionDate, showDueDate, showPriority }) => {
        const itemClasses = "p-3 rounded-lg border-b border-gray-600 last:border-b-0 mb-2";

        return (
            <li key={tarea.id} className={itemClasses}>
                <div className="flex justify-between items-center">
                    <p className={`text-lg font-semibold ${colorClass}`}>
                        {tarea.nombre}
                    </p>
                    {showPriority && tarea.prioridad && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-800 text-pink-200 uppercase">
                            {tarea.prioridad}
                        </span>
                    )}
                </div>
                <div className="text-sm text-gray-400 space-y-0.5 mt-1">
                    {showDueDate && tarea.fechaVencimiento && (
                        <p>
                            <span className="font-medium text-gray-300">Vence:</span> {tarea.fechaVencimiento}
                        </p>
                    )}
                    {showCompletionDate && tarea.fechaCompletada && (
                        <p>
                            <span className="font-medium text-gray-300">Completada:</span> {tarea.fechaCompletada}
                        </p>
                    )}
                    {showDescription && tarea.descripcion && (
                        <p className="mt-1 italic">
                            {tarea.descripcion}
                        </p>
                    )}
                </div>
            </li>
        );
    };
    
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 font-sans">
            <header className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-indigo-400">
                    Mi App de Tareas
                </h1>
                <p className="text-gray-400 mt-2 text-lg">Organiza tu vida.</p>
            </header>
            <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <section 
                    className="bg-gray-800 p-6 rounded-2xl shadow-2xl transition duration-500 hover:shadow-indigo-500/50 border-b-4 border-indigo-500 transform hover:-translate-y-1"
                    aria-label="Tareas Pendientes"
                >
                    <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                        Tareas Pendientes ({tareasPendientes.length})
                    </h2>
                    <p className="text-gray-400 italic mb-4 text-sm">
                        Tareas pendientes que se requieren completar
                    </p>
                    <div className="contendor-pendientes bg-gray-700 p-4 rounded-xl border border-gray-600">
                        {tareasPendientes.length === 0 ? (
                            <p className="text-gray-400 text-center py-4">¡No hay tareas pendientes!</p>
                        ) : (
                            <ul className="space-y-0.5 divide-y divide-gray-600">
                                {tareasPendientes.map(tarea => (
                                    <TareaItem 
                                        key={tarea.id}
                                        tarea={tarea} 
                                        colorClass="text-indigo-400"
                                        showDescription={true}
                                        showDueDate={true}
                                        showPriority={false}
                                    />
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
                        Tareas Terminadas ({tareasCompletadas.length})
                    </h2>
                    <p className="text-gray-400 italic mb-4 text-sm">
                        Tareas concluidas, ¡bien hecho!
                    </p>
                    
                    <div className="contendor-terminados bg-gray-700 p-4 rounded-xl border border-gray-600">
                        {tareasCompletadas.length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No hay tareas completadas aún.</p>
                        ) : (
                            <ul className="space-y-0.5 divide-y divide-gray-600">
                                {tareasCompletadas.map(tarea => (
                                    <TareaItem 
                                        key={tarea.id}
                                        tarea={tarea} 
                                        colorClass="text-green-400 line-through"
                                        showDescription={false}
                                        showDueDate={false}
                                        showCompletionDate={true}
                                        showPriority={false}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
                <section 
                    className="bg-gray-800 p-6 rounded-2xl shadow-2xl transition duration-500 hover:shadow-pink-500/50 border-b-4 border-pink-500 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1"
                    aria-label="Prioridad Alta"
                >
                    <h2 className="text-2xl font-bold mb-4 text-pink-400">
                        Tareas de Prioridad Alta ({tareasPrioridadAlta.length})
                    </h2>
                    <p className="text-gray-400 italic mb-4 text-sm">
                        Tareas urgentes que requieren atención inmediata
                    </p>
                    <div className="contendor bg-gray-700 p-4 rounded-xl border border-gray-600">
                        {tareasPrioridadAlta.length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No hay tareas de prioridad alta actualmente.</p>
                        ) : (
                            <ul className="space-y-0.5 divide-y divide-gray-600">
                                {tareasPrioridadAlta.map(tarea => (
                                    <TareaItem 
                                        key={tarea.id}
                                        tarea={tarea} 
                                        colorClass="text-pink-400"
                                        showDescription={true}
                                        showDueDate={true}
                                        showPriority={true}
                                    />
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