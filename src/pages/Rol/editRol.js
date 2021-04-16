import React from 'react'

import FormRol from '../Rol/createRol'
import {Helmet} from 'react-helmet';

/* import './createUser/userCreate.css' */

export default function  EditRol() {

    return (
        <>
            <Helmet>
                <title>Editar Sede</title>
            </Helmet>
            <FormRol />
        </>
    );
    
}