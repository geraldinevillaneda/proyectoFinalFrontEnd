import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet';


export default function AsignarMembresia() {
    
    const [id, setId_usuario] = useState("");
    const [mem, setMem_membresia] = useState("");
    const valores = JSON.parse(sessionStorage.getItem('login'));
    const f = new Date();
    console.log(valores);
    var navigator = useHistory();

    const HandleSubmitCrear = (e) => {
        e.preventDefault();
        
        const valores = JSON.parse(sessionStorage.getItem('login'));
        const userId = valores.datos.id;
        const token = valores.datos.token;

        const data = {

            estado: document.getElementById('mem').value,
            id_membresia: document.getElementById('id').value,
            id_usuario: userId,
            fecha_compra: (f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate()),
            fecha_activacion: (f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate()),
            t001_usuarios_id_usuario: userId,
            t004_membresias_id_membresia: document.getElementById('id').value,
        };


        fetch('http://localhost:5000/membresias/asignar',{
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

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent" className="editarUsuario">
                <Helmet>
                    <title>Membresia</title>
                </Helmet>
                <h2 className='titulo'>Asignar Membresia</h2>
                <form className="row g-3 formulario" autoComplete="off" novalidate>
                <div className="col-md-8">
                    <input onChange={(e) => setId_usuario(e.target.value)} value={id} 
                        type="number" className="form-control" id="id" placeholder="Ingresar id de la membresia" required/>
                </div>

                <div className="col-md-8">
                    <input onChange={(e) => setMem_membresia(e.target.value)} value={mem} 
                        type="number" className="form-control" id="mem" placeholder="Ingresar estado" required/>
                </div>
                    <button className="btn btn-primary  col-sm-1" type="submit"  onClickCapture={HandleSubmitCrear} ><i className="fas fa-search"></i></button>
                </form>
            </div>
        </div>
    );
}