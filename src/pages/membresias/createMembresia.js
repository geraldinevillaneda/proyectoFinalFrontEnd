import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet';

import '../Login/login'


const initialFieldValues = 
{
    ID_MEMBRESIA:'',
    ESTADO:'',
    NOMBRE_MEMBRESIA:'',
    DURACION:'',
    PRECIO:'',

}


export default function CreateMembresia (){


    const [values, setValues] = useState(initialFieldValues);

    const [ESTADO,  setESTADO] = useState('');
    const [NOMBRE_MEMBRESIA, setNOMBRE_SEDE] = useState('');
    const [DURACION, setLATITUD] = useState('');
    const [PRECIO, setLONGITUD] = useState('');

    
    const   url = window.location.href;
    const navigator = useHistory();
    let crear = false;


    if(url.includes('crear/membresia'))
    {
        crear = true
    }
    else
    {
        
        crear = false;

        const datosMembresia = JSON.parse(sessionStorage.getItem('membresia'));

        const valores =  JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;

        fetch('http://localhost:5000/membresias/' + datosMembresia.datos.id_membresia, {
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
                    values.NOMBRE_MEMBRESIA = result.datos.nombre_membresia;
                    values.DURACION = result.datos.duracion;
                    values.PRECIO = result.datos.precio;

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

        const datosSedes = JSON.parse(sessionStorage.getItem('membresia'));

        const valores = JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;

        const data = {
            id_membresia: datosSedes.datos.id_membresia,
            estado: document.getElementById('estado').value,
            nombre_membresia: document.getElementById('nombre_membresia').value,
            duracion: document.getElementById('duracion').value,
            precio: document.getElementById('precio').value,
        };
        console.log('data');
        console.log(data);
        

        fetch(('http://localhost:5000/membresias/update/' + data.id_membresia) ,{
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
                    sessionStorage.removeItem('membresia');
                    sessionStorage.setItem('membresia', JSON.stringify({
                        datos: data
                    }));
                    navigator.push('/datos/membresia');
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
        const token = valores.datos.token;

        const data = {

            ESTADO: document.getElementById('estado').value,
            NOMBRE_MEMBRESIA: document.getElementById('nombre_membresia').value,
            DURACION: document.getElementById('duracion').value,
            PRECIO: document.getElementById('precio').value,
        };


        fetch('http://localhost:5000/membresias/agregar',{
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
                            <title>Nueva Membresia</title>
                        </Helmet>
                        <h2 className='titulo'>Formulario de ingreso de membresia</h2>
                    </>
                    :
                    <>
                        <Helmet>
                            <title>Editar membresia</title>
                        </Helmet>
                        <h2 className='titulo'>Editar membresia</h2>
                    </>
                }
                <form className="row g-3 formulario" autoComplete="off" >

                    <label className="form-label col-sm-4 labelForm">Estado de la membresia</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <select onChange={(e) => setESTADO(e.target.value)} value={ESTADO} 
                                    className="form-select" id="estado" >
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                            :<select onChange={(e) => setValues(
                                {
                                    ESTADO: e.target.value,
                                }
                            )} value={values.ESTADO} className="form-select" id="estado" >
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                        }
                    </div>

                    <label className="form-label col-sm-4 labelForm">Nombre de la membresia</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => setNOMBRE_SEDE(e.target.value)} value={NOMBRE_MEMBRESIA}  
                                type="text" className="form-control" id="nombre_membresia" placeholder="Nombre sede" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    NOMBRE_MEMBRESIA:e.target.value,
                                }
                            )} value={values.NOMBRE_MEMBRESIA} type="text" className="form-control" id="nombre_membresia" placeholder="Nombre sede" required />
                        } 
                    </div>

                    <label className="form-label col-sm-4 labelForm">Duracion de la membresia</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => setLATITUD(e.target.value)} value={DURACION}  
                                type="number" className="form-control" id="duracion" placeholder="Duracion de la membresia" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    DURACION:e.target.value,
                                }
                            )} value={values.DURACION} type="text" className="form-control" id="duracion" placeholder="Duracion de la membresia" required />
                        } 
                    </div>
                    
                    <label className="form-label col-sm-4 labelForm">Precio de la membresia</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => setLONGITUD(e.target.value)} value={PRECIO}  
                                type="number" className="form-control" id="precio" placeholder="Precio de la membresia" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    PRECIO:e.target.value,
                                }
                            )} value={values.PRECIO} type="text" className="form-control" id="precio" placeholder="Precio de la membresia" required />
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