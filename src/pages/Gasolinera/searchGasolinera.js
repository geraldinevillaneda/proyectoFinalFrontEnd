import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet';
import LeerGasolinera from './leerGasolinera'


export default function SearchGasolinera() {
    
    const [id, setId_estacion] = useState("");
    const navigate = useHistory();
    const valores = JSON.parse(sessionStorage.getItem('login'));
    const token = valores.datos.token;
    console.log(valores)

    const HandleSubmitBuscar = (e) =>
    {
        e.preventDefault();
        
        fetch('http://localhost:5000/gasolineras/' + id, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then ((respuesta) =>{ 
            respuesta.json().then((result) => {
                console.log(result)
                if(result.Auth)
                {
                    alert(result.done)
                    sessionStorage.setItem('estacion', JSON.stringify({
                        datos: result.datos
                    }));
                    navigate.push('/datos/Estacion')
                }
                else
                {
                    alert(result.done)
                }
            })
        });
    }

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
                <Helmet>
                    <title>Gasolinera</title>
                </Helmet>
                <h2 className='titulo'>Estaciones de Gasolina</h2>
                <form className="row g-3 formulario" autoComplete="off" novalidate>
                <div className="col-md-8">
                    <input onChange={(e) => setId_estacion(e.target.value)} value={id} 
                        type="number" className="form-control" id="id" placeholder="Buscar Estacion" required/>
                        </div>
                    <button className="btn btn-primary  col-sm-1" type="submit"  onClickCapture={HandleSubmitBuscar} ><i className="fas fa-search"></i></button>
                </form>
            </div>
        </div>
    );

}