
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet';

import '../Login/login'


const initialFieldValues = 
{
    ID_ROL:'',
    NOMBRE_ROL:'',
    TIPO_ROL:''
}


export default function CreateRol (){


    const [values, setValues] = useState(initialFieldValues);

    const [NOMBRE_ROL,  SetNOMBRE_ROL] = useState('');
    const [TIPO_ROL, SetTIPO_ROL] = useState('');

    
    const   url = window.location.href;
    const navigator = useHistory();
    let crear = false;


    if(url.includes('crear/Rol'))
    {
        crear = true
    }
    else
    {
        
        crear = false;

        const datosRoles = JSON.parse(sessionStorage.getItem('rol'));

        const valores =  JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;

        fetch('http://localhost:5000/roles/' + datosRoles.datos.id_rol, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((respuesta) => {
            respuesta.json().then((result) => {
                if(result.Auth)
                {         
                    values.NOMBRE_ROL = result.datos.nombre_rol;
                    values.TIPO_ROL = result.datos.tipo_rol;
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

        const datosRoles = JSON.parse(sessionStorage.getItem('rol'));

        const valores = JSON.parse(sessionStorage.getItem('login'));
        const token = valores.datos.token;
        
        const data = {
            id_rol: datosRoles.datos.id_rol,
            nombre_rol: document.getElementById('nombre_rol').value,
            tipo_rol: document.getElementById('tipo_rol').value,
        };
        
        
        
        fetch(('http://localhost:5000/roles/update/' + data.id_rol) ,{
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
                    sessionStorage.removeItem('rol');
                    sessionStorage.setItem('rol', JSON.stringify({
                        datos: data
                    }));
                    navigator.push('/datos/Rol');
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
            NOMBRE_ROL: document.getElementById('nombre_rol').value,
            TIPO_ROL: document.getElementById('tipo_rol').value,
        };

        fetch('http://localhost:5000/roles/agregar',{
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
                            <title>Nuevo Rol</title>
                        </Helmet>
                        <h2 className='titulo'>Formulario de ingreso de Rol</h2>
                    </>
                    :
                    <>
                        <Helmet>
                            <title>Editar Rol</title>
                        </Helmet>
                        <h2 className='titulo'>Editar Rol</h2>
                    </>
                }
                <form className="row g-3 formulario" autoComplete="off" >

                    <label className="form-label col-sm-4 labelForm">Nombre de Rol</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => SetNOMBRE_ROL(e.target.value)} value={NOMBRE_ROL}  
                                type="text" className="form-control" id="nombre_rol" placeholder="Nombre rol" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    NOMBRE_ROL:e.target.value,
                                }
                            )} value={values.NOMBRE_ROL} type="text" className="form-control" id="nombre_rol" placeholder="Nombre rol" required />
                        }
                    </div>

                    <label className="form-label col-sm-4 labelForm">Tipo de Rol</label>
                    <div className="col-md-8 listaOpciones">
                        {crear ?
                            <input onChange={(e) => SetTIPO_ROL(e.target.value)} value={TIPO_ROL}  
                                type="text" className="form-control" id="tipo_rol" placeholder="Tipo rol" required/>
                            :<input onChange={(e) => setValues(
                                {
                                    TIPO_ROL:e.target.value,
                                }
                            )} value={values.TIPO_ROL} type="text" className="form-control" id="tipo_rol" placeholder="Tipo rol" required />
                        } 
                    </div>
                                                    
                    <div className="col-12 divBoton">
                    {
                        crear?
                        <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitCrear}>Crear Rol</button>
                        :<button className="btn btn-primary boton " type="submit"  onClickCapture={handleSubmitActualizar}>Actualizar Rol</button>
                    }
                    </div>

                </form>
            </div>
        </div>
    );
}
