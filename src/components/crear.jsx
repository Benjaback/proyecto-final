import React, { useState } from 'react';

// function TaskItem({ task, onDelete }) {
//     return (
//         <div>
//             <div>
//                 <strong>{task.nombre}</strong>: {task.tarea}
//             </div>
//             <button onClick={() => onDelete(task.id)}>
//                 Eliminar
//             </button>
//         </div>
//     );
// }
function Crear({ tareas, setTareas }){
    const [formData, setFormData] = useState({
        nombre: '',
        tarea: '',
        descripcion: '',
        prioridad: 'Dificultad',
        fechaVencimiento: ''
    });

    // Controlador genérico para actualizar el estado del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        const limites = {
            nombre: 50,
            tarea: 100,
            descripcion: 200
        };

        if (name === 'nombre' || name === 'tarea' || name === 'descripcion') {
            let valorLimpio = value
            .replace(/[0-9]/g, '')
            .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');

            if (valorLimpio.length > limites[name]) {
                valorLimpio = valorLimpio.substring(0, limites[name]);
            }

            setFormData(prevData => ({ ...prevData, [name]: valorLimpio }));
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // VALIDACIONES
        if (formData.nombre.trim() === '' || formData.tarea.trim() === '') {
            alert('Por favor, completa los campos Nombre y Tarea.');
            return;
        }

        if (formData.prioridad === 'Dificultad') {
            alert('Por favor, selecciona una dificultad');
            return;
        }

        if (formData.nombre.trim().length < 3) {
            alert('El nombre debe tener al menos 3 caracteres.');
            return;
        }
        if (formData.tarea.trim().length < 5) {
            alert('La tarea debe tener al menos 5 caracteres.');
            return;
        }

        if (formData.descripcion.trim().length > 0 && formData.descripcion.trim().length < 10) {
            alert('La descripción debe tener al menos 10 caracteres.');
            return;
        }
        
        if (formData.fechaVencimiento){
            const fechaSeleccionada = new Date(formData.fechaVencimiento);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            if (fechaSeleccionada < hoy) {
                alert('no se puede poner una fecha anterior a hoy')
                return;
            }
        }
        if (/^\s*$/.test(formData.nombre)) {
            alert('El nombre no puede ser solo espacios en blanco.');
            return;
        }
        // FIN DE VALIDACIONES

        const nuevaTarea = {
            id: Date.now(), 
            nombre: formData.nombre.trim(),
            tarea: formData.tarea.trim(),
            descripcion: formData.descripcion.trim(),
            prioridad: formData.prioridad,
            fechaCreacion: new Date().toLocaleDateString('es-ES'),
            fechaVencimiento: formData.fechaVencimiento
        };


        setTareas([...tareas, nuevaTarea]);

        // Resetear el formulario
        setFormData({ nombre: '', tarea: '', descripcion: '', prioridad: 'Dificultad', fechaVencimiento: '' });
    };

    // Clases comunes para los inputs y selects
    const inputClasses = "w-full p-3 mb-4 rounded-lg bg-gray-700 border-2 border-gray-600 focus:border-indigo-500 text-gray-100 placeholder-gray-400 transition duration-300 focus:outline-none";
    
    return(
        <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border-2 border-indigo-500/50 mb-12">
            
            <h2 className="text-3xl font-extrabold text-indigo-400 mb-6 text-center border-b border-gray-700 pb-3">
                <span className="block mb-1"></span> Agregar Nueva Tarea <br /> ({tareas.length} pendientes)
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Nombre */}
                <div>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre de la Tarea (Ej: Proyecto X)"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={inputClasses}
                        
                    />
                    <small className='text-gray-400 text-xs'>
                        {formData.nombre.length}/50
                    </small>
                </div>
                
                {/* Campo Tarea */}
                <div>
                    <input
                        type="text"
                        name="tarea"
                        placeholder="Detalle principal (Ej: Codificar componente)"
                        value={formData.tarea}
                        onChange={handleChange}
                        className={inputClasses}
                        
                     
                    />
                    <small className='text-gray-400 text-xs'>
                        {formData.tarea.length}/100
                    </small>
                </div>
                
                {/* Campo Descripción */}
                <div>
                    <input
                        type="text"
                        name="descripcion"
                        placeholder="Descripción opcional más detallada"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                    <small className='text-gray-400 text-xs'>
                        {formData.descripcion.length}/200
                    </small>
                </div>
                
                {/* Selector de Prioridad y Fecha de Vencimiento en la misma línea (flex) */}
                <div className="flex space-x-4">
                    {/* Selector de Prioridad */}
                    <div className="flex-1">
                        <select
                            name="prioridad"
                            value={formData.prioridad}
                            onChange={handleChange}
                            className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                            <option value="Dificultad" disabled>Seleccionar Dificultad</option>
                            <option value="baja" className="text-green-400 font-medium">Baja</option>
                            <option value="media" className="text-yellow-400 font-medium">Media</option>
                            <option value="alta" className="text-red-400 font-medium">Alta</option>
                        </select>
                    </div>

                    {/* Fecha de Vencimiento */}
                    <div className="flex-1">
                        <input
                            type="date"
                            name='fechaVencimiento'
                            placeholder='Fecha de vencimiento'
                            value={formData.fechaVencimiento}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>
                </div>
                
                {/* Botón de Submit */}
                <button 
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Guardar Tarea
                </button>
            </form>
        </div>
    );
}

export default Crear;