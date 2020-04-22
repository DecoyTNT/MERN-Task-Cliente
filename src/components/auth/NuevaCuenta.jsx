import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/auth/authContext';


const NuevaCuenta = (props) => {

    const alertasContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = alertasContext;

    // Obtener el state del formulario
    const authsContext = useContext(authContext);
    const { mensaje, autenticado, registrarUsuario } = authsContext;

    // En caso de que el usuario 
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, apellidos, email, password, confirmar } = usuario;

    const onChange = e => {

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        if (nombre.trim() === '' || apellidos.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            return mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        if (password.length < 6) {
            return mostrarAlerta('El pasword debe contener al menos 6 caracteres', 'alerta-error');
        }

        if (password !== confirmar) {
            return mostrarAlerta('Los passwords son diferentes, deben ser iguales', 'alerta-error');
        }

        registrarUsuario({
            nombre,
            apellidos,
            email,
            password
        });
    }

    return (
        <div className="form-usuario">
            {alerta ? <p className={`alerta ${alerta.categoria}`}>{alerta.msg}</p> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                            type="text"
                            name="apellidos"
                            id="apellidos"
                            placeholder="Tus apellidos"
                            value={apellidos}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Tu password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input
                            type="password"
                            name="confirmar"
                            id="confirmar"
                            placeholder="Repite tu password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            className="btn btn-primario btn-block"
                            type="submit"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Ya tengo cuenta
                </Link>
            </div>
        </div>
    );
}

export default NuevaCuenta;