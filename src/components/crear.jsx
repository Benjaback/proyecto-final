import React from 'react';
import { useForm } from 'react-hook-form';

function Crear({ tareas, setTareas }){
    const { register, handleSubmit, watch, reset, setValue } = useForm({
        defaultValues: {
            nombre: '',
            tarea: '',
            descripcion: '',
            prioridad: 'Dificultad',
            fechaVencimiento: '',
            estado: 'pendiente'
        }
    });

    
    const nombreValue = watch('nombre') || '';
    const tareaValue = watch('tarea') || '';
    const descripcionValue = watch('descripcion') || '';

    
    const handleInputChange = (event, fieldName, maxLength) => {
        let value = event.target.value;
        
        
        value = value
            .replace(/[0-9]/g, '')
            .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
        
        
        if (value.length > maxLength) {
            value = value.substring(0, maxLength);
        }
        
        setValue(fieldName, value);
    };

    const onSubmit = (formData) => {
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
                alert('No se puede poner una fecha anterior a hoy.')
                return;
            }
        }
        if (/^\s*$/.test(formData.nombre)) {
            alert('El nombre no puede ser solo espacios en blanco.');
            return;
        }
        // FIN DE VALIDACIONES

        // Confirmación antes de guardar
        if (!window.confirm('¿Estás seguro de guardar esta tarea?')) {
            return;
        }

        const nuevaTarea = {
            id: Date.now(), 
            nombre: formData.nombre.trim(),
            tarea: formData.tarea.trim(),
            descripcion: formData.descripcion.trim(),
            prioridad: formData.prioridad,
            estado: 'pendiente',
            fechaCreacion: new Date().toLocaleDateString('es-ES'),
            fechaVencimiento: formData.fechaVencimiento,
            fechaCompletada: null
        };

        setTareas([...tareas, nuevaTarea]);

        reset();
    };

    const inputClasses = "w-full p-3 mb-4 rounded-lg bg-gray-700 border-2 border-gray-600 focus:border-indigo-500 text-gray-100 placeholder-gray-400 transition duration-300 focus:outline-none";
    
    return(
        <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border-2 border-indigo-500/50 mb-12">
            
            <h2 className="text-3xl font-extrabold text-indigo-400 mb-6 text-center border-b border-gray-700 pb-3">
                <span className="block mb-1"></span> Agregar Nueva Tarea <br />
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               
                <div>
                    <input
                        type="text"
                        {...register('nombre')}
                        placeholder="Nombre de la Tarea (Ej: Proyecto X)"
                        onChange={(e) => handleInputChange(e, 'nombre', 50)}
                        className={inputClasses}
                    />
                    <small className='text-gray-400 text-xs'>
                        {nombreValue.length}/50
                    </small>
                </div>
                
                <div>
                    <input
                        type="text"
                        {...register('tarea')}
                        placeholder="Detalle principal (Ej: Codificar componente)"
                        onChange={(e) => handleInputChange(e, 'tarea', 100)}
                        className={inputClasses}
                    />
                    <small className='text-gray-400 text-xs'>
                        {tareaValue.length}/100
                    </small>
                </div>
                
                <div>
                    <input
                        type="text"
                        {...register('descripcion')}
                        placeholder="Descripción opcional más detallada"
                        onChange={(e) => handleInputChange(e, 'descripcion', 200)}
                        className={inputClasses}
                    />
                    <small className='text-gray-400 text-xs'>
                        {descripcionValue.length}/200
                    </small>
                </div>

                <div className="flex space-x-4">
                    {/* Selector de Prioridad */}
                    <div className="flex-1">
                        <select
                            {...register('prioridad')}
                            className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                            <option value="Dificultad" disabled>Seleccionar Dificultad</option>
                            <option value="baja" className="text-green-400 font-medium">Baja</option>
                            <option value="media" className="text-yellow-400 font-medium">Media</option>
                            <option value="alta" className="text-red-400 font-medium">Alta</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <input
                            type="date"
                            {...register('fechaVencimiento')}
                            placeholder='Fecha de vencimiento'
                            className={inputClasses}
                        />
                    </div>
                </div>
                
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