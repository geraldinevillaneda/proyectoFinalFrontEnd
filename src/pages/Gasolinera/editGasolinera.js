import React from 'react'

import FormStation from '../Gasolinera/createGasolinera'
import {Helmet} from 'react-helmet';

/* import './createUser/userCreate.css' */

export default function  EditUser() {

    return (
        <>
            <Helmet>
                <title>Editar Gasolinera</title>
            </Helmet>
            <FormStation />
        </>
    );
    
}