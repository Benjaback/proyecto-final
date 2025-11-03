import React from "react";

const Terminado = () => {
    return ( //para que se vea el contenido, puedes cambiarlo a gusto
        <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border-2 border-pink-500/50 mb-12">
            <h2 className="text-3xl font-extrabold text-pink-400 mb-6 text-center border-b border-gray-700 pb-3">
                Listado de Tareas Terminadas
            </h2>
            <div className="p-8 bg-gray-700 rounded-lg border border-gray-600 text-center">
                <p className="text-gray-300 italic">Aquí irán las tareas marcadas como completadas.</p>
            </div>
        </div>
    );
};

export default Terminado;