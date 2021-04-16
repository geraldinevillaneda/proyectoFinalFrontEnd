import React, {useState} from 'react'

const initialFieldValues = 
{
    
    ID_RELACION:'',
    ESTADO:'',
    ID_MEMBRESIA:'',
    ID_USUARIO:'',
    FECHA_COMPRA:'',
    FECHA_ACTIVACION:'',
    T001_USUARIOS_ID_USUARIO:'',
    T004_MEMBRESIA_ID_MEMBRESIA:'',
}

export default function  LeerMembresiaxUsr () {

    const datosMembresia = JSON.parse(sessionStorage.getItem('estado'));

    const [values] = useState(initialFieldValues);
    
    values.ESTADO = datosMembresia.datos.estado;
    values.ID_MEMBRESIA = datosMembresia.datos.id_membresia;
    values.ID_USUARIO = datosMembresia.datos.id_usuario;
    values.FECHA_COMPRA = datosMembresia.datos.fecha_compra;
    values.FECHA_ACTIVACION = datosMembresia.datos.fecha_activacion;
    values.T001_USUARIOS_ID_USUARIO = datosMembresia.datos.t001_usuarios_id_usuarios;
    values.T004_MEMBRESIA_ID_MEMBRESIA = datosMembresia.t004_membresia_id_membresia;
    
    
    console.log("datosMembresia")
    console.log(datosMembresia)

/*
    fetch('http://localhost:5000/membresias/usr/' + id,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
        }
        }).then((respuesta) => {
            respuesta.json().then((result) => {
                console.log("++");
                if(result.Auth)
                {
                    alert(result.done);
                    values.ID_RELACION = result.datos.estado;
                    values.ESTADO = result.datos.estado;
                    values.ID_MEMBRESIA = result.datos.id_membresia;
                    values.ID_USUARIO = result.datos.id_usuario;
                    values.FECHA_COMPRA = result.datos.fecha_compra;
                    values.FECHA_ACTIVACION = result.datos.fecha_activacion;
                    values.T001_USUARIOS_ID_USUARIO = result.datos.t001_usuarios_id_usuarios;
                    values.T004_MEMBRESIA_ID_MEMBRESIA = result.t004_membresia_id_membresia;
                }
                else
                {
                    alert(result.done);
                }
            
            })
        })*/
    
/*
    const HandleSubmitDelete = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/sedes/delete/' + values.ID_SEDE, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((respuesta) => {
            respuesta.json().then((result) => {
                if(result.Auth)
                {
                    alert(result.done);
                    navegacion.push('/editar/usuario');
                    sessionStorage.removeItem('sede');
                }
                else
                {
                    alert(result.done);
                }
            })
        })
    }

    const HandleSubmitEdit = (e) => {
        e.preventDefault();
        navegacion.push("/editar/Sede");
    }
*/

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
            <h2>Datos de la membresia</h2>
                <form className="row g-3">

                    <label className="form-label col-sm-6 labelForm">Estado de la membresia:</label>
                    <label type="number" className="col-md-6">{values.ESTADO}</label>

                    <label className="form-label col-sm-6 labelForm">Fecha de compra:</label>
                    <label type="text" className="col-md-6">{values.FECHA_COMPRA}</label>

                    <label className="form-label col-sm-6 labelForm">Fecha de activacion:</label>
                    <label type="text" className="col-md-6">{values.FECHA_ACTIVACION}</label>

                    <label className="form-label col-sm-6 labelForm">Id del usuario:</label>
                    <label type="number" className="col-md-6">{values.ID_USUARIO}</label>

                    <label className="form-label col-sm-6 labelForm">Id de la membresia:</label>
                    <label type="number" className="col-md-6">{values.ID_MEMBRESIA}</label>

                    <br/>
                    <br/>
                </form>
            </div>
        </div>
    );

}