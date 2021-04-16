import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const initialFieldValues = 
{
    ID_USUARIO: '',
    PRIMER_NOMBRE: '', 
    SEGUNDO_NOMBRE: '', 
    PRIMER_APELLIDO: '', 
    SEGUNDO_APELLIDO: '', 
    SEXO: '', 
    TIPO_DOCUMENTO: '',
    NUMERO_DOCUMENTO: '',
    CORREO_ELECTRONICO: '',
    CELUAR: '',
    ROL: '',
}

export default function  LeerUsuario () {

    const valores =  JSON.parse(sessionStorage.getItem('login'));
    const id = valores.datos.id;
    const token = valores.datos.token;

    const [values] = useState(initialFieldValues);

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
                values.ID_USUARIO = result.datos.id_usuario;
                values.PRIMER_NOMBRE =  result.datos.primer_nombre;
                values.SEGUNDO_NOMBRE =  result.datos.segundo_nombre;
                values.PRIMER_APELLIDO =  result.datos.primer_apellido;
                values.SEGUNDO_APELLIDO =  result.datos.segundo_apellido;
                values.SEXO =  result.datos.sexo;
                values.TIPO_DOCUMENTO = result.datos.tipo_documento;
                values.NUMERO_DOCUMENTO = result.datos.numero_documento;
                values.CORREO_ELECTRONICO = result.datos.correo_electronico;
                values.CELUAR = result.datos.celuar;
                values.ROL = result.datos.rol;
            }
        })
    })


    return(
        <>
            <label className="form-label col-sm-4 labelForm">Tipo de documento:</label>
            <label type="number" className="form-control">{values.TIPO_DOCUMENTO}</label>

            <label className="form-label col-sm-4 labelForm">Numero de documento:</label>
            <label type="number" className="form-control">{values.NUMERO_DOCUMENTO}</label>

            <label className="form-label col-sm-4 labelForm">Nombres:</label>
            <label type="number" className="form-control">{values.PRIMER_NOMBRE} {values.SEGUNDO_NOMBRE}</label>

            <label className="form-label col-sm-4 labelForm">Apellidos:</label>
            <label type="number" className="form-control">{values.PRIMER_NOMBRE} {values.SEGUNDO_APELLIDO}</label>

            <label className="form-label col-sm-4 labelForm">Sexo:</label>
            <label type="number" className="form-control">{values.SEXO}</label>

            <label className="form-label col-sm-4 labelForm">Celular:</label>
            <label type="number" className="form-control">{values.CELUAR}</label>

            <label className="form-label col-sm-4 labelForm">Correo Electronico:</label>
            <label type="number" className="form-control">{values.CORREO_ELECTRONICO}</label>

            <label className="form-label col-sm-4 labelForm">Rol:</label>
            <label type="number" className="form-control">{values.ROL}</label>

            <br/>
            <br/>

            <button className="btn btn-danger boton " type="submit"  onClickCapture={HandleSubmitDelete}>Eliminar Usuario</button>
            <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitEdit}>Editar Usuario</button>
        </> 
    );

}
