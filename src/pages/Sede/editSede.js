import React from 'react'

import FormSede from '../Sede/createSede'
import {Helmet} from 'react-helmet';

/* import './createUser/userCreate.css' */

export default function  EditUser() {

    return (
        <>
            <Helmet>
                <title>Editar Gasolinera</title>
            </Helmet>
            <FormSede />
        </>
    );
    
}