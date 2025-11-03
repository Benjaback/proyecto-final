import React from "react";

const Terminado = ({ tareas, setTareas }) => {
    
    const getPriorityColor = (prioridad) => {
        const prioridadLowerCase = (prioridad || '').toLowerCase(); 

        switch (prioridadLowerCase) {
            case 'alta':
                return 'text-red-400 font-semibold';
            case 'media':
                return 'text-yellow-400 font-semibold';
            case 'baja':
                return 'text-green-400 font-semibold';
            default:
                return 'text-gray-400';
        }
    };

    // Filtrar solo completadas
    const tareasCompletadas = tareas.filter(t => t.estado === 'completada');

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border-2 border-pink-500/50 mb-12">
            
            <h2 className="text-3xl font-extrabold text-pink-400 mb-6 text-center border-b border-gray-700 pb-3">
                Listado de Tareas Terminadas ({tareasCompletadas.length})
            </h2>
            
            {tareasCompletadas.length === 0 ? (
                <div className="p-8 bg-gray-700 rounded-lg border border-gray-600 text-center">
                    <p className="text-gray-300 italic">No hay tareas completadas. ¡Completa alguna tarea pendiente!</p>
                </div>
            ) : (
                <ul>
                    {tareasCompletadas.map(tarea => (
                        <li key={tarea.id}>
                            <p>
                                <span>{tarea.nombre}</span>: {tarea.tarea}
                            </p>
                            
                            <div>
                                <p>Descripción: {tarea.descripcion}</p>
                                <p>Prioridad: {tarea.prioridad || 'N/A'}</p>
                                <p>Creada el: {tarea.fechaCreacion}</p>
                                <p>Vencía el: {tarea.fechaVencimiento}</p>
                                <p>Completada el: {tarea.fechaCompletada}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Terminado;