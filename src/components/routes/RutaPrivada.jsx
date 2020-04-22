import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const RutaPrivada = ({ component: Component, ...props }) => {
    // console.log(props);

    const { autenticado, cargando, usuarioAutenticado } = useContext(authContext);

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return (
        <Route {...props} render={props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
                <Component {...props} />
            )}
        />
    );
}

export default RutaPrivada;