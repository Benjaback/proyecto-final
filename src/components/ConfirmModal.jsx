import React from 'react';

const ConfirmModal = ({ show, onConfirm, onCancel, data }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm bg-transparent">
            <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-11/12 max-w-sm border border-indigo-500/50 transform transition-all duration-300 scale-100">
                
                <h3 className="text-xl font-bold text-indigo-400 mb-4 border-b border-gray-700 pb-2">
                    Confirmar Nueva Tarea
                </h3>

                <p className="text-gray-300 mb-4">
                    ¿Estás seguro de guardar la siguiente tarea?
                </p>
                <div className="space-y-2 mb-6 p-3 bg-gray-700 rounded">
                    <p className="text-sm text-gray-200">
                        <span className="font-semibold text-indigo-300">Nombre:</span> {data.nombre}
                    </p>
                    <p className="text-sm text-gray-200">
                        <span className="font-semibold text-indigo-300">Detalle:</span> {data.tarea}
                    </p>
                    <p className="text-sm text-gray-200">
                        <span className="font-semibold text-indigo-300">Prioridad:</span> 
                        <span className={`ml-1 font-medium ${
                            data.prioridad === 'alta' ? 'text-red-400' :
                            data.prioridad === 'media' ? 'text-yellow-400' :
                            'text-green-400'
                        }`}>
                           {data.prioridad.toUpperCase()}
                        </span>
                    </p>
                    <p className="text-sm text-gray-200">
                        <span className="font-semibold text-indigo-300">Vencimiento:</span> {data.fechaVencimiento || 'No especificado'}
                    </p>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition duration-200"
                    >
                        Confirmar y Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;