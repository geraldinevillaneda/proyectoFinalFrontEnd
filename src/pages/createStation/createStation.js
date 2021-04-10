import React from 'react'
import {Helmet} from 'react-helmet';

import CreateStation from '../../components/StationCreate/index'
import Header from '../../components/Header/index'

import './StationCreate.css'


export default function CreateStationPage () {
    return(
        <>
            <Helmet>
                <title>Nueva Estacion</title>
            </Helmet>
            <Header />
            <div className="wrapper fadeInDown">
                <div id="formContent" className="editarUsuario">
                    <CreateStation />
                </div>
            </div>
        </>
    );
}