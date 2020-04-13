import React from 'react';

const Proyecto = ({ proyecto }) => {
    return (
        <li>
            <button
                type="button"
                className="btn btn-block"
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;