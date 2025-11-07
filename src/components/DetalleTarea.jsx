import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ActionConfirmModal from './ActionConfirmModal';

const DetalleTarea = ({ tareas, setTareas }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    
    // Buscar la tarea
    const tarea = tareas.find(t => t.id === parseInt(id));
    
    // Si no existe
    if (!tarea) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border-2 border-red-500/50 mb-12">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-red-400 mb-4">
                        Tarea No Encontrada
                    </h2>
                    <p className="text-gray-300 mb-6">
                        La tarea que buscas no existe o ha sido eliminada.
                    </p>
                    <Link 
                        to="/tareas"
                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Volver a Tareas
                    </Link>
                </div>
            </div>
        );
    }

    // color de prioridad
    const getPriorityColor = (prioridad) => {
        const prioridadLowerCase = (prioridad || '').toLowerCase();
        switch (prioridadLowerCase) {
            case 'alta':
                return 'text-red-400 bg-red-900/30 border-red-400';
            case 'media':
                return 'text-yellow-400 bg-yellow-900/30 border-yellow-400';
            case 'baja':
                return 'text-green-400 bg-green-900/30 border-green-400';
            default:
                return 'text-gray-400 bg-gray-700/30 border-gray-400';
        }
    };

    // color del estado
    const getEstadoColor = (estado) => {
        return estado === 'completada' 
            ? 'text-green-400 bg-green-900/30 border-green-400'
            : 'text-blue-400 bg-blue-900/30 border-blue-400';
    };

    // Funciones para manejar acciones
    const handleToggleEstado = () => {
        const nuevoEstado = tarea.estado === 'completada' ? 'pendiente' : 'completada';
        const updatedTareas = tareas.map(t => {
            if (t.id === tarea.id) {
                return {
                    ...t,
                    estado: nuevoEstado,
                    fechaCompletada: nuevoEstado === 'completada' 
                        ? new Date().toLocaleDateString('es-ES') 
                        : null
                };
            }
            return t;
        });
        setTareas(updatedTareas);
    };

    const handleConfirmAction = (type) => {
        setActionType(type);
        setShowModal(true);
    };

    const handleModalConfirm = () => {
        if (actionType === 'delete') {
            const updatedTareas = tareas.filter(t => t.id !== tarea.id);
            setTareas(updatedTareas);
            navigate('/tareas');
        } else if (actionType === 'complete' || actionType === 'reopen') {
            handleToggleEstado();
        }
        setShowModal(false);
        setActionType('');
    };

    const handleModalCancel = () => {
        setShowModal(false);
        setActionType('');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border-2 border-indigo-500/50 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-700">
                <div className="flex-1">
                    <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">
                        {tarea.nombre}
                    </h1>
                    <p className="text-gray-300 text-lg">
                        {tarea.tarea}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    <Link 
                        to="/tareas"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        ← Volver
                    </Link>
                    <Link 
                        to={`/editar/${tarea.id}`}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Editar
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-bold text-indigo-300 mb-3">Información Principal</h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-400">Descripción</label>
                                <p className="text-gray-200 mt-1 p-2 bg-gray-600 rounded border-l-4 border-indigo-500">
                                    {tarea.descripcion || 'Sin descripción'}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-400">Prioridad: </label>
                                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(tarea.prioridad)}`}>
                                        {tarea.prioridad?.toUpperCase() || 'N/A'}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-400">Estado: </label>
                                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(tarea.estado)}`}>
                                        {tarea.estado === 'completada' ? 'TERMINADA' : 'PENDIENTE'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-bold text-indigo-300 mb-3">Fechas</h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-400">Fecha de Creación</label>
                                <p className="text-gray-200 mt-1">
                                    {tarea.fechaCreacion}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-400">Fecha de Vencimiento</label>
                                <p className="text-gray-200 mt-1">
                                    {tarea.fechaVencimiento || 'Sin fecha límite'}
                                </p>
                            </div>

                            {tarea.fechaCompletada && (
                                <div>
                                    <label className="text-sm font-medium text-gray-400">Fecha de Completación</label>
                                    <p className="text-green-400 mt-1">
                                        {tarea.fechaCompletada}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-xl font-bold text-indigo-300 mb-4">Acciones</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                    {tarea.estado === 'completada' ? (
                        <button
                            onClick={() => handleConfirmAction('reopen')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition duration-200 shadow-lg"
                        >
                            Reabrir Tarea
                        </button>
                    ) : (
                        <button
                            onClick={() => handleConfirmAction('complete')}
                            className="bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition duration-200 shadow-lg"
                        >
                            Marcar como Terminada
                        </button>
                    )}
                    
                    <button
                        onClick={() => handleConfirmAction('delete')}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-lg"
                    >
                        Eliminar Tarea
                    </button>
                </div>
            </div>

            <ActionConfirmModal
                show={showModal}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
                data={tarea}
                type={actionType}
            />
        </div>
    );
};

export default DetalleTarea;