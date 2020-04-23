import React, { useContext, useEffect } from 'react'
import authContext from '../../context/auth/authContext';
import tareaContext from '../../context/tareas/tareaContext';

const Barra = () => {

    const { usuario, usuarioAutenticado, cerrarSesion } = useContext(authContext);

    const { limpiarTareas } = useContext(tareaContext);

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    const onClickCerrar = () => {
        limpiarTareas();
        cerrarSesion();
    }

    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre} {usuario.apellidos}</span></p> : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={onClickCerrar}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}

export default Barra;