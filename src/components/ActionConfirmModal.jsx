import React from 'react';

const buttonClasses = {
    delete: "bg-red-600 hover:bg-red-700 text-white",
    complete: "bg-green-500 hover:bg-green-600 text-gray-900",
};

const ActionConfirmModal = ({ show, onConfirm, onCancel, data, type }) => { 
    if (!show || !data) {
        return null;
    }
    const isDelete = type === 'delete';
    const title = isDelete ? 'Confirmar Eliminación' : 'Marcar como Terminada';
    const message = isDelete 
        ? 'Estás a punto de ELIMINAR esta tarea permanentemente. ¿Deseas continuar?' 
        : '¿Estás seguro de que esta tarea está completada y lista para archivar?';
    const confirmText = isDelete ? 'Sí, Eliminar' : 'Sí, Terminar';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <div className="absolute inset-0 bg-opacity-70"></div>
            <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-11/12 max-w-sm border border-indigo-500/50 transform transition-all duration-300 scale-100 z-50">
                <h3 className="text-xl font-bold text-indigo-400 mb-4 border-b border-gray-700 pb-2">
                    {title}
                </h3>
                <p className="text-gray-300 mb-4 whitespace-pre-wrap">
                    {message}
                </p>
                <div className="space-y-2 mb-6 p-3 bg-gray-700 rounded border border-gray-600">
                    <p className="text-sm text-gray-200">
                        <span className="font-semibold text-indigo-300">Nombre:</span> {data.nombre}
                    </p>
                    <p className="text-sm text-gray-200">
                        <span className="font-semibold text-indigo-300">Detalle:</span> {data.tarea}
                    </p>
                </div>
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={onCancel}
                        className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`py-2 px-4 font-bold rounded-lg transition duration-200 ${buttonClasses[type]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionConfirmModal;