import React from 'react'

import FormUser from '../../components/UserCreate/index'
import {Helmet} from 'react-helmet';

import './createUser/userCreate.css'

export default function  EditUser() {

    return (
        <>
            <Helmet>
                <title>Editar usuario</title>
            </Helmet>
            <div className="wrapper fadeInDown">
                <div id="formContent" className="editarUsuario">
                    <FormUser />
                </div>
            </div>
        </>
    );
    
}