import React from 'react';
import {Helmet} from 'react-helmet';

import Gasolineras from '../../components/gasolineras'
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
                    <Gasolineras />
                </div>
            </div>
        </>
    );
}

