import React from 'react'

import FormSede from '../Sede/createSede'
import {Helmet} from 'react-helmet';

/* import './createUser/userCreate.css' */

export default function  EditSede() {

    return (
        <>
            <Helmet>
                <title>Editar Sede</title>
            </Helmet>
            <FormSede />
        </>
    );
    
}