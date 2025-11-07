import React, { useState } from "react";
import { Link } from 'react-router-dom';
import TerminalModal from './terminalMODAL';
// import { Terminal } from "lucide-react";

const Terminado = ({ tareas, setTareas }) => {
    const [showModal, setShowModal] = useState(false);
    const [taskToActOn, setTaskToActOn] = useState(null);
    const [actionType, setActionType] = useState('');

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

    const tareasCompletadas = tareas.filter(t => t.estado === 'completada');

    const handleConfirmDelete = (tarea) => {
        setTaskToActOn(tarea);
        setActionType('delete');
        setShowModal(true);
    };

    const handleConfirmReopen = (tarea) => {
        setTaskToActOn(tarea);
        setActionType('reopen');
        setShowModal(true);
    };

    const executeDelete = (tareaId) => {
        const updatedTareas = tareas.filter(tarea => tarea.id !== tareaId);
        setTareas(updatedTareas);
        setShowModal(false);
        setTaskToActOn(null);
        setActionType('');
    };

    const executeReopen = (tareaId) => {
        const updatedTareas = tareas.map(tarea => {
            if (tarea.id === tareaId) {
                return {
                    ...tarea,
                    estado: 'pendiente',
                    fechaCompletada: null
                };
            }
            return tarea;
        });
        setTareas(updatedTareas);
        setShowModal(false);
        setTaskToActOn(null);
        setActionType('');
    };

    const handleModalConfirm = () => {
        if (!taskToActOn) return;

        if (actionType === 'delete') {
            executeDelete(taskToActOn.id);
        } else if (actionType === 'reopen') {
            executeReopen(taskToActOn.id);
        }
    };

    const handleModalCancel = () => {
        setShowModal(false);
        setTaskToActOn(null);
        setActionType('');
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border-2 border-indigo-500/50 mb-12">
            <h2 className="text-3xl font-extrabold text-indigo-400 mb-6 text-center border-b border-gray-700 pb-3">
                Tareas Terminadas ({tareasCompletadas.length})
            </h2>
            <p className="text-gray-400 mb-6 text-center">Aquí se muestran las tareas que ya finalizaste:</p>

            {tareasCompletadas.length === 0 ? (
                <div className="p-8 bg-gray-700 rounded-lg border border-gray-600 text-center">
                    <p className="text-gray-300 italic">No hay tareas completadas. ¡Completa alguna tarea pendiente!</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {tareasCompletadas.map(tarea => (
                        <li
                            key={tarea.id}
                            className="p-4 bg-gray-700 rounded-lg border border-indigo-600/50 hover:border-indigo-500 transition duration-300 shadow-md flex flex-wrap justify-between items-start"
                        >
                            <div className="flex-1 min-w-0 pr-4">
                                <p className="text-lg text-gray-100 mb-2">
                                    <span className="font-bold text-indigo-300">{tarea.nombre}</span>: {tarea.tarea}
                                </p>
                                <div className="text-sm text-gray-400 space-y-1 ml-2 border-l-2 border-gray-600 pl-3">
                                    <p>
                                        <span className="font-medium text-gray-300">Descripción:</span> {tarea.descripcion}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-300">Prioridad:</span>
                                        <span className={`ml-1 ${getPriorityColor(tarea.prioridad)}`}>
                                            {tarea.prioridad || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-300">Creada el:</span> {tarea.fechaCreacion}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-300">Vence el:</span> {tarea.fechaVencimiento}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-300">Completada el:</span> {tarea.fechaCompletada}
                                    </p>
                                </div>
                                <div className="mt-3">
                                    <Link 
                                        to={`/tarea/${tarea.id}`}
                                        className="text-green-400 hover:text-green-300 hover:underline text-sm font-medium transition duration-200"
                                    >
                                        Ver Detalle
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2 mt-4 md:mt-0 min-w-[100px]">
                                <button
                                    onClick={() => handleConfirmReopen(tarea)}
                                    title="Rehacer"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition duration-200 shadow-lg"
                                >
                                    Rehacer
                                </button>
                                <button
                                    onClick={() => handleConfirmDelete(tarea)}
                                    title="Eliminar"
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 shadow-lg"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <TerminalModal
                show={showModal}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
                data={taskToActOn}
                type={actionType}
            />
        </div>
    );
};

export default Terminado;