import React from 'react';

const TareasScreens = ({ tareas, setTareas }) => {
    
    // Función para determinar el color basado en la prioridad
    const getPriorityColor = (prioridad) => {
        switch (prioridad.toLowerCase()) {
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
    const handleDelete = (tareaId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            const updatedTareas = tareas.filter(tarea => tarea.id !== tareaId);
            setTareas(updatedTareas);
        }
    }
    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border-2 border-indigo-500/50 mb-12">
            
            <h2 className="text-3xl font-extrabold text-indigo-400 mb-6 text-center border-b border-gray-700 pb-3">
                📋 Tareas Pendientes ({tareas.length})
            </h2>
            
            <p className="text-gray-400 mb-6 text-center">Aquí se muestran todas las tareas creadas:</p>
            
            {tareas.length === 0 ? (
                <div className="p-8 bg-gray-700 rounded-lg border border-gray-600 text-center">
                    <p className="text-gray-300 italic">No hay tareas pendientes. ¡Ve a **"Agregar Tareas"** para crear una!</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {tareas.map(tarea => (
                        <li 
                            key={tarea.id} 
                            className="p-4 bg-gray-700 rounded-lg border border-indigo-600/50 hover:border-indigo-500 transition duration-300 shadow-md"
                        >
                            <button
                                onClick={() => handleDelete(tarea.id)}
                                title='Elmininar'
                            >
                                Eliminar*
                            </button>
                            {/* Línea principal: Nombre y Tarea */}
                            <p className="text-lg text-gray-100 mb-2">
                                <span className="font-bold text-indigo-300">{tarea.nombre}</span>: {tarea.tarea}
                            </p>
                            
                            {/* Detalles organizados */}
                            <div className="text-sm text-gray-400 space-y-1 ml-2 border-l-2 border-gray-600 pl-3">
                                <p>
                                    <span className="font-medium text-gray-300">Descripción:</span> {tarea.descripcion}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-300">Prioridad:</span> 
                                    <span className={`ml-1 ${getPriorityColor(tarea.prioridad)}`}>
                                        {tarea.prioridad}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-300">Creada el:</span> {tarea.fechaCreacion}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-300">Vence el:</span> {tarea.fechaVencimiento}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TareasScreens;