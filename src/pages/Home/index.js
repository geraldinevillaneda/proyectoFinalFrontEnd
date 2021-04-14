import React from 'react';
import {Helmet} from 'react-helmet';

import Sedes from '../../components/sedes'
import '../../styles/App.css';


export default function Home ()
{
    return(
        <>
            <div>
                <Helmet>
                    <title> HOME || MAP</title>
                </Helmet>
                <div>
                    <Sedes />
                </div>
            </div>
        </>
    );
}

