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

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true,
                proyectoseleccionado: null
            };
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload,
                proyectoseleccionado: null
            };

        case AGREGAR_PROYECTOS:
            return {
                ...state,
                proyectos: [
                    ...state.proyectos,
                    action.payload
                ],
                formulario: false,
                errorformulario: false,
                proyectoseleccionado: null
            };

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true,
                proyectoseleccionado: null
            };

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload._id),
                proyectoseleccionado: null
            };

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null,
                proyectoseleccionado: null
            };

        case EDITAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.map(proyecto => proyecto._id === action.payload._id ? action.payload : proyecto),
                proyectoseleccionado: null
            }

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                proyectoseleccionado: null
            }

        case SELECCIONAR_PROYECTO:
            return {
                ...state,
                proyectoseleccionado: action.payload,
                formulario: false,
            }

        default:
            return state;
    }
}