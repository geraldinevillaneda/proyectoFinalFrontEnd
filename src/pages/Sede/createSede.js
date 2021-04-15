
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet';

import '../Login/login'


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


export default function CreateSede (){


    const [values, setValues] = useState(initialFieldValues);

    const [ESTADO,  setESTADO] = useState('');
    const [NOMBRE_SEDE, setNOMBRE_SEDE] = useState('');
    const [LATITUD, setLATITUD] = useState('');
    const [LONGITUD, setLONGITUD] = useState('');
    const [ID_CIUDAD, setID_CIUDAD] = useState('');
    const [ID_USUARIO, setID_USUARIO] = useState('');
    
    const   url = window.location.href;
    const navigator = useHistory();
    let crear = false;


    if(url.includes('crear/Sede'))
    {
        crear = true
    }
    else
    {
        
        crear = false;

        const datosSedes = JSON.parse(sessionStorage.getItem('sede'));

        const valores =  JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;

        fetch('http://localhost:5000/sedes/' + datosSedes.datos.id_sede, {
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
                    values.NOMBRE_SEDE = result.datos.nombre_sede;
                    values.LATITUD = result.datos.latitud;
                    values.LONGITUD = result.datos.longitud;
                    values.ID_CIUDAD = result.datos.id_ciudad;
                    values.ID_USUARIO = result.datos.id_usuario;
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

        const datosSedes = JSON.parse(sessionStorage.getItem('sede'));

        const valores = JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;
        const userID = valores.datos.id;
        
        const data = {
            id_sede: datosSedes.datos.id_sede,
            estado: document.getElementById('estado').value,
            nombre_sede: document.getElementById('nombre_sede').value,
            latitud: document.getElementById('latitud').value,
            longitud: document.getElementById('longitud').value,
            id_ciudad: document.getElementById('id_ciudad').value,
            id_usuario: userID,
            t001_usuarios_id_usuario: userID,
        };
        console.log('data');
        
        
        
        fetch(('http://localhost:5000/sedes/update/' + data.id_sede) ,{
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
                    sessionStorage.removeItem('sede');
                    sessionStorage.setItem('sede', JSON.stringify({
                        datos: data
                    }));
                    navigator.push('/datos/Sede');
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
            NOMBRE_SEDE: document.getElementById('nombre_sede').value,
            LATITUD: document.getElementById('latitud').value,
            LONGITUD: document.getElementById('longitud').value,
            ID_CIUDAD: document.getElementById('id_ciudad').value,
            ID_USUARIO: userID,
            t001_usuarios_id_usuario: userID,
        };


        fetch('http://localhost:5000/sedes/agregar',{
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
                            <title>Nueva Sede</title>
                        </Helmet>
                        <h2 className='titulo'>Formulario de ingreso de Sede</h2>
                    </>
                    :
                    <>
                        <Helmet>
                            <title>Editar Sede</title>
                        </Helmet>
                        <h2 className='titulo'>Editar Sede</h2>
                    </>
                }
                <form className="row g-3 formulario" autoComplete="off" >

                    <label className="form-label col-sm-4 labelForm">Estado de Sede</label>
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

                    <label className="form-label col-sm-4 labelForm">Nombre de la Sede</label>
                    <div className="col-md-8">
                        {crear ?
                            <input onChange={(e) => setNOMBRE_SEDE(e.target.value)} value={NOMBRE_SEDE}  
                                type="text" className="form-control" id="nombre_sede" placeholder="Nombre sede" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    NOMBRE_SEDE:e.target.value,
                                }
                            )} value={values.NOMBRE_SEDE} type="text" className="form-control" id="nombre_sede" placeholder="Nombre sede" required />
                        } 
                    </div>

                    
                    <label className="form-label col-sm-4 labelForm">Lactitud Estacion</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setLATITUD(e.target.value)} value={LATITUD} 
                                type="number" className="form-control" id="latitud"  placeholder="Latitud" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    LATITUD:e.target.value,
                                }
                            )} value={values.LATITUD} type="number" className="form-control" id="latitud"  placeholder="Latitud" required/>
                        }
                    </div>


                    <label htmlFor="validationDefault03" className="form-label col-sm-4 labelForm">Longitud Estación</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setLONGITUD(e.target.value)} value={LONGITUD} 
                                type="number" className="form-control" id="longitud"  placeholder="longitud" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    LONGITUD:e.target.value,
                                }
                            )} value={values.LONGITUD} type="number" className="form-control" id="longitud"  placeholder="longitud" required/>
                        }
                    </div>


                    <label htmlFor="validationDefault03" className="form-label col-sm-4 labelForm">Id Ciudad</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setID_CIUDAD(e.target.value)} value={ID_CIUDAD} 
                                type="number" className="form-control" id="id_ciudad"  placeholder="id_ciudad" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    ID_CIUDAD:e.target.value,
                                }
                            )} value={values.ID_CIUDAD} type="number" className="form-control" id="id_ciudad"  placeholder="id_ciudad" required/>
                        }
                    </div>

                    
                    

                    
                    
                                                    
                    <div className="col-12 divBoton">
                    {
                        crear?
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitCrear}>Crear Sede</button>
                        :<button className="btn btn-primary boton " type="submit"  onClickCapture={handleSubmitActualizar}>Actualizar Datos</button>
                    }
                    </div>

                </form>
            </div>
        </div>
    );
}
