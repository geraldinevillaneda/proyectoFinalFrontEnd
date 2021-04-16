import React from "react";
import { Col, Row, Card, Image, Container} from '@themesberg/react-bootstrap';
import ThemesbergLogo from "../assets/img/themesberg-logo.svg";
import Home from '../pages/Home/index'
import Header from '../components/Header/index'

export default () => {

  return (
    <>
    <Header />
      <Home />
      <footer className="footer py-6 bg-dark text-white">
        <Container>
          <Row>
            <Col className="mb-md-2">
              <Card.Link href="https://themesberg.com" target="_blank" className="d-flex justify-content-center">
                <Image src={ThemesbergLogo} height={35} className="d-block mx-auto mb-3" alt="Themesberg Logo" />
              </Card.Link>
              <div className="d-flex text-center justify-content-center align-items-center" role="contentinfo">
                <p className="font-weight-normal font-small mb-0">Copyright © Themesberg 2019-<span className="current-year">2021</span>. All rights reserved.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
