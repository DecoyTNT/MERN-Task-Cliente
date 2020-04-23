import React, { useEffect, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    // Extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const { alerta, mostrarAlerta } = useContext(alertaContext);

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    // Revisar si hay proyectos para mostrar
    if (proyectos.length === 0) return <p>No hay proyectos, agrega un nuevo proyecto</p>;

    return (
        <ul className="listado-proyectos">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;