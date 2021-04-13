
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet';

import '../Login/login'


const initialFieldValues = 
{
    id: '',
    nombre_estacion: '',
    direccion_estacion: '',
    telefono_estacion: '',
    lactitud_estacion: '',
    longintud_estacion: '',
}


export default function CreateGasolinera (){

    
    const datosGasolineria = JSON.parse(sessionStorage.getItem('estacion'));

    const [values, setValues] = useState(initialFieldValues);

    const [id, setId_estacion] = useState('');
    const [nombreEstacion, setNombre_estacion] = useState('');
    const [direccionEstacion, setDireccion_estacion] = useState('');
    const [telefonoEstacion, setTelefono_estacion] = useState('');
    const [lactitudEstacion, setLactitud_estacion] = useState('');
    const [longintudEstacion, setLongintud_estacion] = useState('');

    
    const   url = window.location.href;
    const navigator = useHistory();
    let crear = false;


    if(url.includes('crear/Estacion'))
    {
        crear = true
    }
    else
    {
        
        crear = false;


        const valores =  JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;

        fetch('http://localhost:5000/gasolineras/' + datosGasolineria.datos.id, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((respuesta) => {
            respuesta.json().then((result) => {
                if(result.Auth)
                {           
                    console.log(result); 
                    values.id = result.datos.id;
                    values.nombre_estacion = result.datos.nombre_estacion;
                    values.direccion_estacion = result.datos.direccion_estacion;
                    values.telefono_estacion = result.datos.telefono_estacion;
                    values.latitud_estacion = result.datos.latitud_estacion;
                    values.longitud_estacion = result.datos.longitud_estacion;
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
        
        const data = {
            id:datosGasolineria.datos.id,
            nombre_estacion: document.getElementById("nombre").value,
            direccion_estacion:document.getElementById("direccion").value,
            telefono_estacion:document.getElementById("telefono").value,
            latitud_estacion:document.getElementById("lactitud").value,
            longitud_estacion:document.getElementById("longitud").value,
        };
        console.log(data);
        const valores = JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;

        fetch(('http://localhost:5000/gasolineras/update/' + data.id) ,{
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
                    sessionStorage.removeItem('estacion');
                    sessionStorage.setItem('estacion', JSON.stringify({
                        datos: data
                    }));
                    navigator.push('/datos/Estacion');
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
            userId: userID,
            id:document.getElementById("id").value,
            nombre_estacion: document.getElementById("nombre").value,
            direccion_estacion:document.getElementById("direccion").value,
            telefono_estacion:document.getElementById("telefono").value,
            latitud_estacion:document.getElementById("lactitud").value,
            longitud_estacion:document.getElementById("longitud").value,
        };


        fetch('http://localhost:5000/gasolineras/agregar',{
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
                            <title>Nueva Estacion</title>
                        </Helmet>
                        <h2 className='titulo'>Formulario de ingreso de Estación</h2>
                    </>
                    :
                    <>
                        <Helmet>
                            <title>Editar Estacion</title>
                        </Helmet>
                        <h2 className='titulo'>Editar Estacion</h2>
                    </>
                }
                <form className="row g-3 formulario" autoComplete="off" >

                    <label className="form-label col-sm-4 labelForm">Numero de Identificación</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => setId_estacion(e.target.value)} value={id} 
                                type="number" className="form-control" id="id" placeholder="Nro de identificación" required/>
                            : <label type="number" className="form-control" id="id" placeholder="Nro de identificación">{values.id}</label>
                        }
                    </div>

                    
                    <label className="form-label col-sm-4 labelForm">Nombre de la Estación</label>
                    <div className="col-md-8">
                        {crear ?
                            <input onChange={(e) => setNombre_estacion(e.target.value)} value={nombreEstacion}  
                                type="text" className="form-control" id="nombre" placeholder="Nombre Estacion" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    id:values.id,
                                    nombre_estacion:e.target.value,
                                }
                            )} value={values.nombre_estacion} type="text" className="form-control" id="nombre" placeholder="Nombre estacion" required />
                        } 
                    </div>

                    
                    <label className="form-label col-sm-4 labelForm">Dirección Estación</label>
                    <div className="col-md-8">
                        {crear ?
                            <input onChange={(e) => setDireccion_estacion(e.target.value)} value={direccionEstacion}  
                                type="text" className="form-control" id="direccion" placeholder="direccion Estacion" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    id:values.id,
                                    direccion_estacion:e.target.value,
                                }
                            )} value={values.direccion_estacion} type="text" className="form-control" id="direccion" placeholder="direccion estacion" required />
                        } 
                    </div>

                    
                    <label className="form-label col-sm-4 labelForm">Telefono Estación</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => setTelefono_estacion(e.target.value)} value={telefonoEstacion}  
                                type="number" className="form-control" id="telefono" placeholder="telefono Estacion" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    id:values.id,
                                    telefono_estacion:e.target.value,
                                }
                            )} value={values.telefono_estacion} type="number" className="form-control" id="telefono" placeholder="telefono estacion" required />
                        } 
                    </div>

                    
                    <label className="form-label col-sm-4 labelForm">Lactitud Estacion</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setLactitud_estacion(e.target.value)} value={lactitudEstacion} 
                                type="number" className="form-control" id="lactitud"  placeholder="Lactitud" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    id:values.id,
                                    latitud_estacion:e.target.value,
                                }
                            )} value={values.latitud_estacion} type="number" className="form-control" id="lactitud"  placeholder="Lactitud" required/>
                        }
                    </div>

                    
                    <label htmlFor="validationDefault03" className="form-label col-sm-4 labelForm">Longitud Estación</label>
                    <div className="col-md-8 listaOpciones">
                        { crear ?
                            <input onChange={(e) => setLongintud_estacion(e.target.value)} value={longintudEstacion} 
                                type="number" className="form-control" id="longitud"  placeholder="longitud" required/>
                            : <input onChange={(e) => setValues(
                                {
                                    id:values.id,
                                    longitud_estacion:e.target.value,
                                }
                            )} value={values.longitud_estacion} type="number" className="form-control" id="longitud"  placeholder="longitud" required/>
                        }
                    </div>
                                                    
                    <div className="col-12 divBoton">
                    {
                        crear?
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitCrear}>Crear Gasolinera</button>
                        :<button className="btn btn-primary boton " type="submit"  onClickCapture={handleSubmitActualizar}>Actualizar Datos</button>
                    }
                    </div>

                </form>
            </div>
        </div>
    );
}
