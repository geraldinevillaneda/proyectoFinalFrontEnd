import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


const initialFieldValues = 
{
    
    ID_SEDE:'',
    ESTADO:'',
    NOMBRE_SEDE:'',
    LATITUD:'',
    LONGITUD:'',
    ID_CIUDAD:'',
    ID_USUARIO:'',
    t001_usuarios_id_usuario:'',
}


export default function  LeerSede () {

    const valores =  JSON.parse(sessionStorage.getItem('login'));

    const token = valores.datos.token;

    const datosSedes = JSON.parse(sessionStorage.getItem('sede'));
    
    const [values] = useState(initialFieldValues);
    console.log("datosSedes")
    console.log(datosSedes)

    values.ID_SEDE = datosSedes.datos.id_sede;
    values.ESTADO = datosSedes.datos.estado;
    values.NOMBRE_SEDE = datosSedes.datos.nombre_sede;
    values.LATITUD = datosSedes.datos.latitud;
    values.LONGITUD = datosSedes.datos.longitud;
    values.ID_CIUDAD = datosSedes.datos.id_ciudad;
    values.ID_USUARIO = datosSedes.datos.id_usuario;

    const navegacion = useHistory();

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
                    navegacion.push('/');
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

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
            <h2>Datos Sede</h2>
                <form className="row g-3">

                    <label className="form-label col-sm-6 labelForm">Estado de la sede:</label>
                    <label type="number" className="col-md-6">{values.ESTADO}</label>

                    <label className="form-label col-sm-6 labelForm">Nombre de la Sede:</label>
                    <label type="text" className="col-md-6">{values.NOMBRE_SEDE}</label>

                    <label className="form-label col-sm-6 labelForm">Latitud:</label>
                    <label type="number" className="col-md-6">{values.LATITUD}</label>

                    <label className="form-label col-sm-6 labelForm">Longitud:</label>
                    <label type="number" className="col-md-6">{values.LONGITUD}</label>

                    <label className="form-label col-sm-6 labelForm">Id Ciudad:</label>
                    <label type="number" className="col-md-6">{values.ID_CIUDAD}</label>

                    <br/>
                    <br/>

                    <div className="col-12 divBoton">
                        <button className="btn btn-danger boton " type="submit"  onClickCapture={HandleSubmitDelete}>Eliminar Sede</button>
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitEdit}>Editar Sede</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
