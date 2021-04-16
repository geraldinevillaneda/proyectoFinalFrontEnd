import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


const initialFieldValues = 
{
    
    ID_CURSO:'',
    ESTADO:'',
    CODIGO_CURSO:'',
    NOMBRE_CURSO:'',
    DESCRIPCION_CURSO:'',
    CREDITOS_CURSO:'',
    CATEGORIA_CURSO:'',
}


export default function  ReadCourse () {

    const valores =  JSON.parse(sessionStorage.getItem('login'));
    const id = valores.datos.id;
    const token = valores.datos.token;

    const datosCursos = JSON.parse(sessionStorage.getItem('curso'));
    
    const [values, setValues] = useState(initialFieldValues);
    console.log("datosCursos")
    console.log(datosCursos)

    values.ID_CURSO = datosCursos.datos.id_curso;
    values.ESTADO = datosCursos.datos.estado;
    values.CODIGO_CURSO = datosCursos.datos.codigo_curso;
    values.NOMBRE_CURSO = datosCursos.datos.nombre_curso;
    values.DESCRIPCION_CURSO = datosCursos.datos.descripcion_curso;
    values.CREDITOS_CURSO = datosCursos.datos.creditos_curso;
    values.CATEGORIA_CURSO = datosCursos.datos.categoria_curso;

    const navegacion = useHistory();

    const HandleSubmitDelete = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/cursos/delete/' + values.ID_CURSO, {
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
                    sessionStorage.removeItem('curso');
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
        navegacion.push("/editar/Curso");
    }

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
            <h2>Datos Curso</h2>
                <form className="row g-3">

                    <label className="form-label col-sm-6 labelForm">Estado del curso:</label>
                    <label type="number" className="col-md-6">{values.ESTADO}</label>

                    <label className="form-label col-sm-6 labelForm">Codigo del curso:</label>
                    <label type="text" className="col-md-6">{values.CODIGO_CURSO}</label>

                    <label className="form-label col-sm-6 labelForm">Nombre del curso:</label>
                    <label type="text" className="col-md-6">{values.NOMBRE_CURSO}</label>

                    <label className="form-label col-sm-6 labelForm">Descripcion del curso:</label>
                    <label type="text" className="col-md-6">{values.DESCRIPCION_CURSO}</label>

                    <label className="form-label col-sm-6 labelForm">Creditos del curso:</label>
                    <label type="number" className="col-md-6">{values.CREDITOS_CURSO}</label>

                    <label className="form-label col-sm-6 labelForm">Categoria del curso:</label>
                    <label type="number" className="col-md-6">{values.CATEGORIA_CURSO}</label>


                    <br/>
                    <br/>

                    <div className="col-12 divBoton">
                        <button className="btn btn-danger boton " type="submit"  onClickCapture={HandleSubmitDelete}>Eliminar Curso</button>
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitEdit}>Editar Curso</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
