import React from 'react'

import FormMembresia from '../membresias/createMembresia'
import {Helmet} from 'react-helmet';

/* import './createUser/userCreate.css' */

export default function  EditUser() {

    return (
        <>
            <Helmet>
                <title>Editar Membresia</title>
            </Helmet>
            <FormMembresia />
        </>
    );
    
}