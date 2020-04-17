import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Proyecto = ({ proyecto }) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const onClickProyecto = () => {
        proyectoActual(proyecto);
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