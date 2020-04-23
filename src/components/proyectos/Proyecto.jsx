import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { obtenerTareas, limpiarTarea } = tareasContext;

    const onClickProyecto = () => {
        proyectoActual(proyecto);
        obtenerTareas(proyecto._id);
        limpiarTarea();
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-block"
                onClick={onClickProyecto}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;