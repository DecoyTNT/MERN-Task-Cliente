import React, { useContext } from 'react'
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, editarTarea, guardarTareaActual } = tareasContext;

    const onClickEliminar = tarea => {
        eliminarTarea(tarea._id);
    }

    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        editarTarea(tarea)
    }

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Completo
                        </button>
                    )
                    : (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Incompleto
                        </button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClickEliminar(tarea)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
}

export default Tarea;