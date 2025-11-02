// Crear.jsx
import React, { useState } from 'react';


function TaskItem({ task, onDelete }) {
    return (
        <div>
            <div>
                <strong>{task.nombre}</strong>: {task.tarea}
            </div>
            <button onClick={() => onDelete(task.id)}>
                Eliminar
            </button>
        </div>
    );
}

function Crear({ tareas, setTareas }){
    const [formData, setFormData] = useState({
        nombre: '',
        tarea: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.nombre.trim() === '' || formData.tarea.trim() === '') {
            alert('Por favor, completa todos los campos');
            return;
        }

        const nuevaTarea = {
            id: Date.now(), 
            nombre: formData.nombre.trim(),
            tarea: formData.tarea.trim()
        };


        setTareas([...tareas, nuevaTarea]);


        setFormData({ nombre: '', tarea: '' });
    };

    const handleDelete = (tareaId) => {
        const nuevasTareas = tareas.filter(tarea => tarea.id !== tareaId);
        setTareas(nuevasTareas);
    };

    return(
        <div>
            <h2> Lista de Tareas ({tareas.length})</h2>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={(event) => setFormData({ ...formData, nombre: event.target.value })}
                />
                <input
                    type="text"
                    name="tarea"
                    placeholder="Tarea"
                    value={formData.tarea}
                    onChange={(event) => setFormData({ ...formData, tarea: event.target.value })}
                />
                <button type="submit">
                    Agregar Tarea
                </button>
            </form>

            {/* {tareas.length === 0 && (
                <div>
                    <h3>No hay tareas cargadas</h3>
                    <p>¡Agrega tu primera tarea!</p>
                </div>
            )}

            {tareas.length > 0 && (
                <div>
                    <h3>Tus tareas:</h3>
                    {tareas.map(tarea => (
                        <TaskItem
                            key={tarea.id}
                            task={tarea}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )} */}
        </div>
    );
}

export default Crear;