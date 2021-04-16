import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


const initialFieldValues = 
{
    ID_ROL:'',
    NOMBRE_ROL:'',
    TIPO_ROL:''
}


export default function  LeerRol () {

    const valores =  JSON.parse(sessionStorage.getItem('login'));
    const token = valores.datos.token;

    const datosRoles = JSON.parse(sessionStorage.getItem('rol'));
    const [values] = useState(initialFieldValues);

    values.ID_ROL = datosRoles.datos.id_rol;
    values.NOMBRE_ROL = datosRoles.datos.nombre_rol;
    values.TIPO_ROL = datosRoles.datos.tipo_rol;

    const navegacion = useHistory();

    const HandleSubmitDelete = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/roles/delete/' + values.ID_ROL, {
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
                    sessionStorage.removeItem('rol');
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
        navegacion.push("/editar/Rol");
    }

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
            <h2>Datos Rol</h2>
                <form className="row g-3">

                    <label className="form-label col-sm-6 labelForm">Nombre Rol:</label>
                    <label type="number" className="col-md-6">{values.NOMBRE_ROL}</label>

                    <label className="form-label col-sm-6 labelForm">Tipo de Rol:</label>
                    <label type="number" className="col-md-6">{values.TIPO_ROL}</label>

                    <br/>
                    <br/>

                    <div className="col-12 divBoton">
                        <button className="btn btn-danger boton " type="submit"  onClickCapture={HandleSubmitDelete}>Eliminar Rol</button>
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitEdit}>Editar Rol</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
