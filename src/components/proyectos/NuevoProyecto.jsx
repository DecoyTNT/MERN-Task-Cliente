import React, { Fragment, useState } from 'react';

const NuevoProyecto = () => {

    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        // Validar


        // Agregar al state


        // Reiniciar el form


    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
            >
                Nuevo proyecto
        </button>
            <form
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto}
            >
                <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre del proyecto"
                    name="nombre"
                    value={nombre}
                    onChange={onChangeProyecto}
                />
                <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar proyecto"
                />
            </form>
        </Fragment>
    );
}

export default NuevoProyecto;