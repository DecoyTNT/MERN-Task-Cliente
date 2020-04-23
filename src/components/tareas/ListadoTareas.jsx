import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto, seleccionarProyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;

    if (!proyecto) return <h2>Selecciona un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // const tareasProyecto = tareas;


    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>

                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >
                Eliminar proyecto &times;
            </button>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => seleccionarProyecto(proyectoActual)}
            >
                Editar proyecto
            </button>
        </Fragment>
    );
}

export default ListadoTareas;