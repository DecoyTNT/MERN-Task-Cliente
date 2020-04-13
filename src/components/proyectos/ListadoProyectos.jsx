import React from 'react';
import Proyecto from './Proyecto';

const ListadoProyectos = () => {

    const proyectos = [
        { nombre: 'Tienda virtual' },
        { nombre: 'Intranet' },
        { nombre: 'Diseño de sitio web' },
    ]

    return (
        <ul className="listado-proyectos">
            {proyectos.map(proyecto => (
                <Proyecto
                    key={proyecto.nombre}
                    proyecto={proyecto}
                />
            ))}
        </ul>
    );
}

export default ListadoProyectos;