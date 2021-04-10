import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import '../../pages/Login/login'




export default function UserCreate (){

    const [userid, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [userdocument, setUserDocument] = useState('');
    const [usersex, setUserSex] = useState('');
    const [userphone, setUserPhone] = useState('');
    const [useraddres, setUserAddres] = useState('');
    const [usersource, setUserSource] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const [userpassword2, setUserPassword2] = useState('');

    
    const   url = window.location.href;
    const navigator = useHistory();
    let crear = false;


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
                    //alert(result.done);
                    /* const [userid, setUserId] = useState(identificacion);
                    const [username, setUsername] = useState(nombre_usuario);
                    const [userdocument, setUserDocument] = useState(tipo_documento);
                    const [usersex, setUserSex] = useState(sexo_usuario);
                    const [userphone, setUserPhone] = useState(telefono_usuario);
                    const [useraddres, setUserAddres] = useState(direccion_usuario);
                    const [usersource, setUserSource] = useState(nacionalidad); */

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
            id:userid,
            nombre_usuario:username,
            tipo_documento:userdocument,
            sexo_usuario:usersex,
            nacionalidad_usuario:usersource,
            telefono_usuario:userphone,
            direccion_usuario:useraddres,
            clave_usuario:userpassword
        };
        const valores = JSON.parse(sessionStorage.getItem('login'));
        const id = valores.datos.id;
        const token = valores.datos.token;

        if(userpassword !== userpassword2)
        {
            alert("Las contraseñas no coinciden")
        }
        else 
        {
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
        
        console.log(userid);

    }

    

    const HandleSubmitCrear = (e) => {
        e.preventDefault();
        
        
        const data = {
            id:userid,
            nombre_usuario:username,
            tipo_documento:userdocument,
            sexo_usuario:usersex,
            nacionalidad_usuario:usersource,
            telefono_usuario:userphone,
            direccion_usuario:useraddres,
            clave_usuario:userpassword
        };
        if(userpassword !== userpassword2)
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
                        sessionStorage.setItem('login', JSON.stringify({
                            datos: {
                                token: result.succesfull,
                                nombreUsuario: result.nombre_usuario,
                                id: result.id,
                                /* password: userpassword */
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
            <h2 className='titulo'>Formulario de ingreso de usuarios</h2>
            <form className="row g-3 formulario" >

                <label className="form-label col-sm-4 labelForm">Numero de documento</label>
                <div className="col-md-8 listaOpciones">
                    {crear ?
                        <input onChange={(e) => setUserId(e.target.value)} value={userid} 
                            type="number" className="form-control" id="documento" placeholder="Nro de documento" required/>
                        : <label type="number" className="form-control" id="documento" placeholder="Nro de documento"></label>
                    }
                </div>

                
                <label className="form-label col-sm-4 labelForm">Nombres</label>
                <div className="col-md-8">
                    <input onChange={(e) => setUsername(e.target.value)} value={username}  
                            type="text" className="form-control" id="nombre" placeholder="Nombre completo" required/>
                </div>

                
                <label className="form-label col-sm-4 labelForm">Tipo de documento</label>
                <div className="col-md-8 listaOpciones">
                    <select onChange={(e) => setUserDocument(e.target.value)} value={userdocument} 
                            className="form-select" id="tipoD" >
                        <option value='CC'>Cedula de Ciudadania</option>
                        <option value='TI'>Tarjeta de Identidad</option>
                    </select>
                </div>

                
                <label className="form-label col-sm-4 labelForm">Sexo</label>
                <div className="col-md-8 listaOpciones">
                    <select onChange={(e) => setUserSex(e.target.value)} value={usersex} 
                            className="form-select" id="sexo" >
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                    </select>
                </div>

                
                <label className="form-label col-sm-4 labelForm">Telefono</label>
                <div className="col-md-8 listaOpciones">
                    <input onChange={(e) => setUserPhone(e.target.value)} value={userphone} 
                            type="number" className="form-control" id="telefono"  placeholder="Telefono" required/>
                </div>

                
                <label htmlFor="validationDefault03" className="form-label col-sm-4 labelForm">Direccion</label>
                <div className="col-md-8 ">
                    <input onChange={(e) => setUserAddres(e.target.value)} value={useraddres} 
                            type="text" className="form-control" id="direccion" placeholder="Direccion" required/>
                </div>

                
                <label className="form-label col-sm-4 labelForm">Nacionalidad</label>
                <div className="col-md-8 listaOpciones">
                    <select onChange={(e) => setUserSource(e.target.value)} value={usersource} 
                            className="form-select" id="nacionalidad" >
                        <option value="Colombia">Colombiano(a)</option>
                        <option value="Extranjero">Extranjero(a)</option>
                    </select>
                </div>

                
                
                <label htmlFor="validationDefault03" type = "password" className="form-label col-sm-4 labelForm">Crea una Contraseña</label>
                <div className="col-md-8">
                    <input onChange={(e) => setUserPassword(e.target.value)} value={userpassword} 
                            type="password" className="form-control" id="direccion" placeholder="Contrasena"/>
                </div>

                
                
                <label htmlFor="validationDefault03"  className="form-label col-sm-4 labelForm">Repite Contreseña</label>
                <div className="col-md-8">
                    <input onChange={(e) => setUserPassword2(e.target.value)} value={userpassword2} 
                            type="password" className="form-control" id="direccion" placeholder="Contrasena2"/>
                </div>
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

