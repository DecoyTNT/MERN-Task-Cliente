import React, { useContext, useEffect } from 'react'
import authContext from '../../context/auth/authContext';

const Barra = () => {

    const { usuario, usuarioAutenticado, cerrarSesion } = useContext(authContext);

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])



    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre} {usuario.apellidos}</span></p> : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}

export default Barra;