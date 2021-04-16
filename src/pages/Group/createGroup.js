
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet';

import '../Login/login'


const initialFieldValues = 
{
    ID_GRUPO:'',
    ESTADO:'',
    CUPO_ESTUDIANTES:'',
    SEMESTRE:'',
    TOTAL_ESTUDIANTES:'',
}


export default function CreateGroup (){


    const [values, setValues] = useState(initialFieldValues);

    const [ESTADO,  setESTADO] = useState('');
    const [CUPO_ESTUDIANTES, setCUPO_ESTUDIANTES] = useState('');
    const [SEMESTRE, setSEMESTRE] = useState('');
    const [TOTAL_ESTUDIANTES, setTOTAL_ESTUDIANTES] = useState('');
    
    const   url = window.location.href;
    const navigator = useHistory();
    let crear = false;


    if(url.includes('crear/Grupo'))
    {
        crear = true
    }
    else
    {
        
        crear = false;

        const datosGrupos = JSON.parse(sessionStorage.getItem('grupo'));

        const valores =  JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;

        fetch('http://localhost:5000/grupos/' + datosGrupos.datos.id_grupo, {
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
                    values.CUPO_ESTUDIANTES = result.datos.cupo_estudiantes;
                    values.SEMESTRE = result.datos.semestre;
                    values.TOTAL_ESTUDIANTES = result.datos.total_estudiantes;
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

        const datosGrupos = JSON.parse(sessionStorage.getItem('grupo'));

        const valores = JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;
        const userID = valores.datos.id;
        
        const data = {
            id_grupo: datosGrupos.datos.id_grupo,
            estado: document.getElementById('estado').value,
            cupo_estudiantes: document.getElementById('cupo_estudiantes').value,
            semestre: document.getElementById('semestre').value,
            total_estudiantes: document.getElementById('total_estudiantes').value,
        };
        console.log('data');
        console.log(data);
        

        fetch(('http://localhost:5000/grupos/update/' + data.id_grupo) ,{
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
                    sessionStorage.removeItem('grupo');
                    sessionStorage.setItem('grupo', JSON.stringify({
                        datos: data
                    }));
                    navigator.push('/datos/Grupo');
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
            CUPO_ESTUDIANTES: document.getElementById('cupo_estudiantes').value,
            SEMESTRE: document.getElementById('semestre').value,
            TOTAL_ESTUDIANTES: document.getElementById('total_estudiantes').value,
            
        };


        fetch('http://localhost:5000/grupos/agregar',{
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
                            <title>Nuevo Grupo</title>
                        </Helmet>
                        <h2 className='titulo'>Formulario de ingreso de Grupo</h2>
                    </>
                    :
                    <>
                        <Helmet>
                            <title>Editar Grupo</title>
                        </Helmet>
                        <h2 className='titulo'>Editar Grupo</h2>
                    </>
                }
                <form className="row g-3 formulario" autoComplete="off" >

                    <label className="form-label col-sm-4 labelForm">Estado de Grupo</label>
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

                    <label className="form-label col-sm-4 labelForm">Cupo del grupo</label>
                    <div className="col-md-8">
                        {crear ?
                            <input onChange={(e) => setCUPO_ESTUDIANTES(e.target.value)} value={CUPO_ESTUDIANTES}  
                                type="number" className="form-control" id="cupo_estudiantes" placeholder="Cupo estudiantes" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    CUPO_ESTUDIANTES:e.target.value,
                                }
                            )} value={values.CUPO_ESTUDIANTES} type="number" className="form-control" id="cupo_estudiantes" placeholder="Cupo estudiantes" required />
                        } 
                    </div>

                    
                    <label className="form-label col-sm-4 labelForm">Semestre</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setSEMESTRE(e.target.value)} value={SEMESTRE} 
                                type="number" className="form-control" id="semestre"  placeholder="Semestre" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    SEMESTRE:e.target.value,
                                }
                            )} value={values.SEMESTRE} type="number" className="form-control" id="semestre"  placeholder="Semestre" required/>
                        }
                    </div>


                    <label htmlFor="validationDefault03" className="form-label col-sm-4 labelForm">Total estudiantes</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setTOTAL_ESTUDIANTES(e.target.value)} value={TOTAL_ESTUDIANTES} 
                                type="number" className="form-control" id="total_estudiantes"  placeholder="Total estudiantes" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    TOTAL_ESTUDIANTES:e.target.value,
                                }
                            )} value={values.TOTAL_ESTUDIANTES} type="number" className="form-control" id="total_estudiantes"  placeholder="Total estudiantes" required/>
                        }
                    </div>

             
                                                    
                    <div className="col-12 divBoton">
                    {
                        crear?
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitCrear}>Crear Grupo</button>
                        :<button className="btn btn-primary boton " type="submit"  onClickCapture={handleSubmitActualizar}>Actualizar Datos</button>
                    }
                    </div>

                </form>
            </div>
        </div>
    );
}
