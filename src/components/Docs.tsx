import Image from "next/image";
import { useState } from "react";
import { Collapse, ButtonGroup, Button, Row } from "reactstrap";
import contract from "src/assets/contract.png";
import func from "src/assets/func.png";
import quantity from "src/assets/quantity.png";

const Docs = () => {
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [collapse4, setCollapse4] = useState(false);
  return (
    <Row className="justify-content-center gap-4 flex-column">
      <Row>
        <ButtonGroup>
          <Button color="primary" onClick={() => setCollapse3(!collapse3)}>
            What is Launch time?
          </Button>
        </ButtonGroup>
        <Collapse className="text-center text-primary" isOpen={collapse3}>
          The launch time is time you want to submit. You should choose a time
          shorter than 5 minutes to get the latest data
          <br />
        </Collapse>
      </Row>
      <Row>
        <ButtonGroup>
          <Button color="primary" onClick={() => setCollapse4(!collapse4)}>
            What is Private key?
          </Button>
        </ButtonGroup>
        <Collapse className="text-center text-primary" isOpen={collapse4}>
          You have to enter your private key to generate and submit transaction.
          If you want to using multiple account, each account is separated by
          commas and no spaces.
          <br />
        </Collapse>
      </Row>
      <Row className="text-center text-primary">
        <ButtonGroup>
          <Button color="primary" onClick={() => setCollapse1(!collapse1)}>
            What is Contract?
          </Button>
        </ButtonGroup>
        <Collapse isOpen={collapse1}>
          Contract is module's address of nft. You can take it from the network
          part of Bluemove, Topaz, or Souffl3.
          <br />
          <Image
            src={contract}
            alt="contract"
            style={{ width: "80%", height: "80%" }}
          />
        </Collapse>
      </Row>
      <Row>
        <ButtonGroup onClick={() => setCollapse2(!collapse2)}>
          <Button color="primary">What is Function?</Button>
        </ButtonGroup>
        <Collapse className="text-center text-primary" isOpen={collapse2}>
          The function is a function of the module's address. You can take it on
          Aptos explorer from its module's address. The default is
          factory::mint_nft_public. If you use it in the white list case, you
          have to change the function to submit without taking an error when
          minting.
          <br />
          <br />
          <Image
            src={func}
            alt="func"
            style={{ width: "80%", height: "80%" }}
          />
          <br />
          The quantity is the params of the function. If the function has params
          is u64 type, you have to enter quantity, depends on your nft there is
          a limit on how many mints.
          <br />
          <Image
            src={quantity}
            alt="func"
            style={{ width: "80%", height: "80%" }}
          />
        </Collapse>
      </Row>
    </Row>
  );
};

export default Docs;
