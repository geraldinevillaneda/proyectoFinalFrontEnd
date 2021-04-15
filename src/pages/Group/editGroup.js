import React from 'react'

import FormGroup from '../Group/createGroup'
import {Helmet} from 'react-helmet';

/* import './createUser/userCreate.css' */

export default function  EditGroup() {

    return (
        <>
            <Helmet>
                <title>Editar Grupo</title>
            </Helmet>
            <FormGroup />
        </>
    );
    
}