import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { Image, Button, Container, Navbar } from '@themesberg/react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import {useHistory} from 'react-router-dom'

import ReactHero from "../../assets/img/technologies/react-hero-logo.svg";



export default function Header() {
    
    const variables = JSON.parse(sessionStorage.getItem('login'));
    let islogged = true;

    if(variables === null)
    {
        islogged = false
    }
    
    const navigator = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('login');
        navigator.push('/')
    }

    return(
        <Navbar variant="dark" expand="lg" bg="dark" className="navbar-transparent navbar-theme-primary sticky-top">
            <Container className="position-relative justify-content-between px-3">
                <Navbar.Brand as={HashLink} to="/" className="me-lg-3 d-flex align-items-center">
                    <Image src={ReactHero} />
                    <span className="ms-2 brand-text d-none d-md-inline">Volt React</span>
                </Navbar.Brand>

                <div className="d-flex align-items-center">
                    {islogged ?
                        <div>
                            <Button as={HashLink} to="/dashboard/overview" variant="outline-white" className="ms-3"><FontAwesomeIcon icon={faTachometerAlt} className="me-1" /></Button> 
                            <Button as={HashLink}  variant="outline-white" className="ms-3" onClick={handleSubmit} ><FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Cerrar Sesión</Button> 
                        </div>
                        : <Button as={HashLink} to="/login" variant="outline-white" className="ms-3"><FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Iniciar Sesión</Button> 
                    }
                </div>
            </Container>
        </Navbar>
    );
}
