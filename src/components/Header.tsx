import { Row, ButtonGroup, Button, Col, Input } from "reactstrap";
import { useRecoilState } from "recoil";
import { chainState } from "src/recoil/chainState";
import { headerState } from "src/recoil/headerState";

type Data = "aptos"|"sui"|"ethw"

const Header = () => {
  const [header, setHeader] = useRecoilState(headerState);
  const [chain, setChain] = useRecoilState(chainState);
  console.log(chain);
  
  return (
    <Row className="mb-2">
      <Col>
        <ButtonGroup style={{ width: "200px" }} size="sm">
          <Button
            outline={!header}
            color="primary"
            onClick={() => !header && setHeader(!header)}
          >
            Tool
          </Button>
          <Button
            outline={header}
            color="primary"
            onClick={() => header && setHeader(!header)}
          >
            Docs
          </Button>
        </ButtonGroup>
      </Col>
      <Col>
        <div className="float-end mr-1">
          {/* @ts-ignore */}
          <Input name="select" type="select" defaultValue={chain} onChange={({target: {value}}) => setChain(value)} > 
            <option value="aptos">APTOS</option>
            <option value="sui">SUI</option>
            <option value="ethw">ETHW</option>
          </Input>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
