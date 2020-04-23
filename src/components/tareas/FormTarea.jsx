import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { errortarea, tareaseleccionada, agregarTarea, validarTarea, obtenerTareas, editarTarea, limpiarTarea } = tareasContext;

    useEffect(() => {
        if (tareaseleccionada !== null) {
            setTarea(tareaseleccionada);
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])


    const [tarea, setTarea] = useState({
        nombre: ''
    });

    if (!proyecto) return null;

    const { nombre } = tarea;


    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitForm = e => {
        e.preventDefault();

        if (nombre.trim() === '') return validarTarea();

        if (tareaseleccionada) {
            editarTarea(tarea);
            limpiarTarea();
        } else {
            tarea.proyecto = proyectoActual._id;

            agregarTarea(tarea);
            obtenerTareas(proyectoActual._id);

            setTarea({
                nombre: ''
            })
        }
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmitForm}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar tarea ' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTarea;