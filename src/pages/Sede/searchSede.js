import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet'


export default function SearchSede() {
    
    const [id, setId_sede] = useState("");
    const navigate = useHistory();
    const valores = JSON.parse(sessionStorage.getItem('login'));
    const token = valores.datos.token;
    console.log(valores)

    const HandleSubmitBuscar = (e) =>
    {
        e.preventDefault();
        
        fetch('http://localhost:5000/sedes/' + id, {
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
                    sessionStorage.setItem('sede', JSON.stringify({
                        datos: result.datos
                    }));
                    navigate.push('/datos/Sede')
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
                    <title>Sede</title>
                </Helmet>
                <h2 className='titulo'>Buscar Sede</h2>
                <form className="row g-3 formulario" autoComplete="off" novalidate>
                <div className="col-md-8">
                    <input onChange={(e) => setId_sede(e.target.value)} value={id} 
                        type="number" className="form-control" id="id" placeholder="Buscar Sede" required/>
                        </div>
                    <button className="btn btn-primary  col-sm-1" type="submit"  onClickCapture={HandleSubmitBuscar} ><i className="fas fa-search"></i></button>
                </form>
            </div>
        </div>
    );

}