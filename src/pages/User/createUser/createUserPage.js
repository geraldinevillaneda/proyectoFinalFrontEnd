import React from 'react'
import {Helmet} from 'react-helmet';

import CreateUser from '../../../components/UserCreate/index'
import Header from '../../../components/Header/index'

import './userCreate.css'


export default function CreateUserPage () {
    return(
        <>
            <Helmet>
                <title>Nuevo usuario</title>
            </Helmet>
            <Header />
            <div className="wrapper fadeInDown">
                <div id="formContent" className="editarUsuario">
                    <CreateUser />
                </div>
            </div>
        </>
    );
}