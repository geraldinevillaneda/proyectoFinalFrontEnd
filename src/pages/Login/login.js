import React, { useState } from 'react'
import {Helmet} from 'react-helmet';
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";


import './login.css'
import Header from '../../components/Header/index'

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useHistory();

    const handleSubmit2 = (e) => {
        e.preventDefault();
        navigate.push("/crear/usuario")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            numero_identificacion: id,
            clave_usuario: password
        }
        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then ((respuesta) =>{ 
            respuesta.json().then((result) => {
                console.log(result)
                if(result.Auth)
                {
                    sessionStorage.setItem('login', JSON.stringify({
                        datos: {
                            token: result.succesfull,
                            nombreUsuario: result.nombre_usuario,
                            id: result.id,
                            /* password: password */
                        }
                    }));
                    alert('Bienvenido  ' + result.done)
                    navigate.push('/dashboard/overview')
                }
                else
                {
                    alert(result.error)
                }
                console.log(JSON.parse(sessionStorage.getItem('login')))
            })
        });
    };

    return (
        <>
            <div className="wrapper fadeInDown contenedorLogin">
                <Helmet>
                    <title>Login|App</title>
                </Helmet>
                <div id="formContent">
                    <Header />
                    <div className="fadeIn first iconLogin">
                        <FontAwesomeIcon icon={faUserShield} className="me-1" size="9x"/>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            id="login" 
                            className="fadeIn second" 
                            onChange={(e) => setId(e.target.value)} 
                            value={id} 
                            placeholder="numero identificación" 
                        />
                        <input 
                            type="password" 
                            id="password" 
                            className="fadeIn third" 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            placeholder="password"
                        />
                        <button>INICIAR SESION</button>
                    </form>

                    <div id="formFooter">
                        <a className="underlineHover" onClick={handleSubmit2}>CREAR USUARIO</a>
                    </div>

                </div>
            </div>
        </>
    )
}