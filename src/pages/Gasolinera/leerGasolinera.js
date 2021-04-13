import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


const initialFieldValues = 
{
    
    id_estacion: '',
    nombre_estacion: '',
    direccion_estacion: '',
    telefono_estacion: '',
    lactitud_estacion: '',
    longitud_estacion: '',
}


export default function  LeerUsuario () {

    const valores =  JSON.parse(sessionStorage.getItem('login'));
    const id = valores.datos.id;
    const token = valores.datos.token;

    const datosGasolineria = JSON.parse(sessionStorage.getItem('estacion'));
    
    const [values, setValues] = useState(initialFieldValues);

    values.id_estacion = datosGasolineria.datos.id;
    values.nombre_estacion = datosGasolineria.datos.nombre_estacion;
    values.direccion_estacion = datosGasolineria.datos.direccion_estacion;
    values.telefono_estacion = datosGasolineria.datos.telefono_estacion;
    values.lactitud_estacion = datosGasolineria.datos.latitud_estacion;
    values.longitud_estacion = datosGasolineria.datos.longitud_estacion;

    const navegacion = useHistory();

    const HandleSubmitDelete = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/gasolineras/delete/' + values.id_estacion, {
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
                    sessionStorage.removeItem('estacion');
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
        navegacion.push("/editar/Estacion");
    }

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
            <h2>Datos Estación</h2>
                <form className="row g-3">
                    <label className="form-label col-sm-6 labelForm">Numero de Identificación:</label>
                    <label type="number" className="col-md-6">{values.id_estacion}</label>

                    <label className="form-label col-sm-6 labelForm">Nombre de la Estación:</label>
                    <label type="number" className="col-md-6">{values.nombre_estacion}</label>

                    <label className="form-label col-sm-6 labelForm">Direccion de la Estación:</label>
                    <label type="number" className="col-md-6">{values.direccion_estacion}</label>

                    <label className="form-label col-sm-6 labelForm">Telefono de la Estación:</label>
                    <label type="number" className="col-md-6">{values.telefono_estacion}</label>

                    <label className="form-label col-sm-6 labelForm">Latitud:</label>
                    <label type="number" className="col-md-6">{values.lactitud_estacion}</label>

                    <label className="form-label col-sm-6 labelForm">Longitud:</label>
                    <label type="number" className="col-md-6">{values.longitud_estacion}</label>

                    <br/>
                    <br/>

                    <div className="col-12 divBoton">
                        <button className="btn btn-danger boton " type="submit"  onClickCapture={HandleSubmitDelete}>Eliminar Estación</button>
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitEdit}>Editar Estación</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
