import React from 'react'

import FormCurso from '../Curso/createCourse'
import {Helmet} from 'react-helmet';

/* import './createUser/userCreate.css' */

export default function  EditCourse() {

    return (
        <>
            <Helmet>
                <title>Editar Curso</title>
            </Helmet>
            <FormCurso />
        </>
    );
    
}