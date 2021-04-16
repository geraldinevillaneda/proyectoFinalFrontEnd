import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


const initialFieldValues = 
{
    
    id_membresia:'',
    ESTADO:'',
    NOMBRE_MEMBRESIA: '',
    DURACION:'',
    PRECIO:'',
}

export default function  LeerMembresia () {

    const valores =  JSON.parse(sessionStorage.getItem('login'));
    const token = valores.datos.token;

    const datosMembresia = JSON.parse(sessionStorage.getItem('membresia'));
    
    const [values] = useState(initialFieldValues);
    console.log("datosMembresia")
    console.log(datosMembresia)

    values.id_membresia = datosMembresia.datos.id_membresia;
    
    values.NOMBRE_MEMBRESIA = datosMembresia.datos.nombre_membresia;
    values.ESTADO = datosMembresia.datos.estado;
    values.DURACION = datosMembresia.datos.duracion;
    values.PRECIO = datosMembresia.datos.precio;    

    const navegacion = useHistory();

    const HandleSubmitDelete = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/membresias/delete/' + values.id_membresia, {
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
                    sessionStorage.removeItem('membresia');
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
        navegacion.push("/editar/membresia");
    }

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
            <h2>Datos de la membresia</h2>
                <form className="row g-3">

                    <label className="form-label col-sm-6 labelForm">id de la membresia:</label>
                    <label type="number" className="col-md-6">{values.id_membresia}</label>

                    <label className="form-label col-sm-6 labelForm">Estado de la membresia:</label>
                    <label type="number" className="col-md-6">{values.ESTADO}</label>

                    <label className="form-label col-sm-6 labelForm">nombre de la membresia:</label>
                    <label type="text" className="col-md-6">{values.NOMBRE_MEMBRESIA}</label>

                    <label className="form-label col-sm-6 labelForm">Duracion de la membresia:</label>
                    <label type="NUMBER" className="col-md-6">{values.DURACION}</label>

                    <label className="form-label col-sm-6 labelForm">Precio de la membresia:</label>
                    <label type="number" className="col-md-6">{values.PRECIO}</label>

                    <br/>
                    <br/>

                    <div className="col-12 divBoton">
                        <button className="btn btn-danger boton " type="submit"  onClickCapture={HandleSubmitDelete}>Eliminar Membresia</button>
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitEdit}>Editar Membresia</button>
                    </div>
                </form>
            </div>
        </div>
    );

}