import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA,
    LIMPIAR_TAREA,
    LIMPIAR_TAREAS
} from '../../types';

const TareaState = props => {

    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
    }

    // Crear state y dispatch
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = async proyecto => {
        try {
            const resp = await clienteAxios.get('/tareas', { params: { proyecto } });
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resp.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    const agregarTarea = async tarea => {
        try {
            const resp = await clienteAxios.post('/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resp.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async id => {
        try {
            await clienteAxios.delete(`/tareas/${id}`)
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async tarea => {
        try {
            const resp = await clienteAxios.put(`/tareas/${tarea._id}`, tarea);
            dispatch({
                type: EDITAR_TAREA,
                payload: resp.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    // Elimina las tareas unicamente del state
    const limpiarTareas = () => {
        dispatch({
            type: LIMPIAR_TAREAS
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                editarTarea,
                limpiarTarea,
                limpiarTareas
            }}
        >
            {props.children}
        </tareaContext.Provider>
    );

}

export default TareaState;