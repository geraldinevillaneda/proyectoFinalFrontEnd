import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const initialFieldValues = 
{
    id: '',
    nombre_usuario: '',
    tipo_documento: '',
    sexo_usuario: '',
    nacionalidad_usuario: '',
    telefono_usuario: '',
    direccion_usuario: '',
    clave_usuario: ''
}

export default function  LeerUsuario () {

    const valores =  JSON.parse(sessionStorage.getItem('login'));
    const id = valores.datos.id;
    const token = valores.datos.token;

    const [values, setValues] = useState(initialFieldValues);

    const navegacion = useHistory();

    const HandleSubmitDelete = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/users/delete/' + id.toString(), {
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
                    sessionStorage.removeItem('login');
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
        navegacion.push("/editar/usuario");
    }

    fetch('http://localhost:5000/users/' + id.toString(), {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }).then((respuesta) => {
        respuesta.json().then((result) => {
            console.log(result)
            if(!result.Auth)
            {
                navegacion.push('/login');
                alert("El tiempo de sesion expiro");
            }
            else
            {
                values.id = result.datos.id;
                values.nombre_usuario = result.datos.nombre_usuario;
                values.tipo_documento = result.datos.tipo_documento;
                values.sexo_usuario = result.datos.sexo_usuario;
                values.nacionalidad_usuario = result.datos.nacionalidad_usuario;
                values.telefono_usuario = result.datos.telefono_usuario;
                values.direccion_usuario = result.datos.direccion_usuario;
            }
        })
    })


    return(
        <>
            <label className="form-label col-sm-4 labelForm">Tipo de documento:</label>
            <label type="number" className="form-control">{values.tipo_documento}</label>

            <label className="form-label col-sm-4 labelForm">Numero de documento:</label>
            <label type="number" className="form-control">{values.id}</label>

            <label className="form-label col-sm-4 labelForm">Nombre:</label>
            <label type="number" className="form-control">{values.nombre_usuario}</label>

            <label className="form-label col-sm-4 labelForm">Sexo:</label>
            <label type="number" className="form-control">{values.sexo_usuario}</label>

            <label className="form-label col-sm-4 labelForm">Nacionalidad:</label>
            <label type="number" className="form-control">{values.nacionalidad_usuario}</label>

            <label className="form-label col-sm-4 labelForm">Telefono:</label>
            <label type="number" className="form-control">{values.telefono_usuario}</label>

            <label className="form-label col-sm-4 labelForm">Direccion:</label>
            <label type="number" className="form-control">{values.direccion_usuario}</label>

            <br/>
            <br/>

            <button className="btn btn-danger boton " type="submit"  onClickCapture={HandleSubmitDelete}>Eliminar Usuario</button>
            <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitEdit}>Editar Usuario</button>
        </> 
    );

}
