import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {

    const initialState = {
        tareas: [
            { id: 1, nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
            { id: 2, nombre: 'Elegir colores', estado: false, proyectoId: 2 },
            { id: 3, nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 3 },
            { id: 4, nombre: 'Elegir hosting', estado: true, proyectoId: 4 },
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null,
    }

    // Crear state y dispatch
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    const agregarTarea = tarea => {
        tarea.id = uuidv4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const editarTarea = tarea => {
        dispatch({
            type: EDITAR_TAREA,
            payload: tarea
        })
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                editarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    );

}

export default TareaState;