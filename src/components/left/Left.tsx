import { useState } from "react";
import {useRecoilState} from "recoil"
import { Row, Label, Input, FormGroup, Container, Col, Button } from "reactstrap";
import { contractState } from "src/recoil/contractState";
import Contract from "./Contract";
import Function from "./Function";
import TimeLaunch from "./TimeLaunch";
import PrivateKey from "./PrivateKey";
import GasFee from "./GasFee";
import Submit from "./Submit";

type Props = {};

const Left = (props: Props) => {
  const [isPrivateKey, setIsPrivateKey] = useState<boolean>(false);
  const [contract, setContract] = useRecoilState(contractState)
  return (
    <Row className="gap-1">
      <Contract />
      <Function />
      <TimeLaunch />
      <PrivateKey />
      <GasFee />
      <Submit />
      
    </Row>
  );
};

export default Left;
