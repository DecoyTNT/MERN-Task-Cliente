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

export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload
            };

        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [
                    ...state.tareasproyecto,
                    action.payload
                ],
                errortarea: false
            };

        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }

        case EDITAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload
            }

        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null
            }

        case LIMPIAR_TAREAS:
            return {
                ...state,
                tareasproyecto: []
            }

        default:
            return state;
    }
}