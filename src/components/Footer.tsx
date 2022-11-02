import React from "react";
import { Twitter, Telegram, Github } from "react-bootstrap-icons";
import { Button, Col, Row } from "reactstrap";

const Footer = () => {
  return (
    <div className="d-flex justify-content-center">
      <a
        href="https://twitter.com/AptostoolOnline?t=4mWuJup0is5z8b1z5VGyTQ&s=09"
        target="_blank"
      >
        <Button className="m-1" outline>
          <Twitter />
        </Button>
      </a>
      <a href="https://t.me/AptostoolOnline" target="_blank">
        <Button className="m-1" outline>
          <Telegram />
        </Button>
      </a>
      <a href="https://github.com/devjohn58/aptostool" target="_blank">
        <Button className="m-1" outline>
          <Github />
        </Button>
      </a>
    </div>
  );
};

export default Footer;
