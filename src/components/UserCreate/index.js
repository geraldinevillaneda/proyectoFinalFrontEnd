import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import '../../pages/Login/login'


const initialFieldValues = 
{
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
    PASSWORD: '',
    PASSWORD2: '' 
}


const getRoles = () =>
{
    fetch('http://localhost:5000/roles/', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            /* 'x-access-token': token */
        }
    }).then((respuesta) => {
        respuesta.json().then((result) => {
            if(result.Auth)
            {
                const roles = {datos: result.data}
                console.log(roles)
            }
            else
            {
                const roles = {}
            }

        })
    })
}



export default function UserCreate (){

 

    const [values, setValues] = useState(initialFieldValues);

    const [PRIMER_NOMBRE, SetPRIMER_NOMBRE] = useState('');
    const [SEGUNDO_NOMBRE, SetSEGUNDO_NOMBRE] = useState('');
    const [PRIMER_APELLIDO, SetPRIMER_APELLIDO] = useState('');
    const [SEGUNDO_APELLIDO, SetSEGUNDO_APELLIDO] = useState('');
    const [SEXO, SetSEXO] = useState('');
    const [TIPO_DOCUMENTO, SetTIPO_DOCUMENTO] = useState('');
    const [NUMERO_DOCUMENTO, SetNUMERO_DOCUMENTO] = useState('');
    const [CORREO_ELECTRONICO, SetCORREO_ELECTRONICO] = useState('');
    const [CELUAR, SetCELUAR] = useState('');
    const [ROL, SetROL] = useState('');
    const [PASSWORD, SetPASSWORD] = useState('');
    const [PASSWORD2, SetPASSWORD2] = useState('');
    
    const   url = window.location.href;
    const navigator = useHistory();
    let crear = false;


    fetch('http://localhost:5000/roles/', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            /* 'x-access-token': token */
        }
    }).then((respuesta) => {
        respuesta.json().then((result) => {
            if(result.Auth)
            {
                const roles = {datos: result.data}
                console.log(roles)
            }
            else
            {
                const roles = {}
            }

        })
    })

    
    /* const rolesCargados = data.map((roles, i)) */


    if(url.includes('crear/usuario'))
    {
        crear = true
    }
    else
    {
        crear = false;
        const valores =  JSON.parse(sessionStorage.getItem('login'));
        const id = valores.datos.id;
        const token = valores.datos.token;

        fetch('http://localhost:5000/users/' + id.toString(), {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((respuesta) => {
            respuesta.json().then((result) => {
                if(result.Auth)
                {           
                    console.log(result.datos); 
                    values.ID_USUARIO = result.datos.id_usuario;
                    values.PRIMER_NOMBRE = result.datos.primer_nombre;
                    values.SEGUNDO_NOMBRE = result.datos.segundo_nombre;
                    values.PRIMER_APELLIDO = result.datos.primer_apellido;
                    values.SEGUNDO_APELLIDO = result.datos.segundo_apellido;
                    values.SEXO = result.datos.sexo;
                    values.TIPO_DOCUMENTO = result.datos.tipo_documento;
                    values.NUMERO_DOCUMENTO = result.datos.numero_documento;
                    values.CORREO_ELECTRONICO = result.datos.correo_electronico;
                    values.CELUAR = result.datos.celular;
                    values.ROL = result.datos.rol;
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
            PRIMER_NOMBRE: document.getElementById('primer_nombre').value,
            SEGUNDO_NOMBRE: document.getElementById('segundo_nombre').value,
            PRIMER_APELLIDO: document.getElementById('primer_apellido').value,
            SEGUNDO_APELLIDO: document.getElementById('segundo_apellido').value,
            SEXO: document.getElementById('sexo').value,
            TIPO_DOCUMENTO: document.getElementById('tipo_documento').value,
            CORREO_ELECTRONICO: document.getElementById('correo_electronico').value,
            CELUAR: document.getElementById('celular').value,
        };
        console.log(data);
        const valores = JSON.parse(sessionStorage.getItem('login'));
        const id = valores.datos.id;
        const token = valores.datos.token;

        fetch(('http://localhost:5000/users/update/' + id) ,{
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
                    navigator.push("/datos/usuario")
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
        
        
        const data = {

            /* ID_USUARIO: document.getElementById('numero_documento').value, */
            PRIMER_NOMBRE: document.getElementById('primer_nombre').value,
            SEGUNDO_NOMBRE: document.getElementById('segundo_nombre').value,
            PRIMER_APELLIDO: document.getElementById('primer_apellido').value,
            SEGUNDO_APELLIDO: document.getElementById('segundo_apellido').value,
            SEXO: document.getElementById('sexo').value,
            TIPO_DOCUMENTO: document.getElementById('tipo_documento').value,
            NUMERO_DOCUMENTO: document.getElementById('numero_documento').value,
            CORREO_ELECTRONICO: document.getElementById('correo_electronico').value,
            CELUAR: document.getElementById('celular').value,
            ROL: document.getElementById('rol').value,
            PASSWORD: document.getElementById('password').value,
            PASSWORD2: document.getElementById('password2').value,
            t003_roles_id_rol: 1

        };

        if(data.PASSWORD !== data.PASSWORD2)
        {
            alert("Las contraseñas no coinciden")
        }
        else 
        {
            fetch('http://localhost:5000/users/agregar',{
                method:'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((respuesta) => {
                respuesta.json().then((result) => {
                    if(result.Auth)
                    {
                        alert(result.done);
                        console.log(result)
                        sessionStorage.setItem('login', JSON.stringify({
                            datos: {
                                token: result.succesfull,
                                nombreUsuario: result.nombre_usuario,
                                id: result.id,
                            }
                        }));
                        navigator.push('/dashboard/overview');
                    }
                    else
                    {
                        alert(result.done);
                       /*  navigator.push('/crear/usuario'); */
                    }
                })
            })
        }
    }

    return (
        <>
            {crear ?
                <h2 className='titulo'>Formulario de ingreso de usuarios</h2>
                :<h2 className='titulo'>Editar Usuario</h2>
            }
            <form className="row g-3 formulario" autoComplete="off" >

                <label className="form-label col-sm-4 labelForm">Numero de documento</label>
                <div className="col-md-8 listaOpciones">
                    {crear ?
                        <input onChange={(e) => SetNUMERO_DOCUMENTO(e.target.value)} value={NUMERO_DOCUMENTO} 
                            type="number" className="form-control" id="numero_documento" placeholder="Nro de documento" required/>
                        : <label type="number" className="form-control" id="numero_documento" placeholder="Nro de documento">{values.NUMERO_DOCUMENTO}</label>
                    }
                </div>


                <label className="form-label col-sm-4 labelForm">Primer Nombres</label>
                <div className="col-md-8">
                    {crear ?
                        <input onChange={(e) => SetPRIMER_NOMBRE(e.target.value)} value={PRIMER_NOMBRE}  
                            type="text" className="form-control" id="primer_nombre" placeholder="Primer nombre" required/>
                        :<input onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                PRIMER_NOMBRE:e.target.value,
                            }
                        )} value={values.PRIMER_NOMBRE} type="text" className="form-control" id="primer_nombre" placeholder="Primer nombre" required />
                    } 
                </div>

                <label className="form-label col-sm-4 labelForm">Seundo Nombres</label>
                <div className="col-md-8">
                    {crear ?
                        <input onChange={(e) => SetSEGUNDO_NOMBRE(e.target.value)} value={SEGUNDO_NOMBRE}  
                            type="text" className="form-control" id="segundo_nombre" placeholder="Segundo nombre" required/>
                        :<input onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                SEGUNDO_NOMBRE: e.target.value,
                            }
                        )} value={values.SEGUNDO_NOMBRE} type="text" className="form-control" id="segundo_nombre" placeholder="Segundo nombre" required />
                    } 
                </div>

                <label className="form-label col-sm-4 labelForm">Primer Apellido</label>
                <div className="col-md-8">
                    {crear ?
                        <input onChange={(e) => SetPRIMER_APELLIDO(e.target.value)} value={PRIMER_APELLIDO}  
                            type="text" className="form-control" id="primer_apellido" placeholder="Primer apellido" required/>
                        :<input onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                PRIMER_APELLIDO: e.target.value,
                            }
                        )} value={values.PRIMER_APELLIDO} type="text" className="form-control" id="primer_apellido" placeholder="Primer apellido" required />
                    } 
                </div>

                <label className="form-label col-sm-4 labelForm">Segundo Apellido</label>
                <div className="col-md-8">
                    {crear ?
                        <input onChange={(e) => SetSEGUNDO_APELLIDO(e.target.value)} value={SEGUNDO_APELLIDO}  
                            type="text" className="form-control" id="segundo_apellido" placeholder="Segundo apellido" required/>
                        :<input onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                SEGUNDO_APELLIDO: e.target.value,
                            }
                        )} value={values.SEGUNDO_APELLIDO} type="text" className="form-control" id="segundo_apellido" placeholder="Segundo apellido" required />
                    } 
                </div>


                <label className="form-label col-sm-4 labelForm">Sexo</label>
                <div className="col-md-8 listaOpciones">
                    {crear ?
                        <select onChange={(e) => SetSEXO(e.target.value)} value={SEXO} 
                                className="form-select" id="sexo" >
                            <option value="0">Masculino</option>
                            <option value="1">Femenino</option>
                            <option value="2">Otro</option>
                        </select>
                        :<select onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                SEXO: e.target.value,
                            }
                        )} value={values.SEXO} className="form-select" id="sexo" >
                            <option value="0">Masculino</option>
                            <option value="1">Femenino</option>
                            <option value="2">Otro</option>
                        </select>
                    }
                </div>


                <label className="form-label col-sm-4 labelForm">Tipo de documento</label>
                <div className="col-md-8 listaOpciones">
                    {crear ?
                        <select onChange={(e) => SetTIPO_DOCUMENTO(e.target.value)} value={TIPO_DOCUMENTO} 
                                className="form-select" id="tipo_documento" >
                            <option value='0'>Cedula de Ciudadania</option>
                            <option value='1'>Tarjeta de Identidad</option>
                        </select>
                        :<select onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                TIPO_DOCUMENTO:e.target.value,
                            }
                        )} value={values.TIPO_DOCUMENTO} className="form-select" id="tipo_documento" >
                            <option value="0">Cedula de Ciudadania</option>
                            <option value="1">Tarjeta de Identidad</option>
                        </select>
                    }
                </div>


                <label htmlFor="validationDefault03" className="form-label col-sm-4 labelForm">Correo Electronico</label>
                <div className="col-md-8 ">
                    {crear ?
                        <input onChange={(e) => SetCORREO_ELECTRONICO(e.target.value)} value={CORREO_ELECTRONICO} 
                            type="text" className="form-control" id="correo_electronico" placeholder="correo" required/>
                        :<input onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                CORREO_ELECTRONICO:e.target.value,
                            }
                        )} value={values.CORREO_ELECTRONICO} type="text" className="form-control" id="correo_electronico" placeholder="correo" required/>
                    }
                </div>

                <label className="form-label col-sm-4 labelForm">Telefono Celular</label>
                <div className="col-md-8 listaOpciones">
                    { crear ?
                        <input onChange={(e) => SetCELUAR(e.target.value)} value={CELUAR} 
                            type="number" className="form-control" id="celular"  placeholder="celular" required/>
                        : <input onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                CELUAR:e.target.value,
                            }
                        )} value={values.CELUAR} type="number" className="form-control" id="celular"  placeholder="celular" required/>
                    }
                </div>


                <label className="form-label col-sm-4 labelForm">ROL</label>
                <div className="col-md-8 listaOpciones">
                    {crear ?
                        <select onChange={(e) => SetROL(e.target.value)} value={ROL} 
                                className="form-select" id="rol" >
                            <option value="0">Usuario(a)</option>
                            <option value="1">Administrador(a)</option>
                        </select>
                        :<select onChange={(e) => setValues(
                            {
                                NUMERO_DOCUMENTO: values.NUMERO_DOCUMENTO,
                                ROL:e.target.value,
                            }
                        )} value={values.ROL} className="form-select" id="rol" >
                            <option value="0">Usuario(a)</option>
                            <option value="1">Administrador(a)</option>
                        </select>
                    }
                </div>

                
                {crear ?
                    <>
                        <label htmlFor="validationDefault03" type = "password" className="form-label col-sm-4 labelForm">Crea una Contraseña</label>
                        <div className="col-md-8">
                        <input onChange={(e) => SetPASSWORD(e.target.value)} value={PASSWORD} 
                            type="password" className="form-control" id="password" placeholder="Contraseña"/>
                        </div>
                        <label htmlFor="validationDefault03"  className="form-label col-sm-4 labelForm">Repite Contreseña</label>
                        <div className="col-md-8">
                            <input onChange={(e) => SetPASSWORD2(e.target.value)} value={PASSWORD2} 
                                    type="password" className="form-control" id="password2" placeholder="Contraseña2"/>
                        </div>
                    </>
                    :<></>
                }
                <div className="col-12 divBoton">
                {
                    crear?
                    <button className="btn btn-primary boton " type="submit"  onClickCapture={HandleSubmitCrear}>Crear Usuario</button>
                    :<button className="btn btn-primary boton " type="submit"  onClickCapture={handleSubmitActualizar}>Actualizar Datos</button>
                }
                </div>

            </form>
        </>
    );
}

