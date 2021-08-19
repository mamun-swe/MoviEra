import React from "react";
import { Icon } from "react-icons-kit";

import {
  playCircleO,
} from "react-icons-kit/fa";
//import { DownOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
} from "react-bootstrap";
// import Search from '../Search/Index'

const Footer = () => {

  return (
      <div className="bg-white pt-4 footer">
        <Row>
          <Col lg={2} md={2} sm={12} className="text-center">
            <Icon size={50} icon={playCircleO} />
            <p className="pl-4 pt-2 footerTv"> © Moviera.tv</p>
          </Col>
          <Col lg={10} md={10} sm={12}>
            <Col lg={8} md={8} sm={12}>
              <p>
                Attacker.tv is a Free Movies streaming site with zero ads. We
                let you watch movies online without having to register or
                paying, with over 10000 movies and TV-Series. You can also
                Download full movies from Attacker.tv and watch it later if you
                want.
              </p>
              <p>
                <span>Android App - </span>
                <span>Terms of service - </span>
                <span>Contact - </span>
                <span>Sitemap - </span>
                <span>fmovies - </span>
                <span>9anime</span>{" "}
              </p>
            </Col>
          </Col>
        </Row>
      </div>
  );
};

export default Footer;
