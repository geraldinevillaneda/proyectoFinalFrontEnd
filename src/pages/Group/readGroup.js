import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


const initialFieldValues = 
{
    
    ID_GRUPO:'',
    ESTADO:'',
    CUPO_ESTUDIANTES:'',
    SEMESTRE:'',
    TOTAL_ESTUDIANTES:'',
}


export default function  ReadGroup () {

    const valores =  JSON.parse(sessionStorage.getItem('login'));
    const id = valores.datos.id;
    const token = valores.datos.token;

    const datosGrupos = JSON.parse(sessionStorage.getItem('grupo'));
    
    const [values, setValues] = useState(initialFieldValues);
    console.log("datosGrupos")
    console.log(datosGrupos)

    values.ID_GRUPO = datosGrupos.datos.id_grupo;
    values.ESTADO = datosGrupos.datos.estado;
    values.CUPO_ESTUDIANTES = datosGrupos.datos.cupo_estudiantes;
    values.SEMESTRE = datosGrupos.datos.semestre;
    values.TOTAL_ESTUDIANTES = datosGrupos.datos.total_estudiantes;

    const navegacion = useHistory();

    const HandleSubmitDelete = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/grupos/delete/' + values.ID_GRUPO, {
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
                    sessionStorage.removeItem('grupo');
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
        navegacion.push("/editar/Grupo");
    }

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
            <h2>Datos Grupo</h2>
                <form className="row g-3">

                    <label className="form-label col-sm-6 labelForm">Estado del Grupo:</label>
                    <label type="number" className="col-md-6">{values.ESTADO}</label>

                    <label className="form-label col-sm-6 labelForm">Cupo del Grupo:</label>
                    <label type="number" className="col-md-6">{values.CUPO_ESTUDIANTES}</label>

                    <label className="form-label col-sm-6 labelForm">Semestre:</label>
                    <label type="number" className="col-md-6">{values.SEMESTRE}</label>

                    <label className="form-label col-sm-6 labelForm">Total Estudiantes:</label>
                    <label type="number" className="col-md-6">{values.TOTAL_ESTUDIANTES}</label>

                    <br/>
                    <br/>

                    <div className="col-12 divBoton">
                        <button className="btn btn-danger boton " type="submit"  onClickCapture={HandleSubmitDelete}>Eliminar Grupo</button>
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitEdit}>Editar Grupo</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
