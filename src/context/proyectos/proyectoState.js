import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    EDITAR_PROYECTO,
    SELECCIONAR_PROYECTO
} from '../../types';


const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null,
        proyectoseleccionado: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resp = await clienteAxios.get('proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resp.data.proyectos
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        try {
            const resp = await clienteAxios.post('/proyectos', proyecto);
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resp.data.proyecto
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const seleccionarProyecto = proyecto => {
        dispatch({
            type: SELECCIONAR_PROYECTO,
            payload: proyecto
        })
    }

    const proyectoActual = proyecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyecto
        })
    }

    const editarProyecto = async proyecto => {
        try {
            const resp = await clienteAxios.put(`/proyectos/${proyecto._id}`, proyecto);
            dispatch({
                type: EDITAR_PROYECTO,
                payload: resp.data.proyecto
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Elimina el proyecto
    const eliminarProyecto = async proyectoId => {

        try {
            await clienteAxios.delete(`/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                proyectoseleccionado: state.proyectoseleccionado,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto,
                editarProyecto,
                seleccionarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState