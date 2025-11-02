import React from 'react';

const TareasScreens = ({ tareas, setTareas }) => {
    return (
        <div style={{ padding: '20px', border: '2px solid blueviolet', borderRadius: '8px' }}>
            <h2>Tareas Pendientes ({tareas.length})</h2>
            <p>Aquí se muestran todas las tareas creadas:</p>
            
            {tareas.length === 0 ? (
                <p>No hay tareas pendientes. ¡Ve a "Agregar Tareas" para crear una!</p>
            ) : (
                <ul>
                    {tareas.map(tarea => (
                        <li key={tarea.id}>
                            <strong>{tarea.nombre}</strong>: {tarea.tarea}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TareasScreens;