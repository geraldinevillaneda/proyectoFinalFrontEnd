
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet';

import '../Login/login'


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


export default function CreateCourse (){


    const [values, setValues] = useState(initialFieldValues);

    const [ESTADO,  setESTADO] = useState('');
    const [CODIGO_CURSO, setCODIGO_CURSO] = useState('');
    const [NOMBRE_CURSO, setNOMBRE_CURSO] = useState('');
    const [DESCRIPCION_CURSO, setDESCRIPCION_CURSO] = useState('');
    const [CREDITOS_CURSO, setCREDITOS_CURSO] = useState('');
    const [CATEGORIA_CURSO, setCATEGORIA_CURSO] = useState('');
    
    const   url = window.location.href;
    const navigator = useHistory();
    let crear = false;


    if(url.includes('crear/Curso'))
    {
        crear = true
    }
    else
    {
        
        crear = false;

        const datosCursos = JSON.parse(sessionStorage.getItem('curso'));

        const valores =  JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;

        fetch('http://localhost:5000/cursos/' + datosCursos.datos.id_curso, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((respuesta) => {
            respuesta.json().then((result) => {
                if(result.Auth)
                {         
                    values.ESTADO = result.datos.estado;
                    values.CODIGO_CURSO = result.datos.codigo_curso;
                    values.NOMBRE_CURSO = result.datos.nombre_curso;
                    values.DESCRIPCION_CURSO = result.datos.descripcion_curso;
                    values.CREDITOS_CURSO = result.datos.creditos_curso;
                    values.CATEGORIA_CURSO = result.datos.categoria_curso;
                }
                else
                {
                    if(!result.token)
                    {
                        navigator.push('/login');
                        alert("El tiempo de sesion expiro");
                    }
                    else
                    {
                        alert(result.done);
                    }
                }
            })
        })
    }
    
    const handleSubmitActualizar = (e) =>
    {
        e.preventDefault();

        const datosCursos = JSON.parse(sessionStorage.getItem('curso'));

        const valores = JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;
        const userID = valores.datos.id;
        
        const data = {
            id_curso: datosCursos.datos.id_curso,
            estado: document.getElementById('estado').value,
            codigo_curso: document.getElementById('codigo_curso').value,
            nombre_curso: document.getElementById('nombre_curso').value,
            descripcion_curso: document.getElementById('descripcion_curso').value,
            creditos_curso: document.getElementById('creditos_curso').value,
            categoria_curso: document.getElementById('categoria_curso').value,
        };
        console.log('data');        
        console.log(data);
        
        
        fetch(('http://localhost:5000/cursos/update/' + data.id_curso) ,{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((respuesta) => {
            respuesta.json().then((result) => {
                console.log(result)
                
                if(result.Auth)
                {
                    alert(result.done);
                    sessionStorage.removeItem('curso');
                    sessionStorage.setItem('curso', JSON.stringify({
                        datos: data
                    }));
                    navigator.push('/datos/Curso');
                }
                else
                {
                    if(!result.token)
                    {
                        navigator.push('/login');
                        alert("El tiempo de sesion expiro");
                    }
                    else
                    {
                        alert(result.done);
                    }
                }
            })
        })
    }

    

    const HandleSubmitCrear = (e) => {
        e.preventDefault();
        
        const valores = JSON.parse(sessionStorage.getItem('login'));
        const userID = valores.datos.id;
        const token = valores.datos.token;

        const data = {

            ESTADO: document.getElementById('estado').value,
            CODIGO_CURSO: document.getElementById('codigo_curso').value,
            NOMBRE_CURSO: document.getElementById('nombre_curso').value,            
            DESCRIPCION_CURSO: document.getElementById('descripcion_curso').value,
            CREDITOS_CURSO: document.getElementById('creditos_curso').value,
            CATEGORIA_CURSO: document.getElementById('categoria_curso').value,
        };
console.log("impresion del data",data);

        fetch('http://localhost:5000/cursos/agregar',{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((respuesta) => {
            respuesta.json().then((result) => {
                if(result.Auth)
                {
                    alert(result.done);
                    navigator.push('/dashboard/overview');
                }
                else
                {
                    alert(result.done);
                }
            
            })
        })
    }


    return (
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
                {crear ?
                    <>
                        <Helmet>
                            <title>Nuevo Curso</title>
                        </Helmet>
                        <h2 className='titulo'>Formulario de ingreso de Curso</h2>
                    </>
                    :
                    <>
                        <Helmet>
                            <title>Editar Curso</title>
                        </Helmet>
                        <h2 className='titulo'>Editar Curso</h2>
                    </>
                }
                <form className="row g-3 formulario" autoComplete="off" >

                    <label className="form-label col-sm-4 labelForm">Estado del Curso</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <select onChange={(e) => setESTADO(e.target.value)} value={ESTADO} 
                                    className="form-select" id="estado" >
                                <option value="0">Inactivo</option>
                                <option value="1">Activo</option>
                            </select>
                            :<select onChange={(e) => setValues(
                                {
                                    ESTADO: e.target.value,
                                }
                            )} value={values.ESTADO} className="form-select" id="estado" >
                                <option value="0">Inactivo</option>
                                <option value="1">Activo</option>
                            </select>
                        }
                    </div>

                    <label className="form-label col-sm-4 labelForm">Codigo Curso</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setCODIGO_CURSO(e.target.value)} value={CODIGO_CURSO} 
                                type="text" className="form-control" id="codigo_curso"  placeholder="Codigo_curso" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    CODIGO_CURSO:e.target.value,
                                }
                            )} value={values.CODIGO_CURSO} type="text" className="form-control" id="codigo_curso"  placeholder="Codigo_curso" required/>
                        }
                    </div>

                    <label className="form-label col-sm-4 labelForm">Nombre del Curso</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => setNOMBRE_CURSO(e.target.value)} value={NOMBRE_CURSO}  
                                type="text" className="form-control" id="nombre_curso" placeholder="Nombre curso" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    NOMBRE_CURSO:e.target.value,
                                }
                            )} value={values.NOMBRE_CURSO} type="text" className="form-control" id="nombre_curso" placeholder="Nombre curso" required />
                        } 
                    </div>

                    <label className="form-label col-sm-4 labelForm">Descripcion del Curso</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => setDESCRIPCION_CURSO(e.target.value)} value={DESCRIPCION_CURSO}  
                                type="text" className="form-control" id="descripcion_curso" placeholder="Descripcion curso" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    DESCRIPCION_CURSO:e.target.value,
                                }
                            )} value={values.DESCRIPCION_CURSO} type="text" className="form-control" id="descripcion_curso" placeholder="Descripcion curso" required />
                        } 
                    </div>

                    <label className="form-label col-sm-4 labelForm">Creditos del curso</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setCREDITOS_CURSO(e.target.value)} value={CREDITOS_CURSO} 
                                type="number" className="form-control" id="creditos_curso"  placeholder="Creditos curso" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    CREDITOS_CURSO:e.target.value,
                                }
                            )} value={values.CREDITOS_CURSO} type="number" className="form-control" id="creditos_curso"  placeholder="Creditos curso" required/>
                        }
                    </div>


                    <label className="form-label col-sm-4 labelForm">Categoria del Curso</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setCATEGORIA_CURSO(e.target.value)} value={CATEGORIA_CURSO} 
                                type="number" className="form-control" id="categoria_curso"  placeholder="Categoria curso" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    CATEGORIA_CURSO:e.target.value,
                                }
                            )} value={values.CATEGORIA_CURSO} type="number" className="form-control" id="categoria_curso"  placeholder="Categoria curso" required/>
                        }
                    </div>
                          
                    <div className="col-12 divBoton">
                    {
                        crear?
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitCrear}>Crear Curso</button>
                        :<button className="btn btn-primary boton " type="submit"  onClickCapture={handleSubmitActualizar}>Actualizar Datos</button>
                    }
                    </div>

                </form>
            </div>
        </div>
    );
}
