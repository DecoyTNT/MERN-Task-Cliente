import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            const resp = await clienteAxios.post('/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: resp.data
            });

            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            // TODO: Función para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const resp = await clienteAxios.get('/auth');

            dispatch({
                type: OBTENER_USUARIO,
                payload: resp.data.usuario
            })

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    // Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            const resp = await clienteAxios.post('/auth', datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: resp.data
            });

            usuarioAutenticado();
        } catch (error) {
            if (Array.isArray(error.response.data.errores)) {
                const alerta = {
                    msg: error.response.data.errores[0].msg,
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: LOGIN_ERROR,
                    payload: alerta
                });
            } else {
                const alerta = {
                    msg: error.response.data.msg,
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: LOGIN_ERROR,
                    payload: alerta
                });
            }


        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;